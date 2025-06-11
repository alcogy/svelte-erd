<script lang="ts">
	import { CirclePlus } from 'lucide-svelte';
	import { createColumn } from '$lib/helpers/table';
	import ColumnTable from './ColumnTable.svelte';
	import type { Column } from '$lib/types';

	let { columns = $bindable() } : { columns: Column[] } = $props();
</script>

<div class="column-info-wrap">
	<div class="title-wrap">
		<h3 class="section-title">Column info</h3>
		<button
			class="icon"
			title="Add column"
			onclick={() => columns.push(createColumn())}
		>
			<CirclePlus size={20} />
			<span>Add column</span>
		</button>
	</div>
	<div class="table-wrap">
		<ColumnTable bind:columns={columns} />
	</div>
</div>

<style lang="scss">
	.column-info-wrap {
		margin-top: 32px;
		overflow-y: auto;
		max-height: 100%;
		& .title-wrap {
			display: flex;
			justify-content: space-between;
		}
	}
	h3.section-title {
		margin: 0;
		color: #e0e0e0;
		font-weight: 500;
	}
</style>