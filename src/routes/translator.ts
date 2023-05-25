
export type Translation = { translation: string, original: string };

type Vocab = { original: string, translation: string, known: boolean };

var learning_vocabs: Map<string, Vocab[]> = new Map([
    ["number", [{ original: "number", translation: "numéro", known: false }]],
    ["very much", [{ original: "very much", translation: "beaucoup", known: false }]],
    ["expect", [{ original: "expect", translation: "attendre", known: false }]],
    ["mysterious", [{ original: "mysterious", translation: "mystérieux", known: false }]],
    ["director", [{ original: "director", translation: "réalisateur", known: false }]],
])

export function insertTranslations (txt: string): (string | Translation)[] {
    
    var res: (string | Translation)[] = [txt];

    learning_vocabs.forEach( (vocabs,original) => {

        var new_res: (string | Translation)[] = [];
        res.forEach((part) => {
            if (typeof part == "string" && part.includes(original)) {
                var splits = part.split(original);
                new_res.push(splits[0]);
                var translation = vocabs[0].translation;
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

export function feedback (translation:string, original:string, known:boolean) {

    learning_vocabs.get(original)?.forEach((voc) => {
        if (voc.translation == translation) {
            voc.known = known;
        }
    });
}