<script lang="ts">
	import { SquarePlus } from 'lucide-svelte';
	import { CirclePlus } from 'lucide-svelte';
	import { Trash2 } from 'lucide-svelte';
	import type { Node as NodeModel, Column } from "$lib/types";
	import { createColumn, updateEdgePath } from '$lib';
	import { states } from '$lib/state.svelte';
	import { DatabaseZap } from 'lucide-svelte';
	import { Import } from 'lucide-svelte';
	import { Settings } from 'lucide-svelte';


	let {
		selectedNode,
		addNode,
		removeNode,
	} : {
		selectedNode: NodeModel | undefined,
		addNode: () => void,
		removeNode: (node: NodeModel) => void,
	} = $props();

	const menuIconProps = { size: 20, color: "#ccc" }

	function addColumn() {
		selectedNode?.table.columns.push(createColumn());
	}

	function removeColumn(column: Column) {
		if (!selectedNode) return;
		states.edges = states.edges.filter((v) => v.in === column.id.in || v.out === column.id.out);
		states.edges = updateEdgePath(states.edges);
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
				<SquarePlus {...menuIconProps} />
			</button>
		</li>
		<li>
			<button class="icon" title="Create DDL">
				<DatabaseZap {...menuIconProps} />
			</button>
		</li>
		<li>
			<button class="icon" title="Import">
				<Import {...menuIconProps} />
			</button>
		</li>
		<li>
			<button class="icon" title="Settings">
				<Settings {...menuIconProps} />
			</button>
		</li>
	</ul>
	{#if selectedNode}
	<div>
		<div class="table-wrap">
			<p class="title">Table name</p>
			<div>
				<input type="text" placeholder="Enter the table name" bind:value={selectedNode.table.name} />
			</div>
		</div>
		
		<p class="title">Columns</p>
		<ul class="column-list">
			{#each selectedNode.table.columns as column}
			<li>
				<input type="text" bind:value={column.name} />
				<button class="icon" title="Remove column" onclick={() => removeColumn(column)}>
					<Trash2 color="#aaa" size={20} />
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
				<span>Add column</span>
			</button>
		</div>
	</div>
	<div>
		<button class="remove-table" onclick={() => removeNode(selectedNode)}>Remove table</button>
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
	p.title {
		font-weight: 500;
		margin: 0 0 8px 0;
		color: #ccc;
	}
	.table-wrap {
		margin: 16px 0 32px 0;
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
	button.remove-table {
		border: 0;
		background-color: #d22;
		font-weight: 500;
		font-size: 0.9rem;
		color: #eee;
		padding: 8px 16px;
		border-radius: 6px;
		cursor: pointer;
		margin-top: 24px;
		&:hover {
			opacity: 0.8;
		}
	}
</style>