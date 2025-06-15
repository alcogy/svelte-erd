<script lang="ts">
	import type { Edge as EdgeModel } from "../types";
			
	let { data } : { data: EdgeModel} = $props();
</script>

{#if data.path}
	<path
		stroke="#777"
		fill="none"
		stroke-width={3}
		d={`M ${data.path.start.left} ${data.path.start.top} Q ${(data.path.center.left + data.path.start.left) / 2} ${data.path.start.top}, ${data.path.center.left} ${data.path.center.top} T ${data.path.end.left} ${data.path.end.top}`}
	/>
{/if}


<style lang="scss">	
	path:hover {
		stroke: #e50;
	}
</style>