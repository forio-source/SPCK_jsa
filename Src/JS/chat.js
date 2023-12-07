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

async function chat(text) {
    if (text != "") {
        let area = document.getElementById("chatArea");

        let p = document.createElement("p");
        p.classList.add("user", "active");
        p.innerText = text;
        area.appendChild(p);

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
        const result = await response.text();
        const completed = JSON.parse(result);
        
        let responseP = document.createElement("p");
        responseP.classList.add("response", "active");
        responseP.innerText = completed.response;
        area.appendChild(responseP)
    }
}

send.addEventListener("click", () => {
    chat(input.value)
})