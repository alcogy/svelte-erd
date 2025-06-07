<script lang="ts">
	import Node from "$lib/components/node/Node.svelte";
	
	let left = $state(40);
	let top = $state(40);
	
	let isMouseDown = false;
	let mouse = { x: 0, y: 0 };
	
	window.addEventListener('mousedown', function(e: MouseEvent) {
		isMouseDown = true;
		mouse.x = e.clientX;
		mouse.y = e.clientY;
	});
	window.addEventListener('mousemove', function(e: MouseEvent) {
		if (!isMouseDown) return;
		
		const diff = {
			x: e.clientX - mouse.x,
			y: e.clientY - mouse.y,
    	}
		left += diff.x;
		top += diff.y;
		mouse.x = e.clientX;
		mouse.y = e.clientY;
	});
	window.addEventListener('mouseup', function(e: MouseEvent) {
		isMouseDown = false;
	});

</script>

<div class="stage">
	<Node {left} {top} />
</div>


<style lang="scss">	
	.stage {
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		position: relative;
	}
</style>