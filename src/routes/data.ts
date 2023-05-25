

export class Book {

  public sentences: string[];
  public title: string;

  constructor(){
    this.sentences = [""]
    this.title = "";
  }

  public build(title:string,sentences:string[]){
    this.sentences = sentences;
    this.title = title;
  }

}

export var book:Book = new Book();

export async function data_setup(){

    const url = window.location + "/booklist.json";

    return new Promise<void>((resolve, reject) => {
    
      fetch(url).then((resp) => {
        resp.json().then(async (data) => {
          await choose_book(data[0]);
          resolve()
        });
      });
    });
}

export async function choose_book(title:string){

  const url = window.location + "/books/" + title + ".json";

  let resp = await fetch(url)
  let data = await resp.json()

  book.build(title,data);

} 
