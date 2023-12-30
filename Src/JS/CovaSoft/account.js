const menu = document.getElementById("menu");
const account = JSON.parse(localStorage.getItem("Account"));
const userContent = document.getElementById("userContent");

userContent.querySelector("h1").innerText = account.userName;
userContent.querySelector("p").innerText = account.email;
document.getElementById("img").style.backgroundImage = `url(${account.avatar})`;

function scroll() {
    let top = menu.getBoundingClientRect().top;

    if (top <= 80) {
        menu.classList.add("sticking");
    } else {
        menu.classList.remove("sticking");
    };
};

window.addEventListener("scroll", scroll);