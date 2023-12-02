const input = document.getElementById("input");
const output = document.getElementById("output");

async function translate(word) {
    if (word != "") {
        const options = {
            method: 'POST',
            headers: {
	        	'content-type': 'application/x-www-form-urlencoded',
	        	'Accept-Encoding': 'application/gzip',
	        	'X-RapidAPI-Key': '51adffd33cmsh6ff182208e964d0p1daa72jsn5c703584e8a7',
	        	'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
	        },
	        body: new URLSearchParams({
	        	q: word,
	        	target: 'vi',
	        	source: 'en'
	        })
        };

        const response = await fetch("https://google-translate1.p.rapidapi.com/language/translate/v2", options);
        const result = await response.json();
        
        output.innerText = result.data.translations[0].translatedText
    }
}

input.addEventListener("change", () => {
    translate(input.value)
})