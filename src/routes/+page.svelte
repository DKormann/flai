<script lang="ts">
  import { fade } from "svelte/transition";
  import { moby_dick } from "./data";
  import { slide } from "svelte/transition";
  import { swipe } from "svelte-gestures";

  import { onMount, onDestroy } from "svelte";
    import Line from "./line.svelte";

  let counter = 0;

  const book = moby_dick;


  let active_lines = [book.sentences[counter]];

  function next() {
    counter = Math.min(counter + 1, book.sentences.length - 1);
    active_lines = [book.sentences[counter]];
  }

  function back() {
    counter = Math.max(counter - 1, 0);
    active_lines = [book.sentences[counter]];
  }

  function swipeHandler(event: any) {
    console.log(event.detail.direction);
    const direction = event.detail.direction;
    if (direction == "left") next();
    else if (direction == "right") back();
  }

  onMount(()=>window.addEventListener("keydown",(event:KeyboardEvent)=>{
    if ( event.key == "ArrowLeft" || event.key == "a") back()
    else if (event.key == "ArrowRight" || event.key == "d") next()
  }))

  function create_line(txt: string, translations: Map<string, string>): string {
    for (const [original, translation] of translations) {
      if (txt.includes(original)) {
        const arg = `<div class="tooltip tooltip-accent" data-tip="${original}"><span class="bg-primary bg-opacity-50 p-1 rounded-xl">${translation} </span></div>`;
        txt = txt.replaceAll(original, arg);
      }
    }

    return txt;
  }
</script>

<!-- <div
  class="fixed h-screen w-screen"
  use:swipe={{ touchAction: "pan-y" }}
  on:swipe={swipeHandler}
/> -->

<div class="flex h-screen">
  <div class="m-auto">
    <div class="display text-center pb-20 p-10 text-3xl leading-loose">
      {#each active_lines as line (counter)}
        <div in:slide={{ duration: 1000 }}>
          <!-- {@html line} -->
          <Line txt={line} translations={book.translations} />
        </div>
      {/each}
    </div>
  </div>
</div>

<div class="btm-nav">
  <button on:click={back} disabled={counter === 0}
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
  <button on:click={next} disabled={counter === book.sentences.length - 1}
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
