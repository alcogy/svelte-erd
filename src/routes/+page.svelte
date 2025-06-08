<script lang="ts">
	import { SquarePlus } from 'lucide-svelte';

	import Node from "$lib/components/Node.svelte";
	import Edge from "$lib/components/Edge.svelte";
	import { v4 as uuid } from "uuid";
	import type { Node as NodeModel, Edge as EdgeModel, Path as PathModel, ColumnHTMLID } from "$lib/components/types";
	import { onMount } from "svelte";
	import { sampleNodes, sampleEdges, updateEdgePath } from "$lib";

	let isMouseDown = false;
	let selectedNodeID = "";
	let mouse = { x: 0, y: 0 };
	let moveMode: 'node' | 'edge' | 'stage' | '' = '';

	function mouseDonOnPanel(e: MouseEvent) {
		e.stopPropagation();
	}

	function mouseDownOnStage(e: MouseEvent) {
		e.stopPropagation();
		if (e.button !== 0) return;
		selectedNodeID = "";
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
		selectNode = nodeData.find((v) => v.id === id);
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
			collapse: true,
			selected: false,
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
	let selectNode: NodeModel | undefined = $state(undefined);
	onMount(() => edgeData = updateEdgePath(edgeData));
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="stage" onmousedown={mouseDownOnStage}>
	{#each nodeData as data}
		<Node {data} {mouseDownOnNode} {mouseDownOnIO} />
	{/each}
	{#each edgeData as data}
		<Edge {data} />
	{/each}
	<div class="right-panel" onmousedown={mouseDonOnPanel}>
		<ul class="menu">
			<li>
				<button onclick={addNode} title="Add Node">
					<SquarePlus size={24} />
				</button>				
			</li>
		</ul>
		{#if selectNode}
		<div>
			<div>
				<p>Table name</p>
				<div>
					<input type="text" placeholder="Enter the table name" bind:value={selectNode.table.name} />
				</div>
			</div>
			
			<p>Columns</p>
			<ul class="column-list">
				{#each selectNode.table.columns as colmun}
				<li>{colmun.name}</li>
				{/each}
			</ul>
			
		</div>
		{/if}
	</div>
</div>

<style lang="scss">	
	.stage {
		width: 100%;
		height: 100vh;
		overflow: hidden;
		position: relative;
	}
	.right-panel {
		position: absolute;
		overflow: auto;
		background-color: #000;
		height: 90vh;
		width: 280px;
		padding: 16px;
		border-radius: 6px;
		right: 8px;
		top: 8px;
		z-index: 9999;
		box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
		& ul.menu {
			display: flex;
			gap: 8px;
			& li {
				display: flex;
				align-items: center;
				justify-content: center;
			}
			& button {
				background-color: transparent;
				border: 0;
				cursor: pointer;
				&:hover {
					opacity: 0.9;
				}
			}
		}
	}
	
</style>