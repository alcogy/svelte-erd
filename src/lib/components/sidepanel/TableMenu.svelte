<script lang="ts">
	import { DatabaseZap } from 'lucide-svelte';
	import { HardDriveDownload } from 'lucide-svelte';
	import { HardDriveUpload } from 'lucide-svelte';
	import { Settings } from 'lucide-svelte';
	import { states } from '$lib/state.svelte';
	import { createDDL } from '$lib/helpers/database';
	import { createFile, loadFile } from '$lib/helpers/file';

	const menuIconProps = { size: 20, color: "#ccc" }

	function createSaveFile() {
		if (states.nodes.length === 0) {
			alert('Table infos not exists.');
			return;
		}
		const data = JSON.stringify({
			nodes: states.nodes,
			edges: states.edges,
		});
		const date = new Date().toISOString();
		createFile(`svelte-erd_${date}.txt`, data);
	}

	function onImportFile() {
		try {
			loadFile();
		} catch (e) {
			alert(e);
		}
		
	}
</script>

<ul class="menu">
	<li>
		<button class="icon" title="Create DDL file" onclick={createDDL}>
			<DatabaseZap {...menuIconProps} />
		</button>
	</li>
	<li>
		<button class="icon" title="Download save file" onclick={createSaveFile}>
			<HardDriveDownload {...menuIconProps} />
		</button>
	</li>
	<li>
		<button class="icon" title="Import save file" onclick={onImportFile}>
			<HardDriveUpload {...menuIconProps} />
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
		border-top: 1px solid #555;
		border-bottom: 1px solid #555;
		padding: 8px 0;
		margin-top: 8px;
		& li {
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}	
</style>