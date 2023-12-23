const search = document.getElementById("findInput");
const save = document.getElementById("save");
const text = document.getElementById("word");
const meaning = document.getElementById("meaning");

async function dictionary(word) {
    if (word != "") {
        text.innerText = "Getting data";

        const options = {
    		method: 'GET',
	    	headers: {
		    	'X-RapidAPI-Key': '51adffd33cmsh6ff182208e964d0p1daa72jsn5c703584e8a7',
			    'X-RapidAPI-Host': 'dictionary-by-api-ninjas.p.rapidapi.com',
    		},
	    };
    
    	//try {
            const response = await fetch("https://dictionary-by-api-ninjas.p.rapidapi.com/v1/dictionary?word=" + word, options);
            const result = await response.json();
            
            if (result.definition != "") {
                meaning.innerText = result.definition;
            } else {
                meaning.innerText = "No definition found";
            }
            
            text.innerText = result.word;
            
            save.style = "display: block";
            document.querySelector("div#main").style.display = "block";
            document.querySelector("div#banner > div").style.paddingBottom = "10px";

        if (localStorage.getItem("Saved") != undefined) {
            if (JSON.parse(localStorage.getItem("Saved")).some(item => item == document.getElementById("word").innerText)) {
                save.style = "color: white; background-color: var(--main-color); display: block"
            }
        }

        //} catch (error) {
        //    console.error(error);
        //};
    } else {
        text.innerText = "Start to search!";
        meaning.innerText = "";
        save.style = "display: none";
        document.querySelector("div#main").style.display = "none";
        document.querySelector("div#banner > div").style.paddingBottom = null;
    }
};

search.addEventListener("change", () => {
    dictionary(search.value)
})

//--------------------------------------------------------------------------------


save.addEventListener("click", function() {
    if (localStorage.getItem("Email") != undefined) {
        if (localStorage.getItem("Saved") == undefined) {
            let saveTable = []
            localStorage.setItem("Saved", JSON.stringify(saveTable))
        }

        let localText = document.getElementById("word");

        if (JSON.parse(localStorage.getItem("Saved")).some(item => item == document.getElementById("word").innerText)) {
        } else {
            let savedTable = JSON.parse(localStorage.getItem("Saved"));

            savedTable.push(text.innerText);

            let readyTable = JSON.stringify(savedTable);
            localStorage.setItem("Saved", readyTable);

            save.style = "color: white; background-color: var(--main-color); display: block"
        };
    } else {
        if (confirm("You cannot save when you don't have any account. Wanna create an account?")) {
            location = "/Src/Pages/CovaDictionary/login-signup.html"
        };
    };
});