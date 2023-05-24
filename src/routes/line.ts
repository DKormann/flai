

export function create_line(txt:string, translations: Map<string, string>):HTMLParagraphElement{

    for (const [key, value] of translations) {

        if (txt.includes(key)){
            const arg = `<span >${key}</span>`
            txt = txt.replaceAll(key, arg);
        } 
    }

    let p = document.createElement("p");
    p.innerHTML = txt;

    

    p.querySelectorAll("span").forEach((span) => {
        
        span.classList.add("translation");
        const content = span.innerHTML!;

        var open = function (e: Event){

            if (e.target != span) return;

            // document.querySelector(".speech-bubble")?.remove();

            console.log("open");

            span.classList.add("opened")
            
            const speechBubble = document.createElement('div');
            speechBubble.className = 'speech-bubble';
            speechBubble.innerText = content;
            span.appendChild(speechBubble);

            span.removeEventListener("click", open);
            span.addEventListener("click", close);

        }

        var close = function (e: Event){
            span.querySelector(".speech-bubble")?.remove();
            span.classList.remove("opened")
            span.removeEventListener("click", close);
            span.addEventListener("click", open);
        }

        span.addEventListener("click", open)

        span.innerHTML = translations.get(content)!;

    })
    
    return p;
}
