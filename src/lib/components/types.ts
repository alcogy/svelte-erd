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
	collapse: boolean;
	selected: boolean;
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
	comment: string;
	columns: Column[];
}

export type Column = {
	id: ColumnHTMLID;
	name: string;
	viewName?: string;
	type: columnType;
	size?: number;
	notNull: boolean;
	default: number | string | Date;
	comment: string;
	pk: boolean;
}

export type columnType = 'int' | 'varchar' | 'text' | 'date' | 'datetime' | 'tinyint' | 'bigint';
