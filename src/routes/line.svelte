<script lang="ts">
  import Bubble from "./bubble.svelte";
    import type { LineData } from "./data_connector";
    import type { Challenge } from "./translator";


  export let challenge: Challenge;

  let openTooltipIndex = -1;

  let toggleTooltip = (index: number) => {
    openTooltipIndex = openTooltipIndex === index ? -1 : index;
  };
</script>

<p class="m-auto display text-center pb-20 p-10 text-3xl leading-loose">
  {#each challenge.data as part, index}
    {#if typeof part == "string"}
      {part}
    {:else}
      <Bubble data={{original:part[1],translation:part[0]}} {index} {openTooltipIndex} {toggleTooltip} fail={()=>challenge.fail([part[0],part[1]])} />
    {/if}
  {/each}
</p>
