<script lang="ts">
	import { states } from '$lib/state.svelte';
	import type { Column, Table } from '$lib/types';
	import TableSection from './tableinfo/TableSection.svelte';
	import ColumnSection from './tableinfo/ColumnSection.svelte';

	let table: Table = $state(states.selectedNode?.table || { name: '', comment: '', columns: [] });
	let columns: Column[] = $state(states.selectedNode ? [...states.selectedNode.table.columns] : []);

	function onClickCancel() {
		states.showTableInfo = false;
	}

	function onClickUpdate() {
		if (states.selectedNode) {
			states.selectedNode.table = table;
			states.selectedNode.table.columns = columns;
		}
		states.showTableInfo = false;
	}
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="wrap" onmousedown={(e) => e.stopPropagation()}>
	<div class="box">
		{#if states.selectedNode}
		<div class="main">
			<TableSection bind:name={table.name} bind:comment={table.comment} />
			<ColumnSection bind:columns={columns} />
		</div>
		{/if}
		<div class="buttons">
			<button class="fill-button cancel" onclick={onClickCancel}>Cancel</button>
			<button class="fill-button positive" onclick={onClickUpdate}>Update</button>
		</div>
	</div>
</div>

<style lang="scss">
	.wrap {
		position: fixed;
		width: 100vw;
		height: 100vh;
		top: 0;
		left: 0;
		background-color: rgba(0, 0, 0, 0.7);
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 9999;
	}
	.box {
		width: 90%;
		height: 90%;
		padding: 24px;
		background-color: #252525;
		box-shadow: 0 0 6px rgba(0, 0, 0, 0.8);
		border-radius: 12px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: 8px;
		overflow-y: auto;
	}
	.main {
		flex: 1;
	}
	.buttons {
		display: flex;
		justify-content: flex-end;
		gap: 24px;
	}
</style>