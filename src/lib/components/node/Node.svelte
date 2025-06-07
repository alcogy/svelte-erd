<script lang="ts">
	let { left, top } = $props();
</script>

<div class="wrap" style:left={`${left}px`} style:top={`${top}px`}>
	<header>
		<div class="tablename">user_table</div>
		<div class="collapse"></div>
	</header>
	<ul>
		<li>
			<div class="in"></div>
			<div class="column">id</div>
			<div class="out"></div>
		</li>
		<li>
			<div class="in"></div>
			<div class="column">user_name</div>
			<div class="out"></div>
		</li>
		<li>
			<div class="in"></div>
			<div class="column">age</div>
			<div class="out"></div>
		</li>
		<li>
			<div class="in"></div>
			<div class="column">tel</div>
			<div class="out"></div>
		</li>
	</ul>
</div>

<style lang="scss">
	.wrap {
		width: 220px;
		background-color: #202020;
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