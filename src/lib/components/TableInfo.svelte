<script lang="ts">
	import { states } from '$lib/state.svelte';
	import { CirclePlus } from 'lucide-svelte';
	import { createColumn } from '$lib';
	import { Trash2 } from 'lucide-svelte';
	import type { Column } from '$lib/types';

	let tableName: string = $state(states.selectedNode?.table.name || '');
	let columns: Column[] = $state(states.selectedNode ? [...states.selectedNode?.table.columns] : []);

	function removeColumn(column: Column) {
		columns = columns.filter((v) => v.id !== column.id);
	}

	function onClickCancel() {
		if (!confirm('Are you sure? your changed information will discard.')) return;
		states.showTableInfo = false;
	}

	function onClickUpdate() {
		if (states.selectedNode) {
			states.selectedNode.table.name = tableName;
			states.selectedNode.table.columns = columns;
		}
		states.showTableInfo = false;
	}
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="wrap" onmousedown={(e) => e.stopPropagation()}>
	<div class="box">
		{#if states.selectedNode}
			<p>Table name</p>
			<div>
				<input type="text" class="textfield" bind:value={tableName} />
			</div>
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
					{#each columns as column}
					<tr>
						<td>
							<input type="checkbox" bind:checked={column.pk} />
						</td>
						<td>
							<input type="text" bind:value={column.name} />
						</td>
						<td>
							<input type="text" bind:value={column.viewName} />
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
			<div class="options">
				<button
					class="icon"
					title="Add column"
					onclick={() => columns.push(createColumn())}
				>
					<CirclePlus />
					<span>Add column</span>
				</button>
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
		position: relative;
	}
	table.column-table {
		width: 100%;
		margin-top: 32px;
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
		outline: none;
		border: 1px solid #444;
		min-width: 100px;
	}

	.options {
		margin-top: 16px;
	}

	.buttons {
		position: absolute;
		bottom: 16px;
		right: 16px;
		display: flex;
		gap: 24px;
	}
</style>