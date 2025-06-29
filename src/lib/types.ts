export type NodeID = string;
export type EdgeID = string;
export type ColumnInID = string;
export type ColumnOutID = string;
export type ColumnHTMLID = {
	in: ColumnInID;
	out: ColumnOutID;
};
export type Position = {
	left: number;
	top: number;
}
export type Node = {
	id: NodeID;
	position: Position;
	table: Table;
}
export type Edge = {
	id: EdgeID;
	out: ColumnOutID;
	in: ColumnInID;
	path: Path | null;
}
export type Path = {
	start: Position;
	end: Position;
	center: Position;
}
export type Table = {
	name: string;
	viewName: string;
	columns: Column[];
}

export enum DataType {
	serial = 'serial',
	integer = 'integer',
	smallint = 'smallint',
	bigint = 'bigint', 
	characterVarying = 'character varying',
	text = 'text',
	date = 'date',
	time = 'time',
	timestamp = 'timestamp',
}
export type Column = {
	id: ColumnHTMLID;
	name: string;
	viewName: string;
	type: DataType;
	size?: number;
	notNull: boolean;
	default: number | string | Date;
	comment: string;
	pk: boolean;
}
export type GlobalState = {
	nodes: Node[];
	edges: Edge[];
	selectedNode: Node | undefined;
	showTableInfo: boolean;
	isConnecting: { start: Position, end: Position } | undefined;
}

export type Relation = {
	fk: {
		id: ColumnOutID;
		tableName: string;
		columnName: string;
	},
	reference: {
		id: ColumnInID;
		tableName: string;
		columnName: string;
	}
}