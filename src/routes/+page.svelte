<script lang="ts">
    import { fade } from "svelte/transition";
    import { data_setup } from "./data";
    import { slide } from "svelte/transition";
    import { swipe } from "svelte-gestures";

    import { onMount, onDestroy } from "svelte";
    import Line from "./line.svelte";

    let index = -1;

    import {book} from "./data"

    var active_sentence = ["palce"]

    function next(){
        index = Math.min(book.sentences.length,index+1)
        active_sentence = [book.sentences[index]]
    }

    function prev(){
        index = Math.max(0,index-1)
        active_sentence = [book.sentences[index]]
    }

    function swipeHandler(event: any) {
        console.log(event.detail.direction);
        const direction = event.detail.direction;
        if (direction == "left") next();
        else if (direction == "right") prev();
    }

    onMount(()=>{
        window.addEventListener("keydown",(event:KeyboardEvent)=>{

            if ( event.key == "ArrowLeft" || event.key == "a") prev()
            else if (event.key == "ArrowRight" || event.key == "d" || event.key==" ") next()
                
        })

        data_setup().then(()=>{

            next()
        })

    })


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

    {#if index!=-1}
        <div class="m-auto">
            <div class="display text-center pb-20 p-10 text-3xl leading-loose">

                {#each active_sentence as line (index)}
                    <div in:slide={{ duration: 1000 }}>
                        <Line txt={active_sentence[0]} translations={new Map([])} />

                    </div>
                {/each}
            </div>

        </div>
    {/if}

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

    <!-- <input type="number" min="1" max={book.sentences.length} bind:value={index} class="page-input" /> -->

    <span class="text-xl">{index+1}/{book.sentences.length}</span>
    <span class="text-xl">{book.title.replaceAll("_"," ")}</span>

    <button on:click={next} disabled={index >= book.sentences.length - 1}
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