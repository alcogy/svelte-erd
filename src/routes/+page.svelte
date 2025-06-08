<script lang="ts">
	import Node from "$lib/components/Node.svelte";
	import Edge from "$lib/components/Edge.svelte";
	import { v4 as uuid } from "uuid";
	import type { Node as NodeModel, Edge as EdgeModel, Path as PathModel, ColumnHTMLID } from "$lib/components/types";
	import { onMount } from "svelte";
	
	let isMouseDown = false;
	let selectedNodeID = "";
	let mouse = { x: 0, y: 0 };
	let moveMode: 'node' | 'edge' | 'stage' | '' = '';
	
	function CalcEdgePath(column: ColumnHTMLID): PathModel {
		const outDom = document.getElementById(column.out) as HTMLElement;
		const inDom = document.getElementById(column.in) as HTMLElement;
		const outRect = outDom.getBoundingClientRect() || { top: 0, left: 0};
		const inRect = inDom.getBoundingClientRect() || { top: 0, left: 0};
		return {
			start: {
				left: outRect.left,
				top: outRect.top,
			},
			end: {
				left: inRect.left,
				top: inRect.top,
			},
			center: {
				left: (inRect.left + outRect.left) / 2,
				top: (inRect.top + outRect.top) / 2,
			}
		}
	}
	
	function mouseDownOnNode(e: MouseEvent, id: string) {
		e.stopPropagation();
		isMouseDown = true;
		selectedNodeID = id;
		mouse.x = e.clientX;
		mouse.y = e.clientY;
		moveMode = 'node';
	};

	function mouseDownOnIO(e: MouseEvent, id: string) {
		e.stopPropagation();
		isMouseDown = true;
		selectedNodeID = "";
		mouse.x = e.clientX;
		mouse.y = e.clientY;
		moveMode = 'edge';
	}

	window.addEventListener('mousemove', function(e: MouseEvent) {
		if (!isMouseDown) return;
		switch (moveMode) {
			case 'node':
				const node = nodeData.find((v) => v.id === selectedNodeID);
				if (!node) return;

				const diff = {
					x: e.clientX - mouse.x,
					y: e.clientY - mouse.y,
				}
				node.position.left += diff.x;
				node.position.top += diff.y;
				break;
			case 'edge':
				break;
			case 'stage':
				break;
			default:
				return;
		}
		edgeData = edgeData.map((v) => {return { ...v, path: CalcEdgePath({ in: v.in, out: v.out })}})
		mouse.x = e.clientX;
		mouse.y = e.clientY;
	});

	window.addEventListener('mouseup', function(e: MouseEvent) {
		isMouseDown = false;
		selectedNodeID = "";
		moveMode = '';
	});

	let col1 = {
		in: uuid(),
		out: uuid(),
	};
	let col2 = {
		in: uuid(),
		out: uuid(),
	};

	let nodeData: NodeModel[] = $state([
		{
			id: '1',
			position: { left: 530, top: 240 },
			collapse: true,
			selected: false,
			table: {
				name: "user",
				comment: "",
				columns: [
					{
						id: col1,
						name: "id",
						type: 'int',
						notNull: true,
						default: 0,
						comment: "",
						pk: true,
					},
					{
						id: { in: '123', out: '456'},
						name: "name",
						type: 'varchar',
						size: 255,
						notNull: true,
						default: "",
						comment: "",
						pk: false,
					},
					{
						id: { in: '223', out: '556'},
						name: "city",
						type: 'varchar',
						size: 255,
						notNull: true,
						default: "",
						comment: "",
						pk: false,
					},
				]
			}
		},
		{
			id: '2',
			position: { left: 50, top: 90 },
			collapse: true,
			selected: false,
			table: {
				name: "programming",
				comment: "",
				columns: [
					{
						id: { in: '1111', out: '2222'},
						name: "id",
						type: 'int',
						notNull: true,
						default: 0,
						comment: "",
						pk: true,
					},
					{
						id: { in: '3333', out: '4444'},
						name: "language",
						type: 'varchar',
						size: 255,
						notNull: true,
						default: "",
						comment: "",
						pk: false,
					},
					{
						id: { in: '6666', out: '7777'},
						name: "experience",
						type: 'int',
						notNull: true,
						default: "",
						comment: "",
						pk: false,
					},
					{
						id: col2,
						name: "user_id",
						type: 'int',
						notNull: true,
						default: "",
						comment: "",
						pk: false,
					},
				]
			}
		},
	])
	
	let edgeData: EdgeModel[] = $state([]);
	onMount(() => {
		edgeData = [
			{
				id: '1',
				out: col2.out,
				in: col1.in,
				path: CalcEdgePath({ in: col1.in, out: col2.out }),
			}
		]
	});
</script>

<div class="stage">
	{#each nodeData as data}
		<Node {data} {mouseDownOnNode} {mouseDownOnIO} />
	{/each}
	{#each edgeData as data}
		<Edge {data} />
	{/each}
</div>


<style lang="scss">	
	.stage {
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		position: relative;
	}
</style>