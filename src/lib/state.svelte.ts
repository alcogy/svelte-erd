import type { globalState } from '$lib/types';
import { createColumn, createTable, extractConnectingEdges } from '$lib';
import type { Edge as EdgeModel, Column } from "$lib/types";

export const states = $state<globalState>({
	nodes: [],
	edges: [],
	selectedNode: undefined,
});

export function addNode() {
	states.nodes.push(createTable());
}

export function removeNode() {
	if (!states.selectedNode) return;
	if (!confirm('Are you sure?')) return;
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