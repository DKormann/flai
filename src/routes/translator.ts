

var set_up = false

var seen = new Set<string>()
var known = new Set<string>()


export class Challenge{
    public vocabs:Set<[string,string]>
    constructor(public data:(string|[string,string])[]){
        this.data = data
        this.vocabs = new Set<[string,string]> (data.filter(item=>typeof item !== "string")as [string,string][])
    }
    
    fail(vocab:[string,string]){

        if (!seen.has(JSON.stringify(vocab))){
            console.error("You failed a vocab you haven't seen yet", vocab);
            console.log("seen", seen);
            
        }
        seen.add(JSON.stringify(vocab))
        known.delete(JSON.stringify(vocab))
        this.vocabs.delete(vocab)
    }

    finish(){
        this.vocabs.forEach(vocab=>{
            known.add(JSON.stringify(vocab))
            seen.delete(JSON.stringify(vocab))
        })
    }
}

const challenge_interval = 20

export function create_challenge(data:(string|[string,string])[]){

    var challenge_level = Math.floor(Math.random()*3)
    console.log("create_challenge", data);
    

    data = data.map(item=>{
        if (typeof item === "string"){
            return item
        }else{
            const [native, target] = item
            if (known.has(JSON.stringify([native,target]))){
                console.log("known", native, target);
                
                return [native, target]
            }else{
                if (challenge_level > 0){
                    challenge_level -= 1
                    return target
                }else{

                    challenge_level = challenge_interval
                    seen.add(JSON.stringify([native,target]))
                    return [native, target]
                }
            }
        }
    })
    console.log(data);
    
    return new Challenge(data)
}

