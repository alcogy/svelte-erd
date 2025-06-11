<script lang="ts">
	import { Trash2 } from 'lucide-svelte';
	import type { Column } from '$lib/types';

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
			<th>Logical name</th>
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
					<option value='int'>int</option>
					<option value='tinyint'>tinyint</option>
					<option value='bigint'>bigint</option>
					<option value='varchar'>varchar</option>
					<option value='text'>text</option>
					<option value='date'>date</option>
					<option value='datetime'>datetime</option>
				</select>
			</td>
			<td class="fit">
				{#if ['int', 'tinyint', 'bigint', 'varchar'].includes(column.type)}
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
		min-width: 100px;
	}
</style>