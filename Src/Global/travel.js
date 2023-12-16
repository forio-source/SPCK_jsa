const userData = JSON.parse(localStorage.getItem("Account"));

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

let music = document.createElement("audio");
music.setAttribute("src", "/Assets/Music/bg-music.mp3");

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("body").appendChild(music);
    music.style.display = "none";
    music.autoplay = true;
    music.loop = true;
    music.play();
})