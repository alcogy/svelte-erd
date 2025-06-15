import { addNode, states } from "$lib/state.svelte";
import type { ColumnHTMLID, Node as NodeModel } from "$lib/types";
import { updateEdgePath, createEdge } from "$lib/helpers/edge";

let isMouseDown = false;
let selectedNodeID = "";
let mouse = { x: 0, y: 0 };
let moveMode: 'node' | 'edge' | 'stage' | '' = '';
let connectTargetIDs: ColumnHTMLID = {
	out: '',
	in: '',
};

export function mouseDownOnStage(e: MouseEvent) {
	e.stopPropagation();
	if (e.button !== 0) return;
	selectedNodeID = "";
	states.selectedNode = undefined;
	isMouseDown = true;
	mouse.x = e.clientX;
	mouse.y = e.clientY;
	moveMode = 'stage';
}

export function mouseDownOnNode(e: MouseEvent, id: string) {
	e.stopPropagation();
	if (e.button !== 0) return;
	selectedNodeID = id;
	isMouseDown = true;
	mouse.x = e.clientX;
	mouse.y = e.clientY;
	moveMode = 'node';
	states.selectedNode = states.nodes.find((v) => v.id === id);
}

export function mouseDownOnColumnOut(e: MouseEvent, columnOutId: string) {
	e.stopPropagation();
	if (e.button !== 0) return;

	selectedNodeID = "";
	isMouseDown = true;
	mouse.x = e.clientX;
	mouse.y = e.clientY;
	moveMode = 'edge';

	const io = document.getElementById(columnOutId) as HTMLElement;
	if (!io) return;

	states.edges = states.edges.filter((v) => v.out !== columnOutId);

	connectTargetIDs.out = columnOutId;
	const rect = io.getBoundingClientRect();
	states.isConnecting = {
		start: {
			left: rect.left,
			top: rect.top,
		},
		end: {
			left: e.clientX,
			top: e.clientY,
		},
	}
}

export function mouseDblClickOnNode(e: MouseEvent, node: NodeModel) {
	e.stopPropagation();
	states.selectedNode = node;
	states.showTableInfo = true;
}

export function mouseDblClickOnStage(e: MouseEvent) {
	e.stopPropagation();
	const node = addNode(e.clientX - 100, e.clientY - 10);
	states.selectedNode = node;
	selectedNodeID = node.id;
}

export function mouseEnterOnColumnIn(id: string) {
	connectTargetIDs.in = id;
}

export function mouseLeaveOnColumnIn() {
	connectTargetIDs.in = '';
}

export function mouseMoveOnWindow(e: MouseEvent) {
	if (!isMouseDown) return;
	const diff = {
		x: e.clientX - mouse.x,
		y: e.clientY - mouse.y,
	}
	switch (moveMode) {
		case 'node': {
			const node = states.nodes.find((v) => v.id === selectedNodeID);
			if (!node) return;
			node.position.left += diff.x;
			node.position.top += diff.y;
			states.edges = updateEdgePath(states.edges);
			break;
		}
		case 'edge': {
			if (!states.isConnecting) break;
			states.isConnecting.end = {
				left: e.clientX,
				top: e.clientY,
			}
			break;
		}
		case 'stage': {
			for (const node of states.nodes) {
				node.position.left += diff.x;
				node.position.top += diff.y;
			}
			states.edges = updateEdgePath(states.edges);
			break;
		}
		default: {
			return;
		}
	}
	mouse.x = e.clientX;
	mouse.y = e.clientY;
}

export function mouseUpOnWindow(_: MouseEvent) {
	if (moveMode === 'edge'
	&& connectTargetIDs.out !== ''
	&& connectTargetIDs.in !== '') {
		const edge = createEdge(connectTargetIDs);
		if (edge !== undefined) {
			states.edges.push(edge);
		}
	}
	isMouseDown = false;
	selectedNodeID = "";
	moveMode = '';
	states.isConnecting = undefined;
	connectTargetIDs = { in: '', out: '' }
}