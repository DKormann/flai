

var book = {
  title: "",
  sentences: [],
}

export async function data_setup(){

    const url = window.location + "/booklist.json";

    return new Promise<{title:string, sentences:string[]}>((resolve, reject) => {
    
      fetch(url).then((resp) => {
        resp.json().then(async (data) => {
          await choose_book(data[0]);
          resolve(book)
        });
      });
    });
}

export async function choose_book(title:string){

  const url = window.location + "/books/" + title + ".json";

  let resp = await fetch(url)
  let data = await resp.json()

  book.title = title
  book.sentences = data

} 
