<script>
  export let data;
</script>

<div class="padding-block"></div>

<div id="explore-content">
  <h1>Explore Booster Packs</h1>
  
  {#if data?.sets?.length > 0 }
    <div id="set-grid">
      {#each data.sets as set }
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
  {/if}
</div>

<style lang="postcss">
  #explore-content {
    container-type: inline-size;
    padding-inline: 1rem;
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
  }
</style>
