<script lang="ts">
	import { states } from '$lib/state.svelte';
	import TableInfo from "./TableInfo.svelte";
	import HeadMenu from './sidepanel/HeadMenu.svelte';
	import TableMenu from './sidepanel/TableMenu.svelte';
	import TableSummary from './sidepanel/TableSummary.svelte';	
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="right-panel" onmousedown={(e) => e.stopPropagation()} ondblclick={(e) => e.stopPropagation()}>
	<HeadMenu />
	<TableMenu />
	<TableSummary />
</div>
{#if states.showTableInfo}
	<TableInfo />
{/if}

<style lang="scss">
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
		z-index: 999;
		box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
	}	
</style>