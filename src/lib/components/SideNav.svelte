<script>
	import { invalidateAll, goto } from '$app/navigation';
	import { deleteCookie } from '$utils';
  import homeIcon from '$assets/svg/home.svg?raw';
  import exploreIcon from '$assets/svg/explore.svg?raw';
  import messagesIcon from '$assets/svg/message.svg?raw';
  import bookmarkIcon from '$assets/svg/bookmark.svg?raw';
  import notificationsIcon from '$assets/svg/notification.svg?raw';
  import listIcon from '$assets/svg/list.svg?raw';
  import profileIcon from '$assets/svg/profile.svg?raw';
  import moreIcon from '$assets/svg/more.svg?raw';
  import logoutIcon from '$assets/svg/logout.svg?raw';
  import toast from 'svelte-french-toast';

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

<aside>
  <nav>
    <ul>
      <li><a data-function="n/a" on:click|preventDefault={handleClick} href="/">{@html homeIcon}Home</a></li>
      <li><a data-function="n/a" on:click|preventDefault={handleClick} href="/">{@html exploreIcon}Explore</a></li>
      <li><a data-function="n/a" on:click|preventDefault={handleClick} href="/">{@html notificationsIcon}Notifications</a></li>
      <li><a data-function="n/a" on:click|preventDefault={handleClick} href="/">{@html messagesIcon}Messages</a></li>
      <li><a data-function="n/a" on:click|preventDefault={handleClick} href="/">{@html bookmarkIcon}Bookmarks</a></li>
      <li><a data-function="n/a" on:click|preventDefault={handleClick} href="/">{@html listIcon}Lists</a></li>
      <li><a data-function="n/a" on:click|preventDefault={handleClick} href="/">{@html profileIcon}Profile</a></li>
      <li><a data-function="n/a" on:click|preventDefault={handleClick} href="/">{@html moreIcon}More</a></li>
      <li><a data-function="logout" on:click|preventDefault={logOut} href="/login"><span style="transform: rotate(180deg);">{@html logoutIcon}</span>Log Out</a></li>
    </ul>
    <button>Tweet</button>
  </nav>
</aside>

<style lang="postcss">
  aside {
    padding: 3rem 1.5rem;
    & nav {
      width: min(90%, 200px);
      margin-left: auto;
      & ul {
        margin-bottom: 1.5rem;
        & li {
          & a {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            gap: 0.5rem;
            & svg {
              width: 36px;
              height: 36px;
            }
          }
        }
      }
    }
  }
</style>
