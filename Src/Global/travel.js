const userData = JSON.parse(localStorage.getItem("Account"));

if (userData != undefined) {
    document.getElementById("loginBlock").remove();
}
else {
    document.getElementById("loginBlock").style.transform = "translateY(0)";
    document.querySelector("body").style.overflow = "hidden";
};

document.addEventListener("DOMContentLoaded", () => {
    let music = document.createElement("audio");
    document.querySelector("body").appendChild(music);
    music.setAttribute("src", "/Assets/Music/bg-music.mp3");
    music.style.display = "none";
    music.volume = 0.25;
    music.autoplay = true;
    music.loop = true;
    music.play();
})