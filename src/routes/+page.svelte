<script lang="ts">
	import Node from "$lib/components/node/Node.svelte";
	import type { Node as NodeModel } from "$lib/components/types";

	let isMouseDown = false;
	let selectedNodeID = "";
	let mouse = { x: 0, y: 0 };
	
	function mouseDownOnNode(e: MouseEvent, id: string) {
		isMouseDown = true;
		selectedNodeID = id;
		mouse.x = e.clientX;
		mouse.y = e.clientY;
	};

	window.addEventListener('mousemove', function(e: MouseEvent) {
		if (!isMouseDown) return;
		const node = nodeData.find((v) => v.id === selectedNodeID);
		if (!node) return;

		const diff = {
			x: e.clientX - mouse.x,
			y: e.clientY - mouse.y,
    	}
		node.position.left += diff.x;
		node.position.top += diff.y;
		mouse.x = e.clientX;
		mouse.y = e.clientY;
	});
	window.addEventListener('mouseup', function(e: MouseEvent) {
		isMouseDown = false;
		selectedNodeID = "";
	});

	let nodeData: NodeModel[] = $state([
		{
			id: '1',
			position: { left: 30, top: 40 },
			collapse: true,
			selected: false,
			table: {
				name: "user",
				comment: "",
				columns: [
					{
						name: "id",
						type: 'int',
						notNull: true,
						default: 0,
						comment: "",
						pk: true,
					},
					{
						name: "name",
						type: 'varchar',
						size: 255,
						notNull: true,
						default: "",
						comment: "",
						pk: false,
					},
					{
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
						name: "id",
						type: 'int',
						notNull: true,
						default: 0,
						comment: "",
						pk: true,
					},
					{
						name: "language",
						type: 'varchar',
						size: 255,
						notNull: true,
						default: "",
						comment: "",
						pk: false,
					},
					{
						name: "experience",
						type: 'int',
						notNull: true,
						default: "",
						comment: "",
						pk: false,
					},
					{
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

</script>

<div class="stage">
	{#each nodeData as data}
		<Node {data} {mouseDownOnNode} />
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