<script lang="ts">
  import { bubble, text } from "svelte/internal";
  import Bubble from "./bubble.svelte";

  /**
   * @type {string}
   */
  export var txt: string;

  /**
   * @type {Map<string, string>}
   */
  export var translations: Map<string, string>;

  type translation = { original: string; translation: string };

  function splitTranslations(txt: string): (string | translation)[] {
    var res: (string | translation)[] = [txt];

    translations.forEach((translation, original) => {
      var new_res: (string | translation)[] = [];

      res.forEach((part) => {
        if (typeof part == "string" && part.includes(original)) {
          var splits = part.split(original);
          new_res.push(splits[0]);
          new_res.push({ translation, original });
          new_res.push(splits[1]);
        } else {
          new_res.push(part);
        }
      });
      res = new_res;
    });

    return res;
  }

  const result = splitTranslations(txt);

  let openTooltipIndex = -1;

  let toggleTooltip = (index: number) => {
    openTooltipIndex = openTooltipIndex === index ? -1 : index;
  };
</script>

<p>
  {#each result as part, index}
    {#if typeof part == "string"}
      {part}
    {:else}
      <Bubble data={part} {index} {openTooltipIndex} {toggleTooltip} />
    {/if}
  {/each}
</p>
