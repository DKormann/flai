<script lang="ts">

    import { onMount } from "svelte";


    import { data_setup, load_book, type Inventory, type BookData, type Book } from "./data_connector"
    import BookPicker from "./book_picker.svelte";
    import Educator from "./educator.svelte";

    let book: Book | null = null

    let inventory :Inventory
    let show_inventory = false

        onMount(async () => {

            data_setup().then((data) => {

                inventory = data

                const saved_pref = localStorage.getItem("preferences")
                if (saved_pref != null){
                    preferences = JSON.parse(saved_pref)
                    load_book(preferences.native_language,preferences.learning_language,preferences.title).then(b=>book = b)

                }else{
                    show_inventory = true
                }
            })
        });

    let preferences = {
        native_language: "",
        learning_language: "",
        title: "",
        page:1,
    }

    function pick_book(){
        show_inventory = true
    }

    function settopic(native:string, learning:string, title:string){
    
        show_inventory = false
        preferences = {
            native_language: native,
            learning_language: learning,
            title: title,
            page:1,
        }

        localStorage.setItem("preferences", JSON.stringify(preferences))
        book = null

        load_book(native,learning,title).then(b=>book = b)
      
    }

    function set_page(page:number){
        preferences.page = page
        localStorage.setItem("preferences", JSON.stringify(preferences))
    }
</script>


<button on:click={pick_book} class=" m-2 bg-grey200 fixed hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
  Preferences
</button>

{#if book != null && preferences.page != undefined}
	<Educator book = {book} change_book = {pick_book} index = {preferences.page} set_page={set_page} ></Educator>
{/if}

{#if show_inventory}
	<BookPicker inventory = {inventory} callback = {settopic} abort={()=>{show_inventory = preferences.title==""}}></BookPicker>
{/if}

<dialog id="myDialog">
    <h2>Dialog Box</h2>
    <p>This is a sample dialog box.</p>
    <button>Close</button>
  </dialog>
