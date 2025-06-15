import { states } from "$lib/state.svelte";
import { DataType } from "$lib/types";
import { makeRelations } from "./edge";
import { createFile } from "./file";

export function hasSizeType(type: DataType) {
	if (type === DataType.characterVarying) return true;
	return false;
}

export function createDDL() {
	if (states.nodes.length === 0) {
		alert('Table infos not exists.');
		return;
	}

	const results: string[] = [];
	const INDENT: string = '  ';
	for (const node of states.nodes) {
		let table: string = `CREATE TABLE \`${node.table.name}\` (\n`;
		
		const columns: string[] = [];
		const pks: string[] = [];

		for (const column of node.table.columns) {
			let col = '';
			col += INDENT;
			col += `\`${column.name}\` ${column.type}`;
			col += hasSizeType(column.type) ? `(${column.size})` : '';
			col += column.notNull && ' NOT NULL';
			col += column.default && ` DEFAULT ${column.default}`;
			columns.push(col);

			if (column.pk) {
				pks.push(column.name);
			}
		}
		table += columns.join(',\n');

		if (pks.length > 0) {
			table += ',\n';
			table += `${INDENT}PRIMARY KEY (${pks.join(', ')})`;
		}

		if (states.edges.length > 0) {
			const relations = makeRelations();
			const relationSet: string[] = [];
			for (const rel of relations) {
				if (node.table.columns.find((v) => v.id.out === rel.fk.id) === undefined) {
					continue;
				}
				const str = `${INDENT}CONSTRAINT fk_${rel.fk.columnName} FOREIGN KEY(${rel.fk.columnName}) REFERENCES ${rel.reference.tableName}(${rel.reference.columnName})`;
				relationSet.push(str);
			}
			if (relationSet.length > 0) {
				table += ',\n' + relationSet.join(',\n');
			}	
		} 

		table += '\n);';
		results.push(table);
	}
	const contents = results.join('\n\n');
	createFile('DDL.sql', contents);
}


