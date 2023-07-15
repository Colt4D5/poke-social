<script>
	import { goto } from '$app/navigation';
	import { toast } from 'svelte-french-toast';
  import PokeballLoader from "$components/PokeballLoader.svelte";
  export let data;
  const { set } = data;

  $: pokeModal = false

  const purchaseBooster = async () => {
    openPokeball();
    const res = await fetch('/api/purchase-set', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        set,
        user: data.user
      })
    })
    closePokeball();
    const json = await res.json();
    toast.success('Success!')
    setTimeout(() => {
      goto(`/trainer-profile/purchases/${json.body.purchase_id}`)
    }, 1250);
  }

  const openPokeball = () => {
    pokeModal = true;
  }

  const closePokeball = () => {
    pokeModal = false;
  }
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
      <p>Release Date: {set.releaseDate}</p>
      <button>Add to favorites</button>
      <button on:click={purchaseBooster}>Open</button>
    </div>
  </div>
  <hr>
  <!-- {#if holos?.data?.length > 0 }
    <div id="fine-details">
      <h3>Notable Cards</h3>
      <div id="notable-cards">
        {#each holos.data as card }
          <div class="card">
            <img src={card.images.small} alt={card.name}>
          </div>
        {/each}
      </div>
    </div>
  {/if} -->
</div>

{#if pokeModal }
  <PokeballLoader />
{/if}

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
    & #fine-details {
      & #notable-cards {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-gap: 1rem;
        & .card {
          & img {
            border-radius: 0.25rem;
          }
        }
      }
    }
  }
</style>
