<script>
  import { onMount, onDestroy } from 'svelte';

  // import workerUlr from 'omt:./timeline-painter.worker.js';

  let timeline_canvas;
  let offscreen_canvas;
  let background_canvas;
  let root;
  let painter;

  let timeline_width = null;
  let timeline_height = 30;
  let timeline_top = null;

  let worker = null;

  let is_mouse_down = false;
  let is_mouse_move = false;
  let is_dragging = false;

  const handle_mouse_down = (e) => {
    is_mouse_down = true;
  };

  const handle_mouse_up = (e) => {
    is_mouse_down = false;
  };

  const handle_mouse_move = (e) => {
    is_mouse_move = true;

    console.log('handle_mouse_move', e);
  };

  $: is_dragging = is_mouse_down && is_mouse_move;

  $: if (background_canvas) {
    timeline_top = background_canvas.offsetTop + background_canvas.offsetHeight;
    timeline_width = background_canvas.offsetWidth - background_canvas.offsetWidth / 10;
  }
  
  $: if (timeline_canvas) {
    // offscreen_canvas = timeline_canvas.transferControlToOffscreen();

    timeline_canvas.addEventListener('mousedown', handle_mouse_down, true);
    timeline_canvas.addEventListener('mouseup', handle_mouse_up, true);
    timeline_canvas.addEventListener('mouseenter', handle_mouse_move, true);
    
    console.debug('timeline_canvas:', timeline_canvas.width, timeline_canvas.height);

    // worker.postMessage({ canvas: offscreen_canvas }, [offscreen_canvas]);
  }

  onMount(async () => {
    root = document.documentElement;
    worker = new Worker('/timeline-painter.worker.js', { name: 'timeline-painter' });

    try {

    } catch (err) {
      console.error(err);
    }
  });

  onDestroy(() => {
    if (timeline_canvas) {
      timeline_canvas.removeEventListener('mousedown', handle_mouse_down);
      timeline_canvas.removeEventListener('mouseup', handle_mouse_up);
      timeline_canvas.removeEventListener('mousemove', handle_mouse_move);
    }
  });
</script>

<style>
  :root {
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
    width: 720px;
    height: 50px;

    /*
      width: var(--timeline-width);
      height: var(--timeline-height);
    */

    background-color: var(--timeline-background-color);
    pointer-events: all;
    z-index: 1;
  }

  #background-canvas {
    width: 800px;
    height: 600px;

    background-color: black;
    position: relative;

    z-index: 0;
  }
</style>

<article id='canvas-container'>
  {#if (timeline_width !== null)}
    <canvas id='timeline' bind:this={timeline_canvas} width={timeline_width} height={timeline_height}></canvas>
  {/if}
  <canvas id='background-canvas' bind:this={background_canvas}></canvas>
</article>