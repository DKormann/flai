<script lang="ts">
    import { slide } from "svelte/transition";
    import { onMount } from "svelte";

    import Line from "./line.svelte";
    // import {
	// 	load_and_translate_first_book,
	// 	type Book,
	// 	type Sentence,
    // } from "./translator";

    import { data_setup, load_book, type Inventory, type BookData, type Book } from "./data_connector"
    import BookPicker from "./book_picker.svelte";
    import Educator from "./educator.svelte";

    let book: Book | null = null

    let sentence_index = -1;
    // let active_sentence: Sentence[] = [[""]];

    let user_index = 1;

	let inventory :Inventory
	let show_inventory = false

    function next() {
    //   sentence_index = Math.min(book.sentences.length, sentence_index + 1);
    //   active_sentence = [book.sentences[sentence_index]];

    //   user_index = sentence_index + 1;
    }

    function prev() {
    //   sentence_index = Math.max(0, sentence_index - 1);
    //   active_sentence = [book.sentences[sentence_index]];

    //   user_index = sentence_index + 1;
    }

    function user_index_change() {
    //   if (user_index == null) return;
    //   sentence_index = user_index - 1;
    //   active_sentence = [book.sentences[sentence_index]];
    }

    function swipeHandler(event: any) {

      const direction = event.detail.direction;
      if (direction == "left") next();
      else if (direction == "right") prev();
    }

    onMount(async () => {

      data_setup().then((data) => {

		inventory = data
		show_inventory = true

	  })

      window.addEventListener("keydown", (event: KeyboardEvent) => {
        if (event.key == "ArrowLeft" || event.key == "a") prev();
        else if (["ArrowRight","d"," "].includes(event.key))
          next();
      });

    //   book = await load_and_translate_first_book("english", "spanish");
    //   next();


    });

	let preferences = {
		native_language: "",
		learning_language: "",
		title: ""
	}

	let switched = false

	function settopic(native:string, learning:string, title:string){

		show_inventory = false
		preferences = {
			native_language: native,
			learning_language: learning,
			title: title
		}

		console.log("preferences",preferences);

		load_book(native,learning,title).then(b=>book = b)
		
	}
</script>

<!-- <div
  class="fixed h-screen w-screen"
  use:swipe={{ touchAction: "pan-y" }}
  on:swipe={swipeHandler}
/> -->

<!-- <div class="flex h-screen">
  {#if sentence_index != -1}
    <div class="m-auto">
      <div class="display text-center pb-20 p-10 text-3xl leading-loose">
        {#each active_sentence as line (sentence_index)}
          <div in:slide={{ duration: 10 }}>
            <Line data={active_sentence[0]} />
          </div>
        {/each}
      </div>
    </div>
  {/if}
</div> -->

{#if book != null}
	<Educator book = {book}></Educator>
{/if}

{#if show_inventory}
	<BookPicker inventory = {inventory} callback = {settopic}></BookPicker>
{/if}

<dialog id="myDialog">
    <h2>Dialog Box</h2>
    <p>This is a sample dialog box.</p>
    <button>Close</button>
  </dialog>
<!-- 
<div class="btm-nav">

  <button on:click={prev} disabled={sentence_index < 1}
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
      max={book.sentences.length}
      bind:value={user_index}
      on:input={user_index_change}
      class="text-center"
    />
    <div class="text-xl">/{book.sentences.length}</div>
  </div>
  <span class="text text-center">{book.title.replaceAll("_", " ")}</span>

  <button on:click={next} disabled={sentence_index >= book.sentences.length - 1}
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
</div> -->
