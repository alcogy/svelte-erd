<script lang="ts">
	import type { Node as Model } from "../types";
	let {
		data,
		selected,
		mouseDownOnNode,
		mouseDownOnColumnOut,
		mouseEnterOnColumnIn,
		mouseLeaveOnColumnIn,
	} : {
		data: Model,
		selected: boolean,
		mouseDownOnNode: (e: MouseEvent, id: string) => void
		mouseDownOnColumnOut: (e: MouseEvent, id: string) => void 
		mouseEnterOnColumnIn: (id: string) => void
		mouseLeaveOnColumnIn: () => void
	} = $props();

	
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class={`wrap ${selected && 'selected'}`}
	style:left={`${data.position.left}px`}
	style:top={`${data.position.top}px`}
	onmousedown={(e) => mouseDownOnNode(e, data.id)}
>
	<header>
		<div class="tablename">{data.table.name}</div>
	</header>
	<ul>
		{#each data.table.columns as column}
		<li>
			<div
				class="column"
				id={column.id.in}
				onmouseenter={() => mouseEnterOnColumnIn(column.id.in)}
				onmouseleave={() => mouseLeaveOnColumnIn()}
			>{column.name}</div>
			<div
				id={column.id.out}
				class="out"
				onmousedown={(e) => mouseDownOnColumnOut(e, column.id.out)}
			></div>
		</li>
		{/each}
	</ul>
</div>

<style lang="scss">
	.wrap {
		width: 200px;
		background-color: transparent;
		position: absolute;
		user-select: none;
		border-radius: 6px 6px 0 0;
		box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
		z-index: 1;
		&.selected {
			background-color: var(--main-color);
			outline: 2px solid var(--main-color);
			z-index: 5;
		}
	}
	header {
		height: 32px;
		display: flex;
		align-items: center;
		padding: 0 16px;
		justify-content: space-between;
		background-color: var(--main-color);
		border-radius: 6px 6px 0 0;
		& .tablename {
			font-weight: 500;
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}
	
	li {
		height: 40px;
		display: flex;
		align-items: center;
		background-color: #202020;
		&:not(:first-child) {
			border-top: 1px solid #404040;
		}
		& div.out {
			width: 16px;
			height: 100%;
		}
		& div.out:hover {
			background-color: #444;
			cursor: move;
		}
		& div.column {
			flex: 1;
			padding-left: 16px;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	}
	
</style>