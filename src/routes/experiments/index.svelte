<script>
	import { onMount } from 'svelte';

	let experiments = [
		{
			id: 'time-slider',
			title: 'time slider',
			subtitle: 'using Houdini paint worklet',
			content: '',
			href: 'experiments/time-slider',
		}
	];

	onMount(() => {
		console.log('experiments.onMount');
	});
</script>

<style>
	:root {
		--experiment-panel-aspect-ratio: calc(9 / 19);
		--experiment-panel-width: 30rem;
		--experiment-panel-height: calc(var(--experiment-panel-width) * var(--experiment-panel-aspect-ratio));
		--experiment-panel-background-color: #fafafa;
		--experiment-panel-shadow-color: #d9d9d9;
		--experiment-panel-shadow-color_hover: #cccccc;
		--shadow-spread: 2px;
		--shadow-spread_hover: 4px;
		--experiment-panel-filter-drop-shadow: 0px 0px var(--shadow-spread) var(--experiment-panel-shadow-color);
		--experiment-panel-filter-drop-shadow_hover: 0px 0px var(--shadow-spread_hover)
		var(--experiment-panel-shadow-color_hover);
	}

	#experiments-container {
		display: flex;
		flex-wrap: wrap;

		width: 100%;
		height: 100%;

		position: relative;
	}

	.experiment {
		display: grid;
		grid-template-columns: 3px 1fr 3px;
		grid-template-rows: 3px 1fr 1fr 6fr 3px;
		grid-template-areas:
			'.  .         .'
			'.	title			.'
			'.	subtitle	.'
			'.	content		.'
			'.	.					.'
		;
		grid-gap: 0.125rem;
		width: var(--experiment-panel-width);
		height: var(--experiment-panel-height);

		text-decoration: none;

		background-color: var(--experiment-panel-background-color);
		filter: drop-shadow(var(--experiment-panel-filter-drop-shadow));

		pointer-events: all;
		contain: paint;
	}

	.experiment:hover {
		filter: drop-shadow(var(--experiment-panel-filter-drop-shadow_hover));
	}

	.experiment-title,
	.experiment-subtitle,
	.experiment-content {
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 0;
		padding: 0;

		pointer-events: none;
	}

	.experiment-title,
	.experiment-subtitle {
		font-variant: small-caps;
		text-transform: lowercase;
	}

	.experiment-title {
		grid-area: title;
	}
	
	.experiment-subtitle {
		grid-area: subtitle;
		background-color: #3a3a3a;
		color: #eaeaea;
		border-radius: 0.125rem;
	}

	.experiment-content {
		grid-area: content;
		justify-content: flex-start;
		align-items: flex-start;
	}
</style>

<svelte:head>
	<title>experiments</title>
</svelte:head>

<article id='experiments-container'>
	{#each experiments as e}
		<a id={e.id} href={e.href} class='experiment'>
			<h2 class='experiment-title'>{e.title}</h2>
			<h3 class='experiment-subtitle'>{e.subtitle}</h3>
			<div class='experiment-content'>{e.content}</div>
		</a>
	{/each}
</article>
