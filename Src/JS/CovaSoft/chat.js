const input = document.getElementById("input");
const send = document.getElementById("send");
const optionsSelect = document.getElementById("options");
const account = JSON.parse(localStorage.getItem("Account"));

if (account && account.usingPack == "Premium") {
    let instance = document.querySelector('header > ul > li#account');
    instance.setAttribute("onclick", "golink('/Src/Pages/account.html')");
    instance.style = "aspect-ratio: unset; padding: 5px 15px";
    
    document.querySelector("body").style.overflow = "hidden";
    document.getElementById("introduce").style.display = "none";
    document.querySelector("footer").style.display = "none";
}
else {
    document.getElementById("main").style.display = "none";
};

function delay(s) {
    return new Promise(resolve => setTimeout(resolve, s * 1000 || DEF_DELAY));
}

async function chat(text) {
    if (text != "") {
        send.style = "color: transparent; width: 0; padding: 10px;";
        await delay(.4);

        let area = document.getElementById("chatArea");

        let p = document.createElement("p");
        p.classList.add("user", "active");
        p.innerText = text;
        area.appendChild(p);
        p.style = "transform: translateY(30px); opacity: 0";
        await delay(0.1)
        p.style = "transform: translateY(0); opacity: 1";

        send.style = "";

        const body = {
            query: text
        }
        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'X-RapidAPI-Key': '51adffd33cmsh6ff182208e964d0p1daa72jsn5c703584e8a7',
                'X-RapidAPI-Host': 'open-ai25.p.rapidapi.com'
            },
            body: JSON.stringify(body)
        };
        
        const response = await fetch("https://open-ai25.p.rapidapi.com/ask", options);
        const result = JSON.parse(await response.text());

        let deteleText = ["AI: "]
        
        let responseP = document.createElement("p");
        responseP.classList.add("response", "active");

        if (deteleText.some(i => result.response.includes(i))) {
            let resultText = result.response.split(": ")
            responseP.innerText = resultText[1];
        }
        else {
            responseP.innerText = result.response;
        };
        
        area.appendChild(responseP);
        input.value = "";
        responseP.style = "transform: translateY(30px); opacity: 0";
        await delay(0.1)
        responseP.style = "transform: translateY(0); opacity: 1";
    }
}

send.addEventListener("click", () => {
    async () => {
        await delay(0.1);
        send.style = "color: transparent; width: 0; padding: 10px; transition: all .5s ease;";
        await delay(1);
        send.style = "";
    }
    chat(input.value)
})