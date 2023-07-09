<script>
  import Post from "../lib/components/Post.svelte";
  export let data;
  import { posts } from './posts';
</script>

<div class="padding"></div>

<div id="user-banner" style="background-image: url({data.user.banner})">
  <img id="user-avatar" src={data.user.avatar} alt="Avatar" />
</div>


<div id="feed">
  <div id="user-info">
    <h2 id="user-name">{data.user.name}</h2>
    <h3 id="user-username">@{data.user.username}</h3>
  </div>

  {#each posts as post }
    <Post {post} />
  {/each}
  
</div>

<style lang="postcss">
  #user-banner {
    --avatar-size: 175px;
    width: 100%;
    min-height: 250px;
    background-size: cover;
    position: relative;
    margin-bottom: calc(var(--avatar-size) / 2);
    & #user-avatar {
      border-radius: 50%;
      position: absolute;
      bottom: 0;
      left: 1.5rem;
      transform: translateY(50%);
      width: var(--avatar-size);
      aspect-ratio: 1 / 1;
      outline: 6px solid var(--background-color);
    }
  }

  #feed {
    & #user-info {
      padding: 1rem;
      & #user-name {
        margin-bottom: 0;
      }
      & #user-username {
        opacity: 0.5;
        font-weight: 300;
        font-size: 1rem;
        line-height: 1;
      }
    }
  }
</style>
