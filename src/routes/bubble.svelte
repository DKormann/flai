<script lang='ts'>

    export var data:{translation:string, original:string}

    var opened = false

    function toggle(){
        console.log("toggle");
        
        opened = !opened
    }

</script>

<button class="text-primary" on:click={toggle} >
    
    {data.translation}

    {#if opened}
        <span class="bg-primary text-white rounded-xl">&nbsp;{data.original}&nbsp;</span>
    {/if}

</button>