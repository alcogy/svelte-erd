<script lang="ts">
	import { calcCenterPosition } from "$lib";
	import type { Position } from "../types";

	let { start, end } : { start: Position, end: Position } = $props();
	const center = calcCenterPosition(start, end);
</script>

<svg>
	<path
		stroke="#aaa"
		fill="none"
		stroke-width={3}
		stroke-dasharray={3}
		d={`M ${start.left} ${start.top} Q ${(center.left + start.left) / 2} ${start.top}, ${center.left} ${center.top} T ${end.left} ${end.top}`}
	/>
</svg>

<style lang="scss">
	svg {
		width: 100%;
		height: 100vh;
	}

</style>