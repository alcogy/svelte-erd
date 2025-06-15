import type { globalState } from '$lib/types';
import { createColumn, createTable } from '$lib/helpers/table';
import { extractConnectingEdges } from '$lib/helpers/edge';
import type { Node as NodeModel, Edge as EdgeModel, Column } from "$lib/types";

export const states = $state<globalState>({
	nodes: [],
	edges: [],
	selectedNode: undefined,
	showTableInfo: false,
	isConnecting: undefined,
});

export function addNode(left?: number, top?: number): NodeModel {
	if (left === undefined) left = 20;
	if (top === undefined) top = 20;
	const node = createTable(left, top);
	states.nodes.push(node);
	return node;
}

export function removeNode() {
	if (!states.selectedNode) return;
	const node = states.selectedNode;
	for (const column of node.table.columns) {
		states.edges = extractConnectingEdges(states.edges, column);
	}
	states.nodes = states.nodes.filter((v) => v.id !== node.id);
	states.selectedNode = undefined;
}

export function addColumn() {
	states.selectedNode?.table.columns.push(createColumn());
}

export function removeColumn(column: Column) {
	if (!states.selectedNode) return;
	states.edges = extractConnectingEdges(states.edges, column);
	states.selectedNode.table.columns = states.selectedNode.table.columns.filter((v) => v.id !== column.id);
}

export function removeEdge(edge: EdgeModel) {
	states.edges = states.edges.filter((v) => v.id !== edge.id);
}

export function clearStates() {
	states.selectedNode = undefined;
	states.showTableInfo = false;
	states.edges = [];
	states.nodes = [];
}
