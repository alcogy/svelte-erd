export type NodeID = string;
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
	id: string;
	out: string;
	in: string;
}

export type Table = {
	name: string;
	comment: string;
	columns: Column[];
}

export type Column = {
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
