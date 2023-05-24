
<script lang="ts">
    import { browser } from "$app/environment";
    import { tick } from "svelte";

    import { create_line } from "./line";
    import { moby_dick } from "./data";

    var counter = 0

    var all_words = new Map<string, number> ()

    const book = moby_dick

    var active_line:HTMLParagraphElement
    var display:HTMLDivElement
    
    function next(){
        active_line = create_line(book.sentences[counter],book.translations)

        counter = Math.min(counter+1,book.sentences.length-1)
        display.innerHTML = ""
        display.appendChild(active_line)
    }

    function back(){
        counter = Math.max(counter-2,0)
        next()
    }

    if (browser){
        tick().then(()=>{
            display = document.querySelector(".display")!
            next()
        })
    }


</script>

<h1 id = header> prototype prototype prototype prototype prototype </h1>

<div class = content>
    <div class = display>
        <placeholder>
    </div>

</div>

<div class=navbar> 

    <button on:click={back}> back &lt;&lt </button>
    <button on:click={next}>>> next</button>
    
</div>

