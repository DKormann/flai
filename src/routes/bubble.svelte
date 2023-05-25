<script lang="ts">
    import { onDestroy } from "svelte";

  export let data: { translation: string; original: string };
  export let index: number;
  export let openTooltipIndex: number;
  export let toggleTooltip: (index: number) => void;

  import { fade } from "svelte/transition";
    import { feedback } from "./translator";


  function on_click(){
    toggleTooltip(index)
    feedback(data.translation, data.original,false)
  }

</script>

<button class="text-primary relative" on:click={on_click}>
  {data.translation}

  {#if openTooltipIndex === index}
    <div
      class="absolute mt-1 p-1 px-4 z-10 bg-gray-700 bg-opacity-100 rounded shadow-md"
      transition:fade
    >
      {data.original}
    </div>
  {/if}
</button>
