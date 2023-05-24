
<script lang="ts">
    import { browser } from "$app/environment";
    import { tick } from "svelte";

    import { create_line } from "./line";




    const sentences = ['Call me Ishmael.',
 'Some years ago — never mind how long precisely — having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world.',
 'It is a way I have of driving off the spleen and regulating the circulation.',
 'Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to sea as soon as I can.',
 'This is my substitute for pistol and ball.',
 'With a philosophical flourish Cato throws himself upon his sword; I quietly take to the ship.',
 'There is nothing surprising in this.',
 'If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the ocean with me.']
    
    var counter = 0

    const translations = new Map<string, string> ([
        ["Call me", "Appelez-moi"],
        ["years","années"],
        ["sail","tour en mer"],
        ["world","monde"],
        ["driving off","chasser"],
        ["Whenever","Chaque fois que"],
        ["mouth","bouche"],
        ["damp","humide"],
        ["November","novembre"],
        ["soul","âme"],
        ["involuntarily","involontairement"],
        ["pausing","pausant"],
        ["coffin","cercueil"],
        ["bringing up","ramenant"],
        ["rear","arrière"],
        ["funeral","funérailles"],
        ["hypos","hypos"],
        ["upper hand","main supérieure"],
        ["requires","exige"],
        ["principle","principe"],
        ["deliberately","délibérément"],
        ["stepping","marcher"],
        ["methodically","méthodiquement"],
        ["knocking","frapper"],
        ["hats","chapeaux"],
        ["account","compte"],
        ["high","haut"],
        ["time","temps"],
        ["substitute","substitut"],
        ["pistol","pistolet"],
        ["ball","balle"],
        ["philosophical","philosophique"],
        ["flourish","floraison"],
        ["Cato","Caton"],
        ["throws","jette"],
        ["himself","lui-même"],
        ["upon","sur"],
        ["sword","épée"],
        ["quietly","tranquillement"],
        ["take","prendre"],
        ["ship","navire"],
        ["surprising","surprenant"],
        ["knew","savait"],
        ["almost","presque"],
        ["degree","degré"],
        ["some","quelques"],
        ["time","temps"],
        ["other","autre"],
        ["cherish","chérir"],
        ["nearly","presque"],
        ["same","même"],
        ["feelings","sentiments"],
        ["towards","vers"],
        ["ocean","océan"],
    ])

    var all_words = new Map<string, number> ()

    

    var active_line:HTMLParagraphElement
    var display:HTMLDivElement
    
    function next(){
        active_line = create_line(sentences[counter],translations)

        counter = Math.min(counter+1,sentences.length-1)
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
        sdlkfjsdlkfj
    </div>

</div>

<div class=navbar> 

    <button on:click={back}> back &lt;&lt </button>
    <button on:click={next}>>> next</button>
    
</div>

