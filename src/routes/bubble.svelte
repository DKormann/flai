<script lang="ts">
  export let data: { translation: string; original: string };
  export let index: number;
  export let openTooltipIndex: number;
  export let toggleTooltip: (index: number) => void;

  import { fade } from "svelte/transition";
</script>

<button class="text-primary relative" on:click={() => toggleTooltip(index)}>
  {data.translation}

  {#if openTooltipIndex === index}
    <div
      class="absolute mt-1 p-1 px-4 z-10 bg-gray-700 bg-opacity-80 rounded shadow-md"
      transition:fade
    >
      {data.original}
    </div>
  {/if}
</button>
