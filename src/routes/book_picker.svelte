
<script lang="ts">
    import { validate_each_keys } from "svelte/internal";
    import type { Inventory } from "./data_connector";
    import { clear } from "./translator";

    import {locals, type lang} from "./ui_versions"

    export var inventory : Inventory
    export var callback : (origin:string,target:string,title:string)=>void
    export var abort:()=>void

    
    var native_language : lang
    var learning_language : lang
    var native_language_data: { targets: {books:string[], language:lang}[] ; origin_language?: lang; } | null = null
    var learning_language_data: { books: string[], language:lang } | null = null
        

    function pick_native(index:number){
        native_language = inventory[index].origin_language
        native_language_data = inventory[index]
    }
    function pick_learning(index:number){
        learning_language_data = native_language_data!.targets[index]

    }

    function pick_title(index:number){
        const book = learning_language_data!.books[index]
        callback(native_language_data!.origin_language!,learning_language_data!.language,book)
    }    

</script>

<!-- svelte-ignore missing-declaration -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div id="backdrop" class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50" on:click ={(e)=>{

    if(e.target == e.currentTarget){
        abort()
    }}}>

    <div id="book_picker" class="bg-gray-700 rounded-xl p-8">
        {#if native_language_data == null}
            <h2 class="text-3xl text-center text-gray-200 mb-6">{locals.whats_native["en"]}</h2>

            <div class="justify-center">
                {#each inventory as item,i}
                    <button class="px-4 py-2 bg-blue-500 text-white rounded-md m-auto mt-2 block" on:click={()=>pick_native(i)}>{locals.I_speak[item.origin_language]}</button>
                {/each}
            </div>
            
            <h2 class="text-3xl text-center mt-4">Delete all user data</h2>
            <div class="flex justify-center">
                <button class="px-4 py-2 bg-red-500 text-white rounded-md m-2" on:click ={clear}>Delete</button>
            </div>
        {:else if learning_language_data == null}
            <h2 class="text-3xl text-center text-gray-200 mb-6">{locals.whats_target[native_language]}</h2>
            <div class="flex justify-center">
                {#each native_language_data.targets as item,i}
                    <button class="px-4 py-2 bg-blue-500 text-white rounded-md m-2" on:click={()=>pick_learning(i)}>{locals.lang[native_language][item.language]}</button>
                {/each}
            </div>
        {:else}
            <h2 class="text-3xl text-center text-gray-200 mb-6">Pick a book</h2>
            <div class="flex justify-center">
                {#each learning_language_data.books as book,i}
                    <button class="px-4 py-2 bg-blue-500 text-white rounded-md m-2" on:click={()=>pick_title(i)}>{book}</button>
                {/each}
            </div>
        {/if}
    </div>
</div>