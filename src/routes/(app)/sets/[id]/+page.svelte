<script>
  export let data;
  const { set } = data;
</script>

<div class="padding-block"></div>

<div id="set-details">
  <h1>{set.name}</h1>
  <div class="grid">
    <div class="logo">
      <img src={set.images.logo} alt={set.name}>
    </div>
    <div class="details">
      <h2>{set.id}</h2>
      <p>{set.series} - {set.releaseDate}</p>
      <button>Add to favorites</button>
      <button>Open</button>
    </div>
  </div>
  <hr>
  <div id="fine-details">
    <h3>Notable Pokemon</h3>
  </div>
</div>

<style lang="postcss">
  #set-details {
    padding: 1rem;
    & > .grid {
      align-items: center;
      & .logo {
        max-width: 300px;
      }
      & .details {
        padding-left: 1.5rem;
        border-left: 1px solid var(--primary-focus);
      }
    }
  }
</style>
