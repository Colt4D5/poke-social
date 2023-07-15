<script>
	import { fade, scale } from 'svelte/transition';
</script>

  <dialog id="poke-modal" open transition:fade={{ duration: 300, delay: 500 }}>
    <div class="inner">
      <div class="pokeball" transition:scale={{ duration: 300, delay: 500 }}>
        <div class="top"></div>
        <div class="bottom"></div>
      </div>
    </div>
  </dialog>

<style lang="postcss">
  #poke-modal {
    & .inner {
      & .pokeball {
        height: 70dvh;
        aspect-ratio: 1 / 1;
        border-radius: 50%;
        overflow: hidden;
        position: relative;
        & .top {
          height: 50%;
          background-color: #f00;
        }
        & .bottom {
          height: 50%;
          background-color: #fff;
        }
        &::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
          width: 100%;
          height: 18%;
          background-color: #000;
          z-index: 2;
        }
        &::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 20%;
          aspect-ratio: 1 / 1;
          background-color: #fff;
          z-index: 3;
          border-radius: 50%;
          outline: 4dvh solid #000;
        }
      }
    }
  }
  :global(.pokeball) {
    animation: spin 8s ease-in-out forwards;
  }
  @keyframes spin {
    from {
      rotate: 0deg;
    }
    to {
      rotate: 4320deg;
    }
  }
</style>
