// place files you want to import through the `$lib` alias in this folder.

import type { Node as NodeModel, Edge as EdgeModel, Path as PathModel, ColumnHTMLID } from "$lib/components/types";
import { v4 as uuid } from "uuid";
const col1 = {
	in: uuid(),
	out: uuid(),
};
const col2 = {
	in: uuid(),
	out: uuid(),
};

export function calcEdgePath(column: ColumnHTMLID): PathModel {
	const outDom = document.getElementById(column.out) as HTMLElement;
	const inDom = document.getElementById(column.in) as HTMLElement;
	const outRect = outDom.getBoundingClientRect() || { top: 0, left: 0 };
	const inRect = inDom.getBoundingClientRect() || { top: 0, left: 0 };
	const start = {
		left: outRect.left,
		top: outRect.top + (outRect.height / 2),
	}
	const end = {
		left: inRect.left,
		top: inRect.top + (inRect.height / 2),
	}
	return {
		start: start,
		end: end,
		center: {
			left: (end.left + start.left) / 2,
			top: (end.top + start.top) / 2,
		}
	}
}

export function updateEdgePath(edges: EdgeModel[]): EdgeModel[] {
	for (let i = 0; i < edges.length; i++) {
		edges[i].path = calcEdgePath({ in: edges[i].in, out: edges[i].out });
	}
	return edges;
}

export const sampleNodes: NodeModel[] = [
	{
		id: '1',
		position: { left: 530, top: 240 },
		collapse: true,
		selected: false,
		table: {
			name: "user",
			comment: "",
			columns: [
				{
					id: col1,
					name: "id",
					type: 'int',
					notNull: true,
					default: 0,
					comment: "",
					pk: true,
				},
				{
					id: { in: '123', out: '456'},
					name: "name",
					type: 'varchar',
					size: 255,
					notNull: true,
					default: "",
					comment: "",
					pk: false,
				},
				{
					id: { in: '223', out: '556'},
					name: "city",
					type: 'varchar',
					size: 255,
					notNull: true,
					default: "",
					comment: "",
					pk: false,
				},
			]
		}
	},
	{
		id: '2',
		position: { left: 50, top: 90 },
		collapse: true,
		selected: false,
		table: {
			name: "programming",
			comment: "",
			columns: [
				{
					id: { in: '1111', out: '2222'},
					name: "id",
					type: 'int',
					notNull: true,
					default: 0,
					comment: "",
					pk: true,
				},
				{
					id: { in: '3333', out: '4444'},
					name: "language",
					type: 'varchar',
					size: 255,
					notNull: true,
					default: "",
					comment: "",
					pk: false,
				},
				{
					id: { in: '6666', out: '7777'},
					name: "experience",
					type: 'int',
					notNull: true,
					default: "",
					comment: "",
					pk: false,
				},
				{
					id: col2,
					name: "user_id",
					type: 'int',
					notNull: true,
					default: "",
					comment: "",
					pk: false,
				},
			]
		}
	},
	{
		id: '3',
		position: { left: 740, top: 490 },
		collapse: true,
		selected: false,
		table: {
			name: "company",
			comment: "",
			columns: [
				{
					id: { in: '9090', out: '9091'},
					name: "id",
					type: 'int',
					notNull: true,
					default: 0,
					comment: "",
					pk: true,
				},
				{
					id: { in: '8081', out: '8082'},
					name: "name",
					type: 'varchar',
					size: 255,
					notNull: true,
					default: "",
					comment: "",
					pk: false,
				},
			]
		}
	},
]


export const sampleEdges: EdgeModel[] = [
	{
		id: '1423423',
		out: col2.out,
		in: col1.in,
		path: null,
	}
]

	