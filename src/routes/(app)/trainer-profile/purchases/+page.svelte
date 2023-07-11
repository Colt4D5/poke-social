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

<div id="purchases-container">
  <h1>My purchases</h1>

  {#if data?.purchases }
    {#each data.purchases as purchase }
      <div class="purchase">
        <p>Date: {formatDate(purchase.purchase_date)}</p>
        <p>Price: {purchase.price}</p>
        <div class="cards-opened">
          {#each purchase.set.cards_opened as card }
            <li>{card}</li>
          {/each}
        </div>
      </div>
    {/each}
  {/if}

</div>

<style lang="postcss">
  #purchases-container {
    padding: 1rem;
    & .purchase {
      background-color: #ffffff11;
      border-radius: 1rem;
      padding: 1rem;
      margin-bottom: 1rem;
      & .cards-opened {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 1rem;
      }
    }
  }
</style>
