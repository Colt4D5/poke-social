<script>
  import '@picocss/pico';
  import "../app.postcss";
  import SideNav from '$components/SideNav.svelte';
</script>

<div id="feed-grid" class="grid">
  <SideNav />

  <main>
    <slot></slot>
  </main>

  <aside>

  </aside>

</div>

<style lang="postcss">
  #feed-grid {
    grid-template-columns: 1fr min(60%, 800px) 1fr;
    & aside {
      /* flex: 1; */
    }
    & main {
      /* flex: 2; */
      border: 1px solid var(--primary-focus);
      border-top: none;
    }
  }
</style>
