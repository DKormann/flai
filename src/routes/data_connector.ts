import type { lang } from "./ui_versions";

export type Inventory = {
    origin_language:lang,
    targets:{
        language:lang,
        books:string[]
    }[]
}[]

export async function data_setup():Promise<Inventory>{
    const url = "./index.json"

    console.log("Fetching data from", url);
    

    const response = await fetch(url)
    const data = await response.json() as Inventory

    return data
}


export type LineData = [(string|[string,string])[],(string|[string,string])[]]
export type BookData = LineData[]
export type Book = {title:string,switched:boolean,data:BookData}

export async function load_book(native:string, target:string, title:string):Promise<Book>{

    const url = `./books/${title}/${native}2${target}.json`
    const alt_url = `./books/${title}/${target}2${native}.json`

    var switched = false

    let data
    try{
        const response = await fetch(url)
        data = await response.json() as BookData
    }catch{
        const response = await fetch(alt_url)
        data = await response.json() as BookData
        switched = true
    }

    return {title, switched, data}
}
