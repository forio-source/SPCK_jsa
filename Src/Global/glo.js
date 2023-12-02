const DEF_DELAY = 1000;

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

scrolling()

window.addEventListener("scroll", scrolling)