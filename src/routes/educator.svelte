
<script lang="ts">
    import type { Book } from "./data_connector";
    import Line from "./line.svelte";
    import { Challenge, create_challenge } from "./translator";

    export var book: Book;

    let index = 1;

    let active_sentence: Challenge
    index_change()

    function next(){
        index = Math.min(book.data.length+1, index + 1);
        index_change()
    }

    function prev(){
        index = Math.max(1, index - 1);
        index_change()
    }


    function index_change(){
        active_sentence?.finish()
        active_sentence = create_challenge(book.data[index-1][1]);
    }



</script>

<div class="flex h-screen">
    
    <Line challenge={active_sentence} />

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
    <span class="text text-center">{book.title.replaceAll("_", " ")}</span>
  
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