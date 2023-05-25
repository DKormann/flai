
export type Translation = { translation: string, original: string };

var known_vocabs: Map<string, string> = new Map([
    ["number", "numéro"],
    ["very much", "beaucoup"],
    ["expect", "attendre"],
    ["mysterious", "mystérieux"],
    ["director", "réalisateur"],
]);

export function insertTranslations (txt: string): (string | Translation)[] {
    
    var res: (string | Translation)[] = [txt];

    known_vocabs.forEach((translation, original) => {
      var new_res: (string | Translation)[] = [];

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