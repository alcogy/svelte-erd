<script lang="ts">
	import type { Node as Model } from "./types";
	let {
		data,
		mouseDownOnNode,
		mouseDownOnIO,
	} : {
		data: Model,
		mouseDownOnNode: (e: MouseEvent, id: string) => void
		mouseDownOnIO: (e: MouseEvent, id: string) => void 
	} = $props();

	
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="wrap"
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
			<div id={column.id.in} class="in"></div>
			<div class="column">{column.name}</div>
			<div
				id={column.id.out}
				class="out"
				onmousedown={(e) => mouseDownOnIO(e, column.id.out)}
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
	}
	header {
		height: 32px;
		display: flex;
		align-items: center;
		padding: 0 16px;
		justify-content: space-between;
		background-color: #cc3300;
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
		& div.in,
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
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}
	
</style>