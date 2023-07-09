<script>
  import homeIcon from '$assets/svg/home.svg?raw';
  import exploreIcon from '$assets/svg/explore.svg?raw';
  import messagesIcon from '$assets/svg/message.svg?raw';
  import bookmarkIcon from '$assets/svg/bookmark.svg?raw';
  import notificationsIcon from '$assets/svg/notification.svg?raw';
  import listIcon from '$assets/svg/list.svg?raw';
  import profileIcon from '$assets/svg/profile.svg?raw';
  import moreIcon from '$assets/svg/more.svg?raw';
</script>

<aside>
  <nav>
    <ul>
      <li><a href="/">{@html homeIcon}Home</a></li>
      <li><a href="/">{@html exploreIcon}Explore</a></li>
      <li><a href="/">{@html notificationsIcon}Notifications</a></li>
      <li><a href="/">{@html messagesIcon}Messages</a></li>
      <li><a href="/">{@html bookmarkIcon}Bookmarks</a></li>
      <li><a href="/">{@html listIcon}Lists</a></li>
      <li><a href="/">{@html profileIcon}Profile</a></li>
      <li><a href="/">{@html moreIcon}More</a></li>
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
