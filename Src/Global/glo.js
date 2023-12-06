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

if (document.querySelector('header > ul > li#account')) {
    if (localStorage.getItem("Account")) {
        let instance = document.querySelector('header > ul > li#account');
        let string = data.email;
        let emailName = string.split("@");
        let getEmail = emailName[0];
        
        if (getEmail.length > 12) {
            emailName = getEmail.substring(0, 12) + "...";
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
};
if (document.querySelector('header > div#right > ul > li[title="Log in"]')) {
    if (localStorage.getItem("Account") != undefined) {
        if (data.covaDictionaryLogedin == true) {
            let instance = document.querySelector('header > div#right > ul > li[title="Log in"]');
            let string = data.email;
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
        }
    };
};

window.addEventListener("scroll", scrolling)

scrolling()