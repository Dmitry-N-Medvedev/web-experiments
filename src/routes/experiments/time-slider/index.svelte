<script>
  import { onMount } from 'svelte';

  import workerUlr from 'omt:./timeline-painter.worker.js';

  let timeline_canvas;
  let background_canvas;
  let root;
  let painter;

  $: if (background_canvas) {
    const timeline_top = background_canvas.offsetTop + background_canvas.offsetHeight - timeline_canvas.offsetHeight * 1.5;
    const timeline_width = background_canvas.offsetWidth * 0.9;

    root.style.setProperty('--timeline-top', `${timeline_top}px`);
    root.style.setProperty('--timeline-width', `${timeline_width}px`);
  }

  onMount(async () => {
    root = document.documentElement;

    try {
      console.debug('workerUlr', workerUlr);

      const worker = new Worker(workerUlr, { name: 'timeline-painter' });

      console.debug('worker:', worker);
    } catch (err) {
      console.error(err);
    }
  });
</script>

<style>
  :root {
    --timeline-top: 0;
    --timeline-width: 0;
    --timeline-height: 4rem;
    --timeline-background-color: white;
  }

  #canvas-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
  }

  #timeline {
    position: absolute;
    top: var(--timeline-top);
    width: var(--timeline-width);
    height: var(--timeline-height);

    background-color: var(--timeline-background-color);
    pointer-events: all;
    z-index: 1;
  }

  #background-canvas {
    width: 800px;
    height: 600px;

    background-color: antiquewhite;
    position: relative;

    z-index: 0;
  }
</style>

<article id='canvas-container'>
  <canvas id='timeline' bind:this={timeline_canvas} />
  <canvas id='background-canvas' bind:this={background_canvas} />
</article>