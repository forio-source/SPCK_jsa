const userData = JSON.parse(localStorage.getItem("Account"));
const music = new Audio("/Assets/Music/bg-music.mp3");
music.volume = 0.15;
music.loop = true;

if (userData != undefined) {
    document.getElementById("loginBlock").remove();
}
else {
    document.getElementById("loginBlock").style.transform = "translateY(0)";
    document.querySelector("body").style.overflow = "hidden";
};

function delay(s) {
    return new Promise(resolve => setTimeout(resolve, s * 1000 || DEF_DELAY));
}

async function playAudio() {
    await delay(1)
    
    
    music.play();
};

playAudio();