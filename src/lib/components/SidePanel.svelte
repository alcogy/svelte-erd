<script lang="ts">
	import { SquarePlus } from 'lucide-svelte';
	import { CirclePlus } from 'lucide-svelte';
	import { Trash2 } from 'lucide-svelte';
	import { v4 as uuid } from "uuid";
	import type { Node as NodeModel, Column } from "$lib/components/types";

	let {
		selectedNode,
		addNode,
	} : {
		selectedNode: NodeModel | undefined,
		addNode: () => void,
	} = $props();

	function addColumn() {
		selectedNode?.table.columns.push({
			id: { in: uuid(), out: uuid() },
			name: "new column",
			type: 'int',
			notNull: true,
			default: 0,
			comment: "",
			pk: false,
		});
	}

	function removeColumn(column: Column) {
		if (!selectedNode) return;
		selectedNode.table.columns = selectedNode.table.columns.filter((v) => v.id !== column.id);
	}

	function mouseDonOnPanel(e: MouseEvent) {
		e.stopPropagation();
	}
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="right-panel" onmousedown={mouseDonOnPanel}>
	<ul class="menu">
		<li>
			<button class="icon" onclick={addNode} title="Add Node">
				<SquarePlus size={24} />
			</button>				
		</li>
	</ul>
	{#if selectedNode}
	<div>
		<div>
			<p>Table name</p>
			<div>
				<input type="text" placeholder="Enter the table name" bind:value={selectedNode.table.name} />
			</div>
		</div>
		
		<p>Columns</p>
		<ul class="column-list">
			{#each selectedNode.table.columns as column}
			<li>
				<input type="text" bind:value={column.name} />
				<button class="icon" title="Remove column" onclick={() => removeColumn(column)}>
					<Trash2 color="#aaa" />
				</button> 
			</li>
			{/each}
		</ul>
		<div class="add-column-wrap">
			<button
				class="icon"
				title="Add column"
				onclick={addColumn}
			>
				<CirclePlus />
			</button>
		</div>
	</div>
	{/if}
</div>

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
		z-index: 9999;
		box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
		& ul.menu {
			display: flex;
			gap: 8px;
			border-bottom: 1px solid #555;
			padding-bottom: 12px;
			& li {
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
	}
	.column-list li {
		padding: 8px 0;
		display: flex;
		gap: 8px;
	}
	.add-column-wrap {
		margin-top: 10px;
	}
</style>