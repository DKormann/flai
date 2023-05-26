export type Translation = { translation: string; original: string };
export type Sentence = (string | Translation)[];
export type Book = { title: string; sentences: Sentence[] };
export type Vocabs = Map<string, string>;

export async function load_and_translate_first_book(
  from_lang: string,
  to_lang: string
): Promise<Book> {
  const book = await load_first_book();
  await translate_book(book, from_lang, to_lang);

  return book;
}

/**
 * translates book from one language to another
 * first loads the vocabs from language to another language
 * then goes through every sentence of the book and replaces all used vocabs
 * every sentence another words is added to the used vocabs
 *
 * @param book {Book}
 * @param from_lang {string}
 * @param to_lang {string}
 * @returns
 */
async function translate_book(book: Book, from_lang: string, to_lang: string) {
  let vocabs = await load_vocabs(from_lang, to_lang);
  let used_vocabs: Vocabs = new Map([]);
  for (let i = 0; i < book.sentences.length; i++) {
    let new_vocab = find_new_vocab_in_sentence(
      used_vocabs,
      book.sentences[i],
      vocabs
    );
    if (new_vocab) {
      used_vocabs.set(new_vocab, vocabs.get(new_vocab) as string);
    }
    // replace all occurences of already used vocabs
    for (let [key, value] of used_vocabs) {
      let translation: Translation = {
        translation: value,
        original: key,
      };
      book.sentences[i] = replace_vocab_in_sentence(
        book.sentences[i],
        translation
      );
    }
  }
  console.log(book);
  return book;
}

/**
 * returns a map of vocabs from language to another language
 *
 * @param from {string}
 * @param to {string}
 * @returns {Vocabs}
 */
async function load_vocabs(from: string, to: string): Promise<Vocabs> {
  let vocabs: Vocabs = new Map([]);
  let from_lang = await load_language(from);
  let to_lang = await load_language(to);

  for (let i = 0; i < from_lang.length; i++) {
    vocabs.set(from_lang[i].toLowerCase(), to_lang[i].toLowerCase());
  }
  return vocabs;
}

/**
 * finds and returns first unused vocab in sentence
 *
 * @param used_vocabs {Vocabs}
 * @param sentence {Sentence}
 * @param vocabs {Vocabs}
 * @returns {string | null}
 */
function find_new_vocab_in_sentence(
  used_vocabs: Vocabs,
  sentence: Sentence,
  vocabs: Vocabs
): string | null {
  for (let [key, value] of vocabs) {
    if (used_vocabs.has(key)) continue;

    for (let sentence_part of sentence) {
      let regex = new RegExp("\\b" + key + "\\b", "i");

      if (typeof sentence_part === "string" && sentence_part.match(regex))
        return key;
    }
  }
  return null;
}

/**
 * replace all occurences of original vocab with translation in sentence
 *
 * @param sentence {Sentence}
 * @param translation {Translation}
 * @returns {Sentence}
 */
function replace_vocab_in_sentence(
  sentence: Sentence,
  translation: Translation
): Sentence {
  let new_sentence: Sentence = [];
  for (let sentence_part of sentence) {
    let regex = new RegExp("\\b" + translation.original + "\\b", "gi");

    if (typeof sentence_part !== "string" || !sentence_part.match(regex)) {
      new_sentence.push(sentence_part);
      continue;
    }

    // replace original with translation
    let parts = sentence_part.split(regex);
    for (let part of parts) {
      if (part != "") new_sentence.push(part);
      new_sentence.push(translation);
    }
    new_sentence.pop();
  }
  return new_sentence;
}

/*
 * LOADING STUFF FROM JSON FILES
 */

/**
 * loads first book from booklist
 *
 * @returns {Book}
 */
async function load_first_book(): Promise<Book> {
  const data = await load_booklist();
  const book = await load_book(data[0]);

  return book;
}

/**
 * loads booklist from json file
 *
 * @returns {string[]}
 */
async function load_booklist(): Promise<string[]> {
  const url = "/booklist.json";

  const response = await fetch(url);
  const data = await response.json();

  return data;
}

/**
 * loads book from json file
 *
 * @param title {string}
 * @returns {Book}
 */
async function load_book(title: string): Promise<Book> {
  const url = "/books/" + title + ".json";

  let resp = await fetch(url);
  let data = await resp.json();

  let book: Book = {
    title: title,
    sentences: data.map((v: string) => [v]),
  };
  return book;
}

/**
 * load language from json file
 *
 * @param lang {string}
 * @returns {string[]}
 */
async function load_language(lang: string): Promise<string[]> {
  const url = `/langs/${lang}.json`;

  const response = await fetch(url);
  const data = await response.json();
  return data;
}
