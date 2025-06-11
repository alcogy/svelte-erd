<script lang="ts">
	let { name = $bindable(), comment = $bindable() }: { name: string, comment: string } = $props();
</script>

<div class="table-info-wrap">
	<h3 class="section-title">Table info</h3>
	<div>
		<p>Table name</p>
		<input type="text" class="textfield" bind:value={name} />
	</div>
	<div>
		<p>Comment</p>
		<input type="text" class="textfield" bind:value={comment} />
	</div>
</div>

<style lang="scss">
	.table-info-wrap {
		& > div {
			margin-top: 16px;
			& p {
				margin: 0 0 4px 0;
				font-size: 0.9rem;
				color: #ccc;
			}
		}
	}
	h3.section-title {
		margin: 0;
		color: #e0e0e0;
		font-weight: 500;
	}
</style>