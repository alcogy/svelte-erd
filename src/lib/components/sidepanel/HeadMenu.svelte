<script lang="ts">
	import { states, clearStates } from '$lib/state.svelte';
	
	function onClickClear() {
		if (!confirm('Are you sure?')) return;
		clearStates();
	}
</script>

<div class="top-button">
	<button
		class="fill-button positive all-column"
		onclick={() => states.showTableInfo = true}
		disabled={states.selectedNode === undefined}
	>
		Edit table info
	</button>
	<button
		class="fill-button attention remove-table"
		onclick={() => onClickClear()}
	>
		Clear All
	</button>
</div>

<style lang="scss">
	.top-button {
		display: flex;
		gap: 8px;
		& > button {
			flex: 1;
			white-space: nowrap;
			padding-left: 0;
			padding-right: 0;
		}
	}
</style>