const input = document.getElementById("input");
const send = document.getElementById("send");
const optionsSelect = document.getElementById("options");

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

async function chat(text) {
    if (text != "") {
        let area = document.getElementById("chatArea");

        let p = document.createElement("p");
        p.classList.add("user", "active");
        p.innerText = text;
        area.appendChild(p);

        const body = {
	    	model: 'gpt-3.5-turbo',
	    	messages: [
	    		{
	    			role: 'user',
	    			content: text,
	    		}
	    	]
	    }
        const options = {
            method: 'POST',
	        headers: {
	        	'content-type': 'application/json',
	        	'Content-Type': 'application/json',
	        	'X-RapidAPI-Key': '51adffd33cmsh6ff182208e964d0p1daa72jsn5c703584e8a7',
	        	'X-RapidAPI-Host': 'chat-gpt26.p.rapidapi.com'
	        },
	        body: JSON.stringify(body),
        };
        
        const response = await fetch("https://chat-gpt26.p.rapidapi.com/", options);
        const result = await response;
        console.log(result);
        
        //let responseP = document.createElement("p");
        //responseP.classList.add("response", "active");
        //responseP.innerText = ;
    }
}

send.addEventListener("click", () => {
    chat(input.value)
})