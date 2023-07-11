<script>
  export let data;
  const { user } = data;
</script>

<div class="padding-block"></div>
<section id="profile-content">
  <h1>@{user.username}</h1>

  <a class="button" href="/trainer-profile/cards">My Cards</a>
  <a class="button" href="/trainer-profile/purchases">My Purchases</a>
</section>

<style lang="postcss">
  section {
    padding: 1rem;
  }
</style>
