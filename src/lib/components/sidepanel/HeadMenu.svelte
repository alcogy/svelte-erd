<script lang="ts">
	import { DatabaseZap } from 'lucide-svelte';
	import { Import } from 'lucide-svelte';
	import { Settings } from 'lucide-svelte';
	import { SquarePlus } from 'lucide-svelte';
	import { addNode, clearStates } from '$lib/state.svelte';
	import { createDDL } from '$lib/helpers/database';
	import { BrushCleaning } from 'lucide-svelte';

	const menuIconProps = { size: 20, color: "#ccc" }

	function onClickClear() {
		if (!confirm('Are you sure?')) return;
		clearStates();
	}
</script>

<ul class="menu">
	<li>
		<button class="icon" title="Add Node" onclick={addNode}>
			<SquarePlus {...menuIconProps} />
		</button>
	</li>
	<li>
		<button class="icon" title="Create DDL"onclick={createDDL}>
			<DatabaseZap {...menuIconProps} />
		</button>
	</li>
	<!-- <li>
		<button class="icon" title="Import">
			<Import {...menuIconProps} />
		</button>
	</li>
	<li>
		<button class="icon" title="Settings">
			<Settings {...menuIconProps} />
		</button>
	</li> -->
	<li>
		<button class="icon" title="Clear" onclick={onClickClear}>
			<BrushCleaning {...menuIconProps} />
		</button>
	</li>
</ul>

<style lang="scss">
	ul.menu {
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
</style>