import { states } from "$lib/state.svelte";
import { ColumnType } from "$lib/types";
import { createFile } from "./file";

export function hasSizeType(type: ColumnType) {
	if (type === ColumnType.characterVarying) return true;
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
			col += hasSizeType(column.type) && `(${column.size})`;
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
			table += `${INDENT}PRIMARY KEY (${pks.join(', ')})\n`;
		} else {
			table += '\n';
		}
		table += ');';
		results.push(table);
	}
	const contents = results.join('\n\n');
	createFile('DDL.sql', contents);
}


