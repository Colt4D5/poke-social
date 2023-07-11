<script>
  export let data;

  const formatDate = (date) => {
    const months = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = date.getMonth();
    const day = date.getDate();
    const year = date.getFullYear();
    const hrs = date.getHours();
    const mins = date.getMinutes();
    return `${months[month]} ${day}, ${year} at ${hrs}:${mins}`
  }
</script>

<div class="padding-block"></div>

<div id="my-cards">
  <h1>My Cards</h1>

  {#if data?.cards?.length > 0 }
    <div id="my-card-grid">
      {#each data.cards as card }
        <div class="card">
          <img src={card.images.small} alt={card.name} />
          <h2 class="card-title">{card.name}</h2>
          <p class="card-purchase-date">{formatDate(card.date_purchased)}</p>
        </div>
      {/each}
    </div>
  {/if}
</div>

<style lang="postcss">
  #my-cards {
    padding: 1rem;
    & #my-card-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-gap: 1rem;
      & .card {
        width: 100%;
        text-align: center;
        & img {
          width: 100%;
          max-width: 100%;
        }
        & .card-title {
          font-size: 1.1rem;
          font-weight: 400;
          margin-bottom: 0.5rem;
        }
        & .card-purchase-date {
          font-size: 0.9rem;
        }
      }
    }
  }
</style>
