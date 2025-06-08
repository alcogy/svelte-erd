<script lang="ts">
	import Node from "$lib/components/Node.svelte";
	import Edge from "$lib/components/Edge.svelte";
	import type { Node as NodeModel, Position, ColumnHTMLID } from "$lib/types";
	import { onMount } from "svelte";
	import { updateEdgePath, createTable, createEdge } from "$lib";
	import { states } from "$lib/state.svelte";
	import SidePanel from "$lib/components/SidePanel.svelte";
	import Connecting from "$lib/components/Connecting.svelte";

	let isMouseDown = false;
	let selectedNodeID = "";
	let mouse = { x: 0, y: 0 };
	let moveMode: 'node' | 'edge' | 'stage' | '' = '';
	let connectTargetIDs: ColumnHTMLID = {
		out: '',
		in: '',
	};
	let isConnecting: { start: Position, end: Position } | undefined = $state(undefined);

	function mouseDownOnStage(e: MouseEvent) {
		e.stopPropagation();
		if (e.button !== 0) return;
		selectedNodeID = "";
		selectedNode = undefined;
		isMouseDown = true;
		mouse.x = e.clientX;
		mouse.y = e.clientY;
		moveMode = 'stage';
	}

	function mouseDownOnNode(e: MouseEvent, id: string) {
		e.stopPropagation();
		if (e.button !== 0) return;
		selectedNodeID = id;
		isMouseDown = true;
		mouse.x = e.clientX;
		mouse.y = e.clientY;
		moveMode = 'node';
		selectedNode = states.nodes.find((v) => v.id === id);
	}

	function mouseDownOnColumnOut(e: MouseEvent, id: string) {
		e.stopPropagation();
		if (e.button !== 0) return;

		selectedNodeID = "";
		isMouseDown = true;
		mouse.x = e.clientX;
		mouse.y = e.clientY;
		moveMode = 'edge';

		const io = document.getElementById(id) as HTMLElement;
		if (!io) return;
		connectTargetIDs.out = id;
		const rect = io.getBoundingClientRect();
		isConnecting = {
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

	function mouseEnterOnColumnIn(id: string) {
		connectTargetIDs.in = id;
	}

	function mouseLeaveOnColumnIn() {
		connectTargetIDs.in = '';
	}

	function addNode() {
		states.nodes.push(createTable());
	}

	function removeNode(node: NodeModel) {
		if (!confirm('Are you sure?')) return;
		for (const column of node.table.columns) {
			states.edges = states.edges.filter((v) => v.in === column.id.in || v.out === column.id.out);
		}
		states.nodes = states.nodes.filter((v) => v.id !== node.id);
		selectedNode = undefined;
	}

	window.addEventListener('mousemove', function(e: MouseEvent) {
		if (!isMouseDown) return;
		const diff = {
			x: e.clientX - mouse.x,
			y: e.clientY - mouse.y,
		}
		switch (moveMode) {
			case 'node':
				const node = states.nodes.find((v) => v.id === selectedNodeID);
				if (!node) return;
				node.position.left += diff.x;
				node.position.top += diff.y;
				states.edges = updateEdgePath(states.edges);
				break;

			case 'edge':
				if (!isConnecting) break;
				isConnecting.end = {
					left: e.clientX,
					top: e.clientY,
				}
				break;

			case 'stage':
				for (const node of states.nodes) {
					node.position.left += diff.x;
					node.position.top += diff.y;
				}
				states.edges = updateEdgePath(states.edges);
				break;

			default:
				return;
		}
		mouse.x = e.clientX;
		mouse.y = e.clientY;
	});

	window.addEventListener('mouseup', function(e: MouseEvent) {
		if (moveMode === 'edge'
		&& connectTargetIDs.out !== ''
		&& connectTargetIDs.in !== '') {
			states.edges.push(createEdge(connectTargetIDs))
		}
		isMouseDown = false;
		selectedNodeID = "";
		moveMode = '';
		isConnecting = undefined;
		connectTargetIDs = { in: '', out: '' }
	});

	let selectedNode: NodeModel | undefined = $state(undefined);
	onMount(() => states.edges = updateEdgePath(states.edges));
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="stage" onmousedown={mouseDownOnStage}>
	{#each states.nodes as data}
		<Node
			{data}
			selected={ data.id === selectedNode?.id }
			{mouseDownOnNode}
			{mouseDownOnColumnOut}
			{mouseEnterOnColumnIn}
			{mouseLeaveOnColumnIn}
		/>
	{/each}
	<svg>
	{#each states.edges as data}
		<Edge {data} />
	{/each}
	{#if isConnecting}
		<Connecting {...isConnecting} />
	{/if}
	</svg>
	<SidePanel
		{selectedNode}
		{addNode}
		{removeNode}
	/>
</div>

<style lang="scss">	
	.stage {
		background-color: #393939;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		position: relative;
		// background-size: 30px 30px;
		// background-image: linear-gradient(to right, #2f2f2f 1px, transparent 1px),
		// 					linear-gradient(to bottom, #2f2f2f 1px, transparent 1px);
	}
	svg {
		width: 100vw;
		height: 100vh;
	}
</style>