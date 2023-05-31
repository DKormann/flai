
<script lang="ts">
    import { validate_each_keys } from "svelte/internal";
    import type { Inventory } from "./data_connector";

    export var inventory : Inventory
    export var callback : (origin:string,target:string,title:string)=>void


    // inventory = [
    //     {
    //         origin_language: "English",
    //         targets: [
    //             {
    //                 language: "Spanish",
    //                 books: ["Harry Potter","The Hobbit"]
    //             },
    //             {
    //                 language: "French",
    //                 books: ["Harry Potter"]
    //             }
    //         ]
    //     },
    //     {
    //         origin_language: "Spanish",
    //         targets: [
    //             {
    //                 language: "English",
    //                 books: ["Harry Potter"]
    //             }
    //         ]
    //     }
    // ]


    var native_language: { targets: any; origin_language?: string; } | null = null
    var learning_language: { books: [string], language:string } | null = null



    if (inventory.length == 1){
        pick_native(0)
    }
    

    function pick_native(index:number){
        native_language = inventory[index]
        if (native_language.targets.length == 1){
            pick_learning(0)
        }
    }
    function pick_learning(index:number){
        learning_language = native_language!.targets[index]
        if (learning_language!.books.length == 1){
            pick_title(0)
        }
    }

    function pick_title(index:number){

        const book = learning_language!.books[index]
        callback(native_language!.origin_language!,learning_language!.language,book)
    }

</script>


{inventory}


<div id="backdrop" class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
    <div id="book_picker" class="bg-gray-700 rounded-xl p-8">

        {#if native_language == null}
            
            <h2 class="text-3xl text-center text-gray-200 mb-6">Whats your native language?</h2>
            <div class="flex justify-center">

                {#each inventory as item,i}
                    <button class="px-4 py-2 bg-blue-500 text-white rounded-md m-2" on:click={()=>pick_native(i)}>{item.origin_language}</button>
                {/each}
            </div>
        {:else if learning_language == null}
            <h2 class="text-3xl text-center text-gray-200 mb-6">What do you want to learn?</h2>
            <div class="flex justify-center">

                {#each native_language.targets as item,i}
                    <button class="px-4 py-2 bg-blue-500 text-white rounded-md m-2" on:click={()=>pick_learning(i)}>{item.language}</button>
                {/each}
            </div>
        {:else}
            <h2 class="text-3xl text-center text-gray-200 mb-6">Pick a book</h2>
            <div class="flex justify-center">

                {#each learning_language.books as book,i}
                    <button class="px-4 py-2 bg-blue-500 text-white rounded-md m-2" on:click={()=>pick_title(i)}>{book}</button>
                {/each}
            </div>
        {/if}

    </div>
</div>
