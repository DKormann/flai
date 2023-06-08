<script lang="ts">
  import { onDestroy } from "svelte";

  export let data: { translation: string; original: string ; active:boolean};
  export let index: number;
  export let openTooltipIndex: number;
  export let toggleTooltip: (index: number) => void;
  export let fail:()=>void;


  import { fade } from "svelte/transition";

  function on_click() {
    toggleTooltip(index);
    //feedback(data.translation, data.original,false)
    fail()
  }
</script>

<button class={data.active?"text-primary": "text-current italic" +" relative"} on:click={on_click}>
  
  {#if openTooltipIndex === index}
    <span class="text-secondary">
        {data.translation}
    </span>
    <div class="absolute text-white mt-1 p-1 px-4 z-10 bg-gray-700 bg-opacity-100 rounded shadow-md">
      {data.original}
    </div>
  {:else}
    {data.translation}
  {/if}

</button>
