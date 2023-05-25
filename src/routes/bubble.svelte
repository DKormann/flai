<script lang="ts">
  export var data: { translation: string; original: string };

  var opened = false;

  function toggle() {
    console.log("toggle");

    opened = !opened;
  }
</script>

<button class="text-primary" on:click={toggle}>
  {#if opened}
    <div class="tooltip" data-tip={data.original}>
      {data.translation}
    </div>
  {:else}
    {data.translation}
  {/if}
</button>
