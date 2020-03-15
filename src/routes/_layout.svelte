<script>
	import Nav from '../components/Nav.svelte';

	export let segment;
</script>

<style>
	main {
		position: relative;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}
</style>

<Nav {segment}/>

<main>
	<slot></slot>
</main>