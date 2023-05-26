<script lang="ts">
  import Bubble from "./bubble.svelte";
  import type { Sentence } from "./translator";

  export let data: Sentence = [""];

  let openTooltipIndex = -1;

  let toggleTooltip = (index: number) => {
    openTooltipIndex = openTooltipIndex === index ? -1 : index;
  };
</script>

<p>
  {#each data as part, index}
    {#if typeof part == "string"}
      {part}
    {:else}
      <Bubble data={part} {index} {openTooltipIndex} {toggleTooltip} />
    {/if}
  {/each}
</p>
