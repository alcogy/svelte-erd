<script lang="ts">
	import Node from "$lib/components/Node.svelte";
	import Edge from "$lib/components/Edge.svelte";
	import { v4 as uuid } from "uuid";
	import type { Node as NodeModel, Edge as EdgeModel, Path as PathModel, ColumnHTMLID, Column } from "$lib/components/types";
	import { onMount } from "svelte";
	import { sampleNodes, sampleEdges, updateEdgePath } from "$lib";
	import SidePanel from "$lib/components/SidePanel.svelte";

	let isMouseDown = false;
	let selectedNodeID = "";
	let mouse = { x: 0, y: 0 };
	let moveMode: 'node' | 'edge' | 'stage' | '' = '';

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
		selectedNode = nodeData.find((v) => v.id === id);
	}

	function mouseDownOnIO(e: MouseEvent, id: string) {
		e.stopPropagation();
		if (e.button !== 0) return;
		selectedNodeID = "";
		isMouseDown = true;
		mouse.x = e.clientX;
		mouse.y = e.clientY;
		moveMode = 'edge';
	}

	function addNode() {
		nodeData.push({
			id: uuid(),
			position: { left: 20, top: 20 },
			table: {
				name: "table name",
				comment: "",
				columns: [
					{
						id: { in: uuid(), out: uuid() },
						name: "column name",
						type: 'varchar',
						size: 255,
						notNull: true,
						default: "",
						comment: "",
						pk: false,
					},
				]
			}
		});
	}

	window.addEventListener('mousemove', function(e: MouseEvent) {
		if (!isMouseDown) return;
		const diff = {
			x: e.clientX - mouse.x,
			y: e.clientY - mouse.y,
		}
		switch (moveMode) {
			case 'node':
				const node = nodeData.find((v) => v.id === selectedNodeID);
				if (!node) return;
				node.position.left += diff.x;
				node.position.top += diff.y;
				edgeData = updateEdgePath(edgeData);
				break;

			case 'edge':
				break;

			case 'stage':
				for (const node of nodeData) {
					node.position.left += diff.x;
					node.position.top += diff.y;
				}
				edgeData = updateEdgePath(edgeData);
				break;

			default:
				return;
		}
		mouse.x = e.clientX;
		mouse.y = e.clientY;
	});

	window.addEventListener('mouseup', function(e: MouseEvent) {
		isMouseDown = false;
		selectedNodeID = "";
		moveMode = '';
	});

	let nodeData: NodeModel[] = $state(sampleNodes);
	let edgeData: EdgeModel[] = $state(sampleEdges);
	let selectedNode: NodeModel | undefined = $state(undefined);
	onMount(() => edgeData = updateEdgePath(edgeData));
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="stage" onmousedown={mouseDownOnStage}>
	{#each nodeData as data}
		<Node {data} {mouseDownOnNode} {mouseDownOnIO} selected={ data.id === selectedNode?.id } />
	{/each}
	{#each edgeData as data}
		<Edge {data} />
	{/each}
	<SidePanel {selectedNode} {addNode} />
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
</style>