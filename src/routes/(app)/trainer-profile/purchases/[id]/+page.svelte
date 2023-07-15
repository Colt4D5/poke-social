<script>
  export let data;
</script>

<div class="padding-block"></div>

<div id="purchased-cards">
  <h1>Your New Cards</h1>

  <div id="card-grid">
    {#each data.purchasedCards as card }
      <div class="card" class:new={card.quantity == 1}>
        <img src={card.images.small} alt={card.name} />
        <h2>{card.name}</h2>
      </div>
    {/each}
  </div>
</div>

<style lang="postcss">
  #purchased-cards {
    padding: 1rem;
    & #card-grid {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      grid-gap: 0.5rem;
      text-align: center;
      & .card {
        position: relative;
        & h2 {
          font-size: 1rem;
        }
        &.new {
          &::after {
            content: 'New';
            background-color: var(--secondary);
            position: absolute;
            top: 0;
            right: -1rem;
            rotate: 30deg;
            padding-inline: 1rem;
            z-index: 2;
          }
          /* & > img {
            -webkit-box-shadow:0px 0px 12px 6px rgba(255,220,46,0.25);
            -moz-box-shadow: 0px 0px 12px 6px rgba(255,220,46,0.25);
            box-shadow: 0px 0px 12px 6px rgba(255,220,46,0.25);
          } */
        }
      }
    }
  }
</style>
