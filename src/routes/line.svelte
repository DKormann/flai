<script lang="ts">
  import { bubble, text } from "svelte/internal";
  import Bubble from "./bubble.svelte";
    import { insertTranslations } from "./translator";

  /**
   * @type {string}
   */
  export var txt: string;

  const result = insertTranslations(txt)

  let openTooltipIndex = -1;

  let toggleTooltip = (index: number) => {
    openTooltipIndex = openTooltipIndex === index ? -1 : index;
  };
</script>

<p>
  {#each result as part, index}
    {#if typeof part == "string"}
      {part}
    {:else}
      <Bubble data={part} {index} {openTooltipIndex} {toggleTooltip} />
    {/if}
  {/each}
</p>
