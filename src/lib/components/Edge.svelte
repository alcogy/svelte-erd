<script lang="ts">
	import type { Edge as EdgeModel } from "./types";
	let { data } : { data: EdgeModel} = $props();
</script>

<svg id={data.id}>
	{#if data.path}
	<path
		stroke="gray"
		fill="none"
		stroke-width={2}
		d={`M ${data.path.start.left} ${data.path.start.top} Q ${(data.path.center.left + data.path.start.left) / 2} ${data.path.start.top}, ${data.path.center.left} ${data.path.center.top} T ${data.path.end.left} ${data.path.end.top}`}
	/>
	{/if}
</svg>

<style>
	svg {
		width: 100vw;
		height: 100vh;
	}
</style>