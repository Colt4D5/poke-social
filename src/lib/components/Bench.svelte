<script>
  import { fade, scale } from 'svelte/transition';
  import { quintOut, quintIn, quintInOut } from 'svelte/easing';
  export let benchedCards = [];

  const modal = {
    isOpen: false,
    card: null
  }

  const openCard = (card) => {
    modal.card = card;
    modal.isOpen = true;
  }

  const closeCard = () => {
    modal.isOpen = false;
    modal.card = {};
  }
</script>

<aside>
  <h2>My Bench</h2>
  <div id="bench">
    {#each benchedCards as card }
      <img on:click={() => openCard(card)} class="bench-card" src={card.images.small} alt="Benched Pokemon Card">
    {/each}
  </div>
</aside>

{#if modal.isOpen }
  <dialog open in:fade out:fade={{ delay: 200, duration: 250 }}>
    <div class="zoomed-card-container" in:scale={{ duration: 250, delay: 250, opacity: 0.5, start: 0.25, easing: quintOut }} out:scale={{ duration: 400, opacity: 0.5, start: 0.25, easing: quintOut }}>
      <img src={modal.card.images.large} alt={modal.card.name}>
      <!-- <form method="dialog"> -->
        <button class="close" on:click={closeCard}>&#10006;</button>
      <!-- </form> -->
    </div>
  </dialog>
{/if}

<style lang="postcss">
  aside {
    position: sticky;
    padding-top: 1rem;
    & h2 {
      margin-bottom: 1rem;
    }
    & #bench {
      background-color: #ffffff11;
      border-radius: 1rem;
      padding: 0.75rem;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(3, 1fr);
      gap: 0.5rem;
      & img {
        width: 100%;
        aspect-ratio: 3 / 4;
        object-fit: contain;
        object-position: center;
        cursor: zoom-in;
        border-radius: 0.5rem;
      }
    }
  }

  dialog {
    position: fixed;
    & .zoomed-card-container {
      position: relative;
      & img {
        height: 80vh;
        border-radius: 1rem;
      }
      & .close {
        position: absolute;
        top: 0;
        right: 0;
        width: auto;
        transform: translate(60%, -60%);
        background-color: #ffffff88;
        border: none;
        padding: 0.5rem;
        line-height: 1;
        width: 42px;
        aspect-ratio: 1 / 1;
        transition: scale 0.5s ease;
        &:hover {
          scale: 1.05;
        }
      }
    }
  }
</style>
