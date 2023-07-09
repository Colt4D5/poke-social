<script>
  export let data;
  console.log(data?.id);
</script>

<div class="padding-block"></div>

{#if data.id }
  <h1>ID: {data.id}</h1>
{/if}