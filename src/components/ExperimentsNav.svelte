<script>
  import { onMount } from 'svelte';

  const tags = [
    {
      id: 'houdini',
    },
    {
      id: 'houdini2',
    },
    {
      id: 'houdini3',
    },
  ];

  const handle_click = (evt) => {
    evt.preventDefault();
    evt.stopPropagation();

    console.debug('handle click', evt.srcElement.id);
  };

  onMount(() => {

  });
</script>

<style>
  #experiments-nav {
    display: flex;
    flex-wrap: wrap;

    contain: paint;
  }

  .tag {
    display: flex;
    max-width: 10rem;

    padding: 0.25rem 0.5rem;
    margin: 0.25rem;

    background-color: #4095de;
    color: white;

    cursor: pointer;
    pointer-events: all;

    contain: paint;
  }
</style>

<nav id='experiments-nav'>
  {#each tags as tag}
    <div
      id={tag.id}
      class='tag'
      on:click={handle_click}
    >
      {tag.id}
    </div>
  {/each}
</nav>