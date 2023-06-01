import { browser } from "$app/environment"


var set_up = false

var vocab_status = new Map<string,string>()

if(browser){

    const status = localStorage.getItem("vocab_status")
    if (status){
        vocab_status = new Map(JSON.parse(status))
    }
}

export class Challenge{
    public vocabs:Set<[string,string]>
    constructor(public data:(string|[string,string])[]){
        this.data = data
        this.vocabs = new Set<[string,string]> (data.filter(item=>typeof item !== "string")as [string,string][])
    }
    
    fail(vocab:[string,string]){

        if (!vocab_status.has(JSON.stringify(vocab))){
            console.error("You failed a vocab you haven't seen yet", vocab);
        }
    }

    finish(){
        this.vocabs.forEach(vocab=>{
            // vocab_status.set(JSON.stringify(vocab),"known")
            set_known(JSON.stringify(vocab),"known")
        })
    }
}

const challenge_interval = 20

export function create_challenge(data:(string|[string,string])[]){

    var challenge_level = Math.floor(Math.random()*3)

    data = data.map(item=>{
        if (typeof item === "string"){
            return item
        }else{
            const [native, target] = item
            if (vocab_status.get(JSON.stringify([native,target]))==="known"){
                return [native, target]
            }else{
                if (challenge_level > 0){
                    challenge_level -= 1
                    return target
                }else{

                    challenge_level = challenge_interval
                    // seen.add(JSON.stringify([native,target]))

                    set_known(JSON.stringify([native,target]),"seen")

                    return [native, target]
                }
            }
        }
    })
    
    return new Challenge(data)
}

function set_known (key:string, value:string){
    vocab_status.set(key,value)
    localStorage.setItem("vocab_status",JSON.stringify([...vocab_status]))
}

export function clear(){
    vocab_status.clear()
    delete localStorage["vocab_status"]
}

