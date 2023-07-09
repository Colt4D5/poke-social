<script>
  export let post = {
    pinned: false,
    id: '2498gahlsihfq8qfsh8idah',
    name: 'Joe Schmuck',
    username: 'jschmuck07',
    date: 'May 20',
    avatar: 'https://plus.unsplash.com/premium_photo-1663054503467-950366c7e782?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80',
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.Aperiam laboriosam aspernatur, quo debitis odio eius natus quaerat ab laudantium explicabo soluta! Eligendi laudantium nulla labore?',
    image: 'https://images.unsplash.com/photo-1688746515540-61243f2012b9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80',
    liked: false,
    stats: {
      comments: 4,
      shares: 15,
      likes: 37,
    }
  }
  import commentIcon from '$assets/svg/comment.svg?raw';
  import reshareIcon from '$assets/svg/reshare.svg?raw';
  import heartIcon from '$assets/svg/heart.svg?raw';
  import shareIcon from '$assets/svg/share.svg?raw';
</script>

<article data-id={post.id}>
  {#if post.pinned }
    <div class="pinned">{'<'} Pinned Tweet</div>
  {/if}
  <div id="post-data">
    <section class="post-avatar">
      <div class="avatar" style="background-image: url({post.avatar});"></div>
    </section>
    <section class="post-content">
      <h3 class="post-user-data">{post.name}
        {#if post.username}
          <span class="username">@{post.username}</span>
        {/if}
        {#if post.date}
          <span class="date">• {post.date}</span>
        {/if}
      </h3>
      <p class="post-copy">{post.content}</p>
      {#if post.image }
        <div class="post-image" style="background-image: url({post.image});"></div>
      {/if}
      <div class="post-share-bar">
        <button>{@html commentIcon}{post.stats.comments}</button>
        <button>{@html reshareIcon}{post.stats.shares}</button>
        <button class:liked={post.liked}>{@html heartIcon}{post.stats.likes}</button>
        <button>{@html shareIcon}</button>
      </div>
    </section>
  </div>
</article>

<style>
  article {
    margin: 0;
    background-color: var(--background-color);
    padding: 1rem 2rem 1rem 1rem;
    border-top: 1px solid var(--primary-focus);
    border-bottom: 1px solid var(--primary-focus);
    & .pinned {
      padding-left: 4rem;
      font-size: 0.9rem;
    }
    & #post-data {
      display: flex;
      gap: 1rem;
      & section {
        margin: 0;
        &.post-avatar {
          & .avatar {
            width: 75px;
            aspect-ratio: 1 / 1;
            border-radius: 50%;
            background-size: cover;
            background-position: center;
          }
        }
        &.post-content {
          flex: 1;
          & .post-user-data {
            margin-bottom: 0.5em;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            & .username {
              font-size: 75%;
              font-weight: 300;
              opacity: 0.6;
              padding-left: 1rem;
            }
            & .date {
              font-size: 75%;
              font-weight: 300;
              padding-left: 0.25rem;
            }
          }
          & .post-copy {
            margin-bottom: 0;
          }
          & .post-image {
            width: 100%;
            aspect-ratio: 2 / 1;
            border-radius: 1rem;
            /* background-color: #ffffff11; */
            background-size: cover;
            margin-top: 1rem;
          }
        }
        & .post-share-bar {
          padding-top: 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          & button {
            background-color: transparent;
            border: none;
            width: auto;
            padding: 0;
            margin: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.25rem;
            & svg {
              width: 1.5rem;
              height: 1.5rem;
              /* stroke-width: 1px; */
            }
            &.liked {
              & svg {
                fill: var(--primary);
              }
            }
          }
        }
      }
    }
  }
</style>
