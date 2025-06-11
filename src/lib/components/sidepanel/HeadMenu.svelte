<script lang="ts">
	import { DatabaseZap } from 'lucide-svelte';
	import { Import } from 'lucide-svelte';
	import { Settings } from 'lucide-svelte';
	import { SquarePlus } from 'lucide-svelte';
	import { addNode } from '$lib/state.svelte';
	
	const menuIconProps = { size: 20, color: "#ccc" }
</script>

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