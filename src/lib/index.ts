// place files you want to import through the `$lib` alias in this folder.

import type { Node as NodeModel, Edge as EdgeModel, Path as PathModel, ColumnHTMLID, Column, Position } from "$lib/types";
import { v4 as uuid } from "uuid";

export function calcEdgePath(column: ColumnHTMLID): PathModel {
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

export function createColumn(): Column {
	return {
		id: { in: uuid(), out: uuid() },
		name: "column name",
		type: 'varchar',
		size: 255,
		notNull: true,
		default: "",
		comment: "",
		pk: false,
	}
}

export function createTable(): NodeModel {
	return {
		id: uuid(),
		position: { left: 20, top: 20 },
		table: {
			name: "table name",
			comment: "",
			columns: [createColumn()],
		}
	}
}

export function createEdge(id: ColumnHTMLID): EdgeModel {
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