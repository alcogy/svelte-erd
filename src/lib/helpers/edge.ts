import type { Edge as EdgeModel, Path as PathModel, ColumnHTMLID, Column, Position, Relation } from "$lib/types";
import { v4 as uuid } from "uuid";
import { states } from "$lib/state.svelte";

export function calcCenterPosition(start: Position, end: Position): Position {
	return {
		left: (end.left + start.left) / 2,
		top: (end.top + start.top) / 2,
	}
}

export function updateEdgePath(edges: EdgeModel[]): EdgeModel[] {
	for (let i = 0; i < edges.length; i++) {
		edges[i].path = calcEdgePath({ in: edges[i].in, out: edges[i].out });
	}
	return edges;
}

export function createEdge(id: ColumnHTMLID): EdgeModel | undefined {
	if (states.edges.map((v) => v.out).includes(id.out)) return;
	return {
		id: uuid(),
		out: id.out,
		in: id.in,
		path: calcEdgePath(id),
	}
}

export function extractConnectingEdges(edges: EdgeModel[], column: Column): EdgeModel[] {
	return edges.filter((v) => v.in !== column.id.in && v.out !== column.id.out);
}

function calcEdgePath(column: ColumnHTMLID): PathModel {
	const outDom = document.getElementById(column.out) as HTMLElement;
	const inDom = document.getElementById(column.in) as HTMLElement;
	const outRect = outDom.getBoundingClientRect() || { top: 0, left: 0 };
	const inRect = inDom.getBoundingClientRect() || { top: 0, left: 0 };
	const start: Position = {
		left: outRect.left,
		top: outRect.top + (outRect.height / 2),
	}
	const end: Position = {
		left: inRect.left,
		top: inRect.top + (inRect.height / 2),
	}
	return {
		start: start,
		end: end,
		center: calcCenterPosition(start, end),
	}
}

export function makeRelations(): Relation[] {
	const results: Relation[] = [];
	const columns: { column: Column, tableName: string }[] = [];
	for (const node of states.nodes) {
		for (const column of node.table.columns) {
			columns.push({ column: column, tableName: node.table.name }) ;
		}
	}
	for (const edge of states.edges) {
		const fkColumn = columns.find((v) => v.column.id.out === edge.out);
		if (fkColumn === undefined) continue;

		const refColumn = columns.find((v) => v.column.id.in === edge.in);
		if (refColumn === undefined) continue;

		results.push({
			fk: {
				id: fkColumn.column.id.out,
				tableName: fkColumn.tableName,
				columnName: fkColumn.column.name,
			},
			reference: {
				id: refColumn.column.id.in,
				tableName: refColumn.tableName,
				columnName: refColumn.column.name,
			}
		})
	}

	return results;
}