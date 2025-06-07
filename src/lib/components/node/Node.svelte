<script lang="ts">
	import type { Node as Model } from "../types";
	let {
		data,
		mouseDownOnNode
	} : {
		data: Model,
		mouseDownOnNode: (e: MouseEvent, id: string) => void
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
		<div class="collapse"></div>
	</header>
	<ul>
		{#each data.table.columns as column}
		<li>
			<div class="in"></div>
			<div class="column">{column.name}</div>
			<div class="out"></div>
		</li>
		{/each}
	</ul>
</div>

<style lang="scss">
	.wrap {
		width: 220px;
		background-color: transparent;
		position: absolute;
		user-select: none;
	}
	header {
		height: 32px;
		display: flex;
		padding: 0 16px;
		gap: 16px;
		align-items: center;
		justify-content: space-between;
		background-color: #cc3300;
		border-radius: 6px 6px 0 0;
		& .tablename {
			font-weight: 500;
			overflow: hidden;
			text-overflow: ellipsis;
		}
		& .collapse {
			&::after {
				content: '';
				display: block;
				width: 5px;
				height: 5px;
				border-left: 2px solid #eee;
				border-bottom: 2px solid #eee;
				transform: rotate(-45deg);
			}
		}
	}
	ul {
		list-style: none;
		margin: 0;
		padding: 0;
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
		}
		& div.column {
			flex: 1;
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}
	
</style>