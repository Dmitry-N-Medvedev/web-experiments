<script>
	import ExperimentsNav from '../../components/ExperimentsNav.svelte';

	export let segment;
</script>

<style>
	#experiments_mount {
		position: relative;
		max-width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;

		background-color: #eaeaea;

		padding: 0.25rem;
	}
</style>

<ExperimentsNav {segment} />

<article id='experiments_mount'>
	<slot></slot>
</article>