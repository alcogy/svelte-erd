<script lang="ts">
	import { CirclePlus } from 'lucide-svelte';
	import { Trash2 } from 'lucide-svelte';
	import { states, addColumn, removeColumn } from '$lib/state.svelte';
</script>

{#if states.selectedNode}
<div>
	<div class="table-wrap">
		<p class="title">Table name</p>
		<div>
			<input
				type="text"
				class="textfield"
				placeholder="Enter the table name"
				bind:value={states.selectedNode.table.viewName}
			/>
		</div>
	</div>
	<div>
		<p class="title">Columns</p>
		<ul class="column-list">
			{#each states.selectedNode.table.columns as column (column.id)}
			<li>
				<input type="text" class="textfield" bind:value={column.viewName} />
				<button
					class="icon"
					title="Remove column"
					onclick={() => removeColumn(column)}
				>
					<Trash2 size={20} color="#ccc" />
				</button> 
			</li>
			{/each}
		</ul>
		<div class="add-column-wrap">
			<button
				class="icon"
				title="Add column"
				onclick={() => addColumn()}
			>
				<CirclePlus />
				<span>Add column</span>
			</button>
		</div>
	</div>
</div>
<div>
	
</div>
{/if}

<style lang="scss">
	.table-wrap {
		margin: 24px 0;
	}
	.column-list li {
		padding: 8px 0;
		display: flex;
		gap: 8px;
		& input {
			flex: 1;
		}
	}
	.add-column-wrap {
		margin-top: 10px;
	}
		
	p.title {
		font-weight: 500;
		margin: 0 0 8px 0;
		color: #ccc;
	}
</style>	