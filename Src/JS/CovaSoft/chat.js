const area = document.getElementById("chatArea");
const input = document.getElementById("input");
const send = document.getElementById("send");
const optionsSelect = document.getElementById("options");
const account = JSON.parse(localStorage.getItem("Account"));
const errorOutput = document.getElementById("error");
const sound = document.querySelector("div#voiceMenu > button");
const voices = document.getElementById("voice");
const audio = new Audio();
let errorStyle = "transform: translateY(5px); opacity: 0;";
let firstRes = null;
errorOutput.style = errorStyle;

const voiceList = {
    ["male-john"]: {
        id: 2014,
        voice_id: "en-US-Neural2-A",
        gender: "Male",
        language_code: "en-US",
        language_name: "US English",
        voice_name: "John",
        sample_audio_url: "https://s3.ap-south-1.amazonaws.com/invideo-uploads-ap-south-1/speechen-US-Neural2-A16831901130600.mp3",
        status: 2,
        rank: 0,
        type: "google_tts",
    },
    ["male-nathan"]: {
        id: 2016,
        voice_id: "en-US-Neural2-D",
        gender: "Male",
        language_code: "en-US",
        language_name: "US English",
        voice_name: "Nathan",
        sample_audio_url: "https://s3.ap-south-1.amazonaws.com/invideo-uploads-ap-south-1/speechen-US-Neural2-D16831901132850.mp3",
        status: 2,
        rank: 0,
        type: "google_tts",
    },
    ["male-maxwell"]: {
        id: 2021,
        voice_id: "en-US-Neural2-I",
        gender: "Male",
        language_code: "en-US",
        language_name: "US English",
        voice_name: "Maxwell",
        sample_audio_url: "https://s3.ap-south-1.amazonaws.com/invideo-uploads-ap-south-1/speechen-US-Neural2-I16831901125770.mp3",
        status: 2,
        rank: 0,
        type: "google_tts",
    },
    ["male-jack"]: {
        id: 2022,
        voice_id: "en-US-Neural2-J",
        gender: "Male",
        language_code: "en-US",
        language_name: "US English",
        voice_name: "Jack",
        sample_audio_url: "https://s3.ap-south-1.amazonaws.com/invideo-uploads-ap-south-1/speechen-US-Neural2-J16831901133170.mp3",
        status: 2,
        rank: 0,
        type: "google_tts",
    },
    ["female-ava"]: {
        id: 2018,
        voice_id: "en-US-Neural2-F",
        gender: "Female",
        language_code: "en-US",
        language_name: "US English",
        voice_name: "Ava",
        sample_audio_url: "https://s3.ap-south-1.amazonaws.com/invideo-uploads-ap-south-1/speechen-US-Neural2-F16831901133880.mp3",
        status: 2,
        rank: 0,
        type: "google_tts",
    },
    ["female-avery"]: {
        id: 2019,
        voice_id: "en-US-Neural2-G",
        gender: "Female",
        language_code: "en-US",
        language_name: "US English",
        voice_name: "Nathan",
        sample_audio_url: "https://s3.ap-south-1.amazonaws.com/invideo-uploads-ap-south-1/speechen-US-Neural2-G16831901126130.mp3",
        status: 2,
        rank: 0,
        type: "google_tts",
    },
    ["female-brooklyn"]: {
        id: 2020,
        voice_id: "en-US-Neural2-H",
        gender: "Female",
        language_code: "en-US",
        language_name: "US English",
        voice_name: "Brooklyn",
        sample_audio_url: "https://s3.ap-south-1.amazonaws.com/invideo-uploads-ap-south-1/speechen-US-Neural2-H16831901133250.mp3",
        status: 2,
        rank: 0,
        type: "google_tts",
    },
    ["female-madison"]: {
        id: 2017,
        voice_id: "en-US-Neural2-E",
        gender: "Female",
        language_code: "en-US",
        language_name: "US English",
        voice_name: "Madison",
        sample_audio_url: "https://s3.ap-south-1.amazonaws.com/invideo-uploads-ap-south-1/speechen-US-Neural2-E16831901145460.mp3",
        status: 2,
        rank: 0,
        type: "google_tts",
    },
    ["female-sophie"]: {
        id: 2015,
        voice_id: "en-US-Neural2-C",
        gender: "Female",
        language_code: "en-US",
        language_name: "US English",
        voice_name: "Sophie",
        sample_audio_url: "https://s3.ap-south-1.amazonaws.com/invideo-uploads-ap-south-1/speechen-US-Neural2-C16831901133570.mp3",
        status: 2,
        rank: 0,
        type: "google_tts",
    }
};

if (account) {
    let instance = document.querySelector('header > ul > li#account');
    instance.setAttribute("onclick", "golink('/Src/Pages/account.html')");
    instance.style = "aspect-ratio: unset; padding: 5px 15px";
    
    document.querySelector("body").style.overflow = "hidden";
    document.getElementById("introduce").style.display = "none";
}
else {
    document.getElementById("main").style.display = "none";
};

if (localStorage.getItem("Altis AI voice") != undefined && localStorage.getItem("Altis AI voice") != "") {
    voices.querySelector(`option[value="${localStorage.getItem("Altis AI voice")}"]`).setAttribute("selected", "");
    sound.id = "";
    sound.innerHTML = '<i class="fa-solid fa-volume-high active"></i>';
}

function delay(s) {
    return new Promise(resolve => setTimeout(resolve, s * 1000 || DEF_DELAY));
}
function scrollStick() {
    const copies = area.getElementsByClassName("copy");

    for (let i = 0; i < copies.length; i++) {
        let elementTop = copies[i].parentNode.getBoundingClientRect().top;
        let elementBottom = copies[i].parentNode.getBoundingClientRect().bottom;

        if (elementTop - 139 <= 0) {
            copies[i].style = "position: absolute; z-index: 2; left 10px;"

            if (elementTop - 90 >= 0) {
                copies[i].style.top = `-${elementTop - 90}px`
            }
            else {
                copies[i].style.top = `${Math.abs(elementTop - 90)}px`
            };
        } else {
            copies[i].style = "";
        };
        if (elementBottom <= 0) {
            copies[i].style = "";
        };
    };
};
function close() {
    let box = sound.parentNode.querySelector("div");

    if (box.id == "active") {
        box.id = null;
    }
    else {
        box.id = "active";
    };
};
async function voiceChange() {
    let currentVoice = voices.value;

    if (voices.value != "") {
        audio.src = voiceList[currentVoice].sample_audio_url;
        audio.play();
        sound.id = "";
        sound.innerHTML = '<i class="fa-solid fa-volume-high active"></i>';
        localStorage.setItem("Altis AI voice", voices.value);
    }
    else {
        sound.id = "off";
        sound.innerHTML = '<i class="fa-solid fa-volume-xmark active"></i>';
        localStorage.setItem("Altis AI voice", "");
    };
    
    await delay(.5);
    close()
}

async function chat(text) {
    function check() {
        return /^\s*$/.test(text);
    };

    if (text != "" && check() == false) {
    let voice = voices.value
        let sendText = send.innerText;
        let area = document.getElementById("chatArea");
        let p = document.createElement("p");
        let span1 = document.createElement("span");
        let span2 = document.createElement("span");
        let span3 = document.createElement("span");
        let responseP = document.createElement("p");
        let load = document.createElement("i");
        let copy = document.createElement("button");
        copy.classList.add("copy", "active");
        copy.innerHTML = "<i class='fa-solid fa-clone active'></i> Sao chép";
        responseP.classList.add("response", "chat", "active");
        span1.classList.add("load", "active");
        span2.classList.add("load", "active");
        span3.classList.add("load", "active");
        load.classList.add("fa-solid", "fa-circle-notch", "active");
        p.classList.add("user", "chat", "active");
        p.innerText = text;

        input.setAttribute("disabled", "");
        send.innerText = "";
        send.style.padding = "10px 15px";
        send.appendChild(load);
        await delay(1);
        send.removeChild(load);
        send.style = "width: 0; padding: 10px";

        await delay(.25);

        area.appendChild(p);
        p.style = "transform: translateY(30px); opacity: 0";
        area.scrollTo(0, area.scrollHeight);
        await delay(.1)
        p.style = "transform: translateY(0); opacity: 1";
        input.value = "";
        send.style = "";
        send.innerText = sendText;
        
        await delay(2);
        
        responseP.append(span1, span2, span3);
        area.appendChild(responseP);
        responseP.style = "transform: translateY(30px); opacity: 0";
        area.scrollTo(0, area.scrollHeight);

        await delay(.1)
        responseP.style = "transform: translateY(0); opacity: 1";

        const body = {
            query: text
        }
        if (firstRes) {
            body.conversationId = firstRes
        };
        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'X-RapidAPI-Key': 'ee3df62a5cmsh30d3dd2e4b854edp105309jsnd4d19a08227e',
                'X-RapidAPI-Host': 'open-ai25.p.rapidapi.com'
            },
            body: JSON.stringify(body)
        };
        
        const response = await fetch("https://open-ai25.p.rapidapi.com/ask", options);
        const result = JSON.parse(await response.text());

        firstRes = result.conversationId;

        if (voice != "") {
            const bodyData = {
                voice_obj: voiceList[voice],
                json_data: [
                    {
                        block_index: 0,
                        text: result.response
                    }
                ]
            }
            const config = {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'X-RapidAPI-Key': '51adffd33cmsh6ff182208e964d0p1daa72jsn5c703584e8a7',
                    'X-RapidAPI-Host': 'realistic-text-to-speech.p.rapidapi.com'
                },
                body: JSON.stringify(bodyData)
            };
            
            const receive = await fetch("https://realistic-text-to-speech.p.rapidapi.com/v3/generate_voice_over_v2", config);
            const output = JSON.parse(await receive.text());

            audio.src = output[0].link;
            audio.play();
        }

        async function printText(text) {
            let deleteText = ["AI: ", "[object Promise]"];

            if (deleteText.some(i => text.includes(i))) {
                let resultText = text.split(deleteText[0]);
                text = resultText[1];
            };

            let textList = text.split("");

            await delay(.5)
            for (let a = 0; a < textList.length; a++) {
                if (deleteText.some(i => responseP.innerText.includes(i))) {
                    let resultText = responseP.innerText.split(deleteText[1]);
                    responseP.innerText = resultText[1];
                };
                
                if (textList[a] == ".") {
                    await delay(.1);
                }
                else if (textList[a] == ",") {
                    await delay(.075);
                }
                else {
                    await delay(.04);
                }

                if (textList[a] == " ") {
                    responseP.innerText += "\u200C \u200C";
                }
                else {
                    responseP.innerText += textList[a];
                };

                area.scrollTo(0, area.scrollHeight);
            };

            responseP.appendChild(copy);
            await delay(.1)
            copy.addEventListener("click", async () => {
                copy.innerHTML = ""
                let text = copy.parentNode.innerText;
                navigator.clipboard.writeText(text);
                copy.innerHTML = "<i class='fa-solid fa-clone active'></i> Đã sao chép"
                await delay(3)
                copy.innerHTML = "<i class='fa-solid fa-clone active'></i> Sao chép"
            })

            input.removeAttribute("disabled");
        };

        await delay(.5);
        responseP.innerText = printText(result.response);
    }
    else {
        if (errorOutput.innerText != "Hãy ghi một cái gì đó trước khi gửi") {
            errorOutput.innerText = "Hãy ghi một cái gì đó trước khi gửi";
            await delay(.1);
            errorOutput.style = "";
            await delay(3);
            errorOutput.style = errorStyle;
            await delay(.2);
            errorOutput.innerText = "";
        };
    };
};

send.addEventListener("click", () => {
    chat(input.value);
});
input.addEventListener("keypress", (event) => {
    if (!event.shiftKey && event.key == "Enter") {
        event.preventDefault();
        chat(input.value);
    }
});

sound.addEventListener("click", close)
area.addEventListener("scroll", scrollStick);