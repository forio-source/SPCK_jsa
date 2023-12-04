const input = document.getElementById("input");
const output = document.getElementById("output");
const from = document.getElementById("from");
const to = document.getElementById("to");

if (localStorage.getItem("Email") != undefined) {
    let instance = document.querySelector('header > div#right > ul > li[title="Log in"]');
    let string = localStorage.getItem("Email");
    let emailName = string.split("@");
    let getEmail = emailName[0];

    if (getEmail.length > 8) {
        emailName = getEmail.substring(0, 8) + "...";
    }
    else {
        emailName = getEmail
    }

    instance.setAttribute("onclick", "golink('/Src/Pages/account.html')")
    instance.style = "aspect-ratio: unset; padding: 5px 15px";
    instance.setAttribute("title", string);
    instance.querySelector("h6").innerText = emailName;
    instance.querySelector("h6").style.display = "initial";

    instance.querySelector("i").classList.remove("fa-arrow-right-to-bracket");
    instance.querySelector("i").classList.add("fa-circle-user");
};

async function translate(word) {
    if (word != "") {

        if (from.value == to.value) {
            output.innerText = "Error";
        }
        else {
            output.innerText = "Translating..."

            const options = {
                method: 'GET',
                headers: {
	            	'X-RapidAPI-Key': '51adffd33cmsh6ff182208e964d0p1daa72jsn5c703584e8a7',
		            'X-RapidAPI-Host': 'translated-mymemory---translation-memory.p.rapidapi.com'
	            }
            };
            
            const response = await fetch(`https://translated-mymemory---translation-memory.p.rapidapi.com/get?langpair=${from.value}%7C${to.value}&q=${word}&mt=1&onlyprivate=0&de=a%40b.c`, options);
            const result = await response.json();
            console.log(result)
            output.innerText = result.responseData.translatedText;
        }
    }
    else {
        output.innerText = "Output"
    }
}

input.addEventListener("change", () => {
    translate(input.value)
})
from.addEventListener("change", () => {
    translate(input.value)
})
to.addEventListener("change", () => {
    translate(input.value)
})