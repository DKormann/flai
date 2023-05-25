

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
    console.log("url", url);

    return new Promise<void>((resolve, reject) => {
    
      fetch(url).then((resp) => {
        resp.json().then(async (data) => {
          console.log("booklist.json", data);
          await choose_book(data[0]);
          console.log("resolving.");
          
          resolve()
        });
      });
    });
}

export async function choose_book(title:string){

  console.log("choose_book", title);
  
  const url = window.location + "/books/" + title + ".json";
  console.log("url", url);

  let resp = await fetch(url)
  let data = await resp.json()


  console.log("book.json", data);
  console.log("title", title);

  book.build(title,data);

} 
