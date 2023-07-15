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

  const openImage = (card) => {
    console.log(card);
  }

  const handleClick = async (e) => {
    const target = e.target.closest('.card');
    const cardData = JSON.parse(target.dataset.card);
    if (e.target.closest('img.icon')) {
      openImage(cardData);
      return;
    }
    console.log(cardData);
  }
</script>

<div class="padding-block"></div>

<div id="my-cards">
  <h1>My Cards</h1>

  {#if data?.cards?.length > 0 }
    <table id="card-table">
      <tr>

        <th></th>

        <th>Card</th>

        <th>Received</th>

        <th>Quantity</th>

      </tr>
      {#each data.cards as card }
        <tr on:click={handleClick} class="card" data-card={JSON.stringify(card)}>
          <td>
            {#if card?.images?.small }
              <img class="icon" loading="lazy" src={card.images.small} alt={card.name} />
            {/if}
            <!-- <div class="icon"></div> -->
          </td>

          <td class="card-title">
            {card.name}
          </td>

          <td class="card-purchase-date">
            {formatDate(card.date_purchased)}
          </td>

          <td>
            {card.quantity}
          </td>

        </tr>
      {/each}
    </table>
  {/if}
</div>

<style lang="postcss">
  #my-cards {
    padding: 1rem;
    & table {
      & tr {
        text-align: center;
        & th {
          text-align: center;
        }
        &.card {
          cursor: pointer;
          &:hover {
            background-color: #ffffff29;
          }
          & td {
            text-align: center;
            & .icon {
              width: 3rem;
              aspect-ratio: 1 / 1;
              object-fit: contain;
              /* background-color: #ffffff33; */
              transition: scale 0.3s ease;
              &:hover {
                scale: 1.15;
              }
            }
            &.card-title {
              font-size: 1.1rem;
              font-weight: 400;
            }
            &.card-purchase-date {
              font-size: 0.9rem;
            }
          }
          &:nth-child(2n) {
            background-color: #ffffff0a;
            &:hover {
              background-color: #ffffff29;
            }
          }
        }
      }
    }
  }
</style>
