
<script lang="ts">
    import Bubble from "./bubble.svelte";
    import type { Book, load_book } from "./data_connector";

    import { Challenge, create_challenge, create_no_challenge } from "./translator";

    export var book: Book;
    export var change_book: () => void;
    export var index: number;
    export var set_page: (page: number) => void;

    $: console.log("book:",book.switched);

    $: if (index != -1){
        index_change()
    }
    

    let active_sentence: Challenge
    index_change()

    function next(){
        
        active_sentence?.finish()
        index = Math.min(book.data.length+1, index + 1);
        index_change()
    }

    function prev(){
        index = Math.max(1, index - 1);
        index_change()
    }

    var openTooltipIndex = -1;

    function toggleTooltip(index: number) {
        openTooltipIndex = openTooltipIndex === index ? -1 : index;
    }


    function index_change(){
        if (index == null || index == -1) return;
        console.log("index:",index);
        
        active_sentence = create_challenge(book.data[index-1][book.switched ? 1:0]);
        set_page(index)
        openTooltipIndex = -1;
        lang_switched = false
    }

    window.addEventListener( "keyup" , (event: KeyboardEvent) => {
        if (event.key == "ArrowLeft" || event.key == "a") prev();
        else if (["ArrowRight","d"," "].includes(event.key)) next();
    });

    var lang_switched = false

    function switch_lang(){
        lang_switched = !lang_switched
    }


</script>

<div class="flex h-screen">
    
    <p class="m-auto display text-center pb-20 p-10 text-3xl leading-loose">
      {#if !lang_switched}
        {#each active_sentence.data as part, index}
          {#if typeof part == "string"}
              {part}
          {:else}
              <Bubble data={{original:part[1],translation:part[0],active:part[2]}} {index} {openTooltipIndex} {toggleTooltip} fail={()=>active_sentence.fail([part[0],part[1]])} />
          {/if}
        {/each}
      {:else}
        {#each create_no_challenge(book.data[index-1][book.switched ? 0:1]).data as part, index}
          {#if typeof part == "string"}
              {part}
          {:else}
              <Bubble data={{original:part[0],translation:part[1],active:part[2]}} {index} {openTooltipIndex} {toggleTooltip} fail={()=>active_sentence.fail([part[0],part[1]])} />
          {/if}
        {/each}
      {/if}
      <br>
      <br>

      <button class="text-primary font-semibold rounded px-4 py-0" on:click={switch_lang}>switch</button>
    </p>


</div>


<div class="btm-nav">

    <button on:click={prev} disabled={index < 1}
      ><svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
        />
      </svg>
    </button>
  
    <div class="columns-2">
      <input
        type="number"
        min="1"
        max={book.data.length}
        bind:value={index}
        on:input={index_change}
        class="text-center"
      />
      <div class="text-xl">/{book.data.length}</div>
    </div>

    <button on:click={change_book} class="text text-center">{book.title.replaceAll("_", " ")}</button>
  
    <button on:click={next} disabled={index >= book.data.length - 1}
      ><svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
        />
      </svg>
    </button>
  </div>