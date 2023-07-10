<script>
  export let data;

  const allItems = data.sets;

  $: currentCollection = allItems;

  let filter;

  const itemsPerPage = 24;
  $: currentPage = 1;
  $: totalPages = Math.ceil(currentCollection.length / itemsPerPage);
  $: startItem = (currentPage * itemsPerPage) - itemsPerPage;
  $: currentItems = currentCollection.slice(startItem, startItem + itemsPerPage);


  const filterPokemon = async () => {
    currentPage = 1;
    currentCollection = allItems.filter(set => set.name.toLowerCase().includes(filter.toLowerCase()))
    currentItems = currentCollection.slice(startItem, startItem + itemsPerPage);
    totalPages = Math.ceil(currentItems.length / itemsPerPage);
  }

  const goToPage = (page) => {
    currentPage = page;
  }
</script>

<div class="padding-block"></div>

<div id="explore-content">

  <h1>Explore Booster Packs</h1>
  
  <form id="search-form" method="post" on:submit|preventDefault={filterPokemon}>
    <input bind:value={filter} type="text" name="filter" id="filter" placeholder="Filter by booster pack">
    <button type="submit">Search</button>
  </form>

  {#if currentCollection?.length > 0 }

  <hr>
  
    <div id="set-grid">
      {#each currentItems as set }
        <a class="set" href={`/sets/${set.id}`} data-data={JSON.stringify(set)}>
          <div>
            {#if set.images.logo }
              <img class="logo" src={set.images.logo} alt={set.name}>
            {/if}
            <h2>{set.name}</h2>
          </div>
        </a>
      {/each}
    </div>

    <div id="pagination">
      {#if totalPages > 1 }
      <button class:disabled={currentPage === 1 ? 'disabled' : ''} on:click={() => goToPage(currentPage - 1)}>{'<<'}</button>
      {/if}
      {#each new Array(totalPages).fill() as _, i }
      <a class="page" class:active={currentPage === i + 1} on:click|preventDefault={() => goToPage(i + 1)} href="#page-{i+1}">{ i + 1 }</a>
      {/each}
      {#if totalPages > 1 }
        <button class:disabled={currentPage === totalPages ? 'disabled' : ''} on:click={() => goToPage(currentPage + 1)}>{'>>'}</button>
      {/if}
    </div>

  {:else}
    <p>I'm sorry, there were no results for "{filter}"</p>
  {/if}

</div>

<style lang="postcss">
  #explore-content {
    container-type: inline-size;
    padding-inline: 1rem;
    & #search-form {
      display: flex;
      gap: 1rem;
      & input {
        border-radius: 4rem;
      }
      & button {
        padding-inline: 1.5rem;
        width: auto;
      }
    }
    & #set-grid {
      display: grid;
      grid-template-columns: 1fr;
      grid-gap: 1rem;
      @container (min-width: 480px) {
        grid-template-columns: repeat(2, 1fr);
      }
      @container (min-width: 640px) {
        grid-template-columns: repeat(3, 1fr);
      }
      @container (min-width: 900px) {
        grid-template-columns: repeat(4, 1fr);
      }
      & .set {
        text-align: center;
        flex: 1;
        transition: scale 0.4s ease;
        &:hover {
          scale: 1.05;
        }
        & img.logo {
          width: 75%;
          height: 100px;
          object-fit: contain;
        }
        & h2 {
          font-size: 1rem;
          line-height: 1.1;
        }
      }
    }
    & #pagination {
      display: flex;
      justify-content: center;
      align-items: center;
      line-height: 1;
      & button {
        width: auto;
        margin: 0;
        &.disabled {
          opacity: 0.4;
          pointer-events: none;
        }
      }
      & a.page {
        color: #fff;
        padding: 0.5rem 1rem;
        &.active {
          color: var(--primary);
          font-size: 1.5rem;
        }
      }
    }
  }
</style>
