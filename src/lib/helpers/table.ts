import { type Node as NodeModel, type Column, DataType } from "$lib/types";
import { v4 as uuid } from "uuid";

export function createColumn(): Column {
	return {
		id: { in: uuid(), out: uuid() },
		name: 'column_name',
		viewName: 'Column name',
		type: DataType.characterVarying,
		size: 255,
		notNull: true,
		default: "",
		comment: "",
		pk: false,
	}
}

export function createTable(left: number, top: number): NodeModel {
	return {
		id: uuid(),
		position: { left: left, top: top },
		table: {
			name: "table_name",
			viewName: "Table Name",
			columns: [createColumn()],
		}
	}
}
