const data = JSON.parse(localStorage.getItem("Account"));

function golink(link) {
    location = link;
}
function scrolling() {
    let elements = document.querySelectorAll("body *");

    for (let i = 0; i < elements.length; i++) {
        let windowHeight = window.innerHeight;
        let elementTop = elements[i].getBoundingClientRect().top;
        let elementVisible = 100;

        if (elementTop < windowHeight - elementVisible) {
            elements[i].classList.add("active");
        }
    }
}
function delay(s) {
    return new Promise(resolve => setTimeout(resolve, s * 1000));
}

if (document.querySelector('header > ul > li#account')) {
    let list = document.querySelector("header > ul");
    let items = list.querySelectorAll("li");
    let link = window.location.href;
    link = link.split("/");

    if (data) {
        let instance = document.querySelector('header > ul > li#account');
        
        instance.setAttribute("onclick", "golink('/Src/Pages/CovaSoft/account.html')")
        instance.style = "aspect-ratio: unset; padding: 5px 15px";
        instance.querySelector("h6").innerText = data.userName;
        instance.querySelector("h6").style.display = "initial";
        
        instance.querySelector("i").remove();
        let img = document.createElement("img");
        img.setAttribute("src", data.avatar);

        instance.appendChild(img)
    };

    for (let i = 0; i < items.length; i++) {
        if (link[6] == items[i].dataset.visible) {
            items[i].classList.add("currentPage");
        }
    }

    async function loadPage() {
        let body = document.querySelector("body");
        let div = document.createElement("div");
        let img = document.createElement("img");
        
        div.id = "loading";
        img.src = "/Assets/Icons/icon.png";
        body.style.overflow = "hidden"

        div.appendChild(img);
        body.appendChild(div);
        await delay(1.5);
        div.classList.add("true");

        await delay(Math.round((Math.random() / Math.random()) * 10) / 10);

        div.style.opacity = "0";
        body.style = "";
        await delay(.2);
        body.removeChild(div);
    }

    loadPage()
};
if (document.querySelector('header > div#right > ul > li[title="Log in"]')) {
    if (data) {
        if (data.covaDictionaryLoggedin == true) {
            let instance = document.querySelector('header > div#right > ul > li[title="Log in"]');
            
            instance.setAttribute("onclick", "golink('/Src/Pages/CovaDictionary/account.html')")
            instance.style = "aspect-ratio: unset; padding: 5px 15px";
            instance.querySelector("h6").innerText = data.userName;
            instance.querySelector("h6").style.display = "initial";
            
            instance.querySelector("i").classList.remove("fa-arrow-right-to-bracket");
            instance.querySelector("i").classList.add("fa-circle-user");
        }
    };
};

window.addEventListener("scroll", scrolling)

scrolling()