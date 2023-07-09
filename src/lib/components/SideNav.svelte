<script>
  export let navIsOpen;
  import { invalidateAll, goto } from '$app/navigation';
  import { createEventDispatcher } from 'svelte';
  import hamburgerIcon from '$assets/svg/hamburger.svg?raw';
  import collapseIcon from '$assets/svg/arrow-left.svg?raw';
  import homeIcon from '$assets/svg/home.svg?raw';
  import exploreIcon from '$assets/svg/explore.svg?raw';
  import messagesIcon from '$assets/svg/message.svg?raw';
  import bookmarkIcon from '$assets/svg/bookmark.svg?raw';
  import notificationsIcon from '$assets/svg/notification.svg?raw';
  import listIcon from '$assets/svg/list.svg?raw';
  import profileIcon from '$assets/svg/profile.svg?raw';
  import moreIcon from '$assets/svg/more.svg?raw';
  import logoutIcon from '$assets/svg/logout.svg?raw';
  import pokeballIcon from '$assets/svg/pokeball.svg?raw';
  import toast from 'svelte-french-toast';

  const dispatch = createEventDispatcher();

  function toggleSideNav() {
    dispatch('toggleSideNav');
  }

  const logOut = async () => {
    try {
      toast.success('Logging out...');
      document.cookie = 'user_email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = 'logged_in=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      setTimeout(() => {
        invalidateAll();
        goto('/login');
      }, 1500);
    } catch (error) {
      toast.error('Oops, something went wrong...');
    }
  }

  const handleClick = (e) => {
    if (e.target.dataset.function ==='n/a') {
      toast.error("Sorry, this button doesn't do anything yet...")
    }
  }
</script>

<aside class:open={navIsOpen}>
  <div id="control-nav">
    {#if navIsOpen }
      <button on:click={toggleSideNav}>{@html collapseIcon}</button>
    {:else}
      <button on:click={toggleSideNav}>{@html hamburgerIcon}</button>
    {/if}
  </div>
  <nav>
    <ul>
      <li><a title="Home" data-function="home" href="/">{@html homeIcon}Home</a></li>
      <li><a title="Explore" data-function="explore" href="/sets">{@html exploreIcon}Explore</a></li>
      <li><a title="Notifications" data-function="n/a" on:click|preventDefault={handleClick} href="/">{@html notificationsIcon}Notifications</a></li>
      <li><a title="Messages" data-function="n/a" on:click|preventDefault={handleClick} href="/">{@html messagesIcon}Messages</a></li>
      <li><a title="Bookmarks" data-function="n/a" on:click|preventDefault={handleClick} href="/">{@html bookmarkIcon}Bookmarks</a></li>
      <li><a title="Lists" data-function="n/a" on:click|preventDefault={handleClick} href="/">{@html listIcon}Lists</a></li>
      <li><a title="Profile" data-function="n/a" on:click|preventDefault={handleClick} href="/">{@html profileIcon}Profile</a></li>
      <li><a title="More" data-function="n/a" on:click|preventDefault={handleClick} href="/">{@html moreIcon}More</a></li>
      <li><a title="Log Out" data-function="logout" on:click|preventDefault={logOut} href="/login"><span style="transform: rotate(180deg);">{@html logoutIcon}</span>Log Out</a></li>
    </ul>
    <button title="Catch" class="catch-button">
      {#if navIsOpen }
        Catch&nbsp;
      {/if}
      <span class="pokeball-icon">{@html pokeballIcon}</span></button>
  </nav>
</aside>

<style lang="postcss">
  aside {
    padding: 3rem 0 3rem 1rem;
    position: relative;
    &.open {
      padding: 3rem 1.5rem;
      & .catch-button {
        
      }
    }
    & #control-nav {
      & button {
        position: absolute;
        right: 0;
        top: 1rem;
        padding: 0;
        margin: 0;
        background-color: transparent;
        border: none;
        width: auto;
        & svg {
          width: 30px;
          height: 30px;
        }
      }
    }
    & nav {
      width: min(100%, 200px);
      margin-left: auto;
      & ul {
        margin-bottom: 1.5rem;
        & li {
          & a {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            gap: 0.5rem;
            overflow: hidden;
            & svg {
              width: 36px;
              min-width: 36px;
              height: 36px;
              min-height: 36px;
            }
          }
        }
      }
    }
    & .catch-button {
      display: flex;
      justify-content: center;
      align-items: center;
      line-height: 1;
      overflow: hidden;
      gap: 0.5rem;
      & .pokeball-icon {
        & svg {
          width: 24px;
          height: 24px;
        }
      }
    }
  }
  :global(.catch-button:hover svg) {
    animation: spin 1s linear infinite;
  }
  @keyframes spin {
    from {
      rotate: 0deg;
    }
    to {
      rotate: 360deg;
    }
  }
</style>
