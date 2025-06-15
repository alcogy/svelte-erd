import { type Node as NodeModel, type Column, ColumnType } from "$lib/types";
import { v4 as uuid } from "uuid";

export function createColumn(): Column {
	return {
		id: { in: uuid(), out: uuid() },
		name: 'column_name',
		viewName: 'Column name',
		type: ColumnType.characterVarying,
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
			name: "table_name",
			viewName: "Table Name",
			columns: [createColumn()],
		}
	}
}
