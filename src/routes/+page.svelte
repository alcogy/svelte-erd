<script lang="ts">
	import Node from "$lib/components/Node.svelte";
	import Edge from "$lib/components/Edge.svelte";
	import { onMount } from "svelte";
	import { updateEdgePath } from "$lib/helpers/edge";
	import { removeNode, states } from "$lib/state.svelte";
	import SidePanel from "$lib/components/SidePanel.svelte";
	import Connecting from "$lib/components/Connecting.svelte";
	import {
		mouseDownOnStage,
		mouseMoveOnWindow,
		mouseUpOnWindow,
		mouseDblClickOnStage,
	} from "$lib/helpers/mouseActions";
	
	window.addEventListener('mousemove', mouseMoveOnWindow);
	window.addEventListener('mouseup', mouseUpOnWindow);
	window.addEventListener('keyup', function(e) {
		if (e.key === 'Delete' && e.ctrlKey && states.selectedNode) {
			removeNode();
		}
	});

	onMount(() => states.edges = updateEdgePath(states.edges));
	$effect(() => {
		states.edges = updateEdgePath(states.edges);
	});
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<div
	class="stage"
	tabindex="0"
	onmousedown={mouseDownOnStage}
	ondblclick={mouseDblClickOnStage}>
	{#each states.nodes as data (data.id)}
		<Node
			{data}
			selected={ data.id === states.selectedNode?.id }
		/>
	{/each}
	<svg>
	{#each states.edges as data (data.id)}
		<Edge {data} />
	{/each}
	{#if states.isConnecting}
		<Connecting {...states.isConnecting} />
	{/if}
	</svg>
	<SidePanel />
</div>

<style lang="scss">	
	.stage {
		background-color: #393939;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		position: relative;
		background-size: 30px 30px;
		background-image: linear-gradient(to right, #404040 1px, transparent 1px),
							linear-gradient(to bottom, #404040 1px, transparent 1px);
	}
	svg {
		width: 100vw;
		height: 100vh;
	}
</style>