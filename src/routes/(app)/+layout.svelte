<script>
  import SideNav from '$components/SideNav.svelte';
  import Bench from '$components/Bench.svelte';
  import PokeballLoader from '$components/PokeballLoader.svelte';
  export let data;
  const benchedCards = data.benchedCards;

  let navIsOpen = true;

  $: pokeModal = false

  const loadPokeball = () => {
    pokeModal = true;
    setTimeout(() => {
      pokeModal = false;
    }, 6000);
  }
</script>

<div id="feed-grid" class="grid" class:nav-is-open={navIsOpen} >
  <SideNav {navIsOpen} on:loadPokeball={loadPokeball} on:toggleSideNav={() => navIsOpen = !navIsOpen} />

  <main>
    <slot></slot>
  </main>

  {#if benchedCards?.length > 0 }
    <Bench {benchedCards} />
  {/if}

  
</div>

{#if pokeModal }
  <PokeballLoader />
{/if}

<style lang="postcss">
  #feed-grid {
    transition: grid-template-columns 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    grid-template-columns: 50px 1fr min(25%, 375px);
    &.nav-is-open {
      grid-template-columns: 20% 1fr min(25%, 375px);
    }
    & main {
      border: 1px solid var(--primary-focus);
      border-top: none;
    }
  }
</style>
