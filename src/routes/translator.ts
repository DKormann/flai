import { gpt_request } from "./gpt_request";

export type Translation = { translation: string, original: string };

type Vocab = { original: string, translation: string, known: boolean };

var learning_vocabs: Map<string, Vocab[]> = new Map([])

const language = "french";
const book_title = "Harry Potter and the Philosopher's Stone";

export async function insertTranslations (txt: string): Promise<(string | Translation)[]> {

    if(cache.has(txt)) {
        
        return cache.get(txt)!
    }


    let proposed_translations = await generate_translations(txt)

    let known_translations = proposed_translations.filter((t:Translation) => {
        return learning_vocabs.has(t.original) && learning_vocabs.get(t.original)!.some((v:Vocab) => v.translation == t.translation && v.known)
    })

    let unknown_translations = proposed_translations.filter((t:Translation) => !known_translations.includes(t))
    let new_translation= unknown_translations[0]
    let translations = known_translations.concat(new_translation)

    // add new_translation to learning_vocabs
    if (learning_vocabs.has(new_translation.original)) {
        if (!learning_vocabs.get(new_translation.original)!.some((v:Vocab) => v.translation == new_translation.translation)) {
            learning_vocabs.get(new_translation.original)!.push({ original: new_translation.original, translation: new_translation.translation, known: false })
        }
    } else {
        learning_vocabs.set(new_translation.original, [{ original: new_translation.original, translation: new_translation.translation, known: false }])
    }

    feedback(new_translation.translation,new_translation.original,true)

    var res: (string | Translation)[] = [txt];
    translations.forEach( (t,i) => {

        var new_res: (string | Translation)[] = [];
        res.forEach((part) => {
            if (typeof part == "string" && part.includes(t.original)) {
                var splits = part.split(t.original);
                new_res.push(splits[0]);
                new_res.push(t);
                new_res.push(splits[1]);
            } else {
                new_res.push(part);
            }
        });
        res = new_res;
    });
    
    return res;
}

function generate_translations (txt:string){

    txt = txt.replaceAll("\n","")

    var seen_parts:string[] = [];
    learning_vocabs.forEach((vocabs,original) => {
        vocabs.forEach((voc) => {
            if (txt.includes(voc.original)) {
                seen_parts.push(voc.original);
            }
        });
    });
    
    var data_start = `[{"original":"${seen_parts[0]}`
    if (seen_parts.length == 0) data_start = `[{"original":"`
    
    var prompt = `Request: I am trying to learn ${language} by reading a ${book_title}.\n`;
    prompt += `Right now am reading this abstract: ${txt}.\n`;

    if (seen_parts.length == 0) prompt += `pick exactly one more word that makes sense to learn and translate in a way that makes sense in the context oof the abstract.\n`;
    else prompt += `translate the following words into french in a way that makes sense in the context of the given abstract: [${seen_parts.join(", ")}] and pick exactly one more word that makes sense to learn and translate it also.\n`;

    prompt += `put the translations in the following json format: [{"original":"apple","translation":"pomme"},{"original":"Hello","translation":"Bonjour"}]\n`;
    prompt += `\n`
    prompt += `Answer: `+data_start;

    return new Promise<Translation[]>((resolve, reject) => {

        var data_string = ""
        gpt_request(prompt).then((res) => {
            data_string = data_start + res
            var data  = JSON.parse(data_string) as Translation[];

            resolve(data);
        }).catch((err) => {
            console.log("got data string: ",data_string);
            console.error(err);

            reject(err)
        });
    });
}

var cache = new Map<string,Promise<(string|Translation)[]>>()

export function precache(txt:string){

    if (cache.has(txt)) return
    cache.set(txt,insertTranslations(txt))

}

export function feedback (translation:string, original:string, known:boolean) {

    try{
        let arr = learning_vocabs.get(original)!

        arr.forEach((voc) => {
            if (voc.translation == translation) {
                voc.known = known;
                return
            }else{
                console.log("voc:",voc.translation,translation);
            }
        });
    }catch(err){
        console.error(err);
    }
}