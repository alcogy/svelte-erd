<script lang="ts">
	import { Trash2 } from 'lucide-svelte';
	import { ColumnType, type Column } from '$lib/types';
	import { hasSizeType } from '$lib/helpers/database';

	let { columns = $bindable() } : { columns: Column[] } = $props();
	function removeColumn(column: Column) {
		columns = columns.filter((v) => v.id !== column.id);
	}
</script>

<table class="column-table">
	<thead>
		<tr>
			<th class="fit">PK</th>
			<th>Column Name</th>
			<th>Logical name (View)</th>
			<th>Type</th>
			<th>Size</th>
			<th class="fit">Not NULL</th>
			<th>Default</th>
			<th>Comment</th>
			<th class="fit">Remove</th>
		</tr>
	</thead>
	<tbody>
		{#each columns as column (column.id)}
		<tr>
			<td>
				<input type="checkbox" bind:checked={column.pk} />
			</td>
			<td>
				<input type="text" name="name" bind:value={column.name} />
			</td>
			<td>
				<input type="text" name="viewName" bind:value={column.viewName} />
			</td>
			<td class="fit">
				<select bind:value={column.type}>
					{#each Object.values(ColumnType) as value (value)}
					<option value={value}>{value}</option>
					{/each}
				</select>
			</td>
			<td class="fix-size-s">
				{#if hasSizeType(column.type)}
				<input type="number" bind:value={column.size} step={1} min={0} />
				{/if}
			</td>
			<td>
				<input type="checkbox" bind:checked={column.notNull} />
			</td>
			<td>
				<input type="text" bind:value={column.default} />
			</td>
			<td>
				<input type="text" bind:value={column.comment} />
			</td>
			<td>
				<button
					class="icon"
					title="Remove column"
					onclick={() => removeColumn(column)}
				>
					<Trash2 size={18} color="#d2d2d2" />
				</button> 
			</td>
		</tr>
		{/each}
	</tbody>
</table>
<style lang="scss">
	table.column-table {
		width: 100%;
		margin-top: 16px;
		border-collapse: collapse;
		& td, & th {
			border: 1px solid #555;
			&.fit {
				white-space: nowrap;
				width: 1px;
			}
		}
		& th {
			text-align: left;
			font-size: 0.9rem;
			font-weight: 500;
			padding: 8px;
			background-color: #383838;
		}
		& td {
			background-color: #111;
			padding: 4px;
			&.fix-size-s {
				width: 75px;
			}
		}
	}
	input[type='text'], input[type='number'] {
		background-color: #111;
		border: 0;
		outline: none;
		width: 100%;
		font-size: 0.9rem;
	}
	input[type='number'] {
		min-width: 64px;
	}
	select, option {
		background-color: #111;
		font-size: 0.9rem;
	}
	select {
		border: 1px solid #444;
		width: 160px;
	}
</style>