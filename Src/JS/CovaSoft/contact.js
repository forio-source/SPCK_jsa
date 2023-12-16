const form = document.querySelector("div#wrapper form#contact");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    form.querySelector("input[type='text']").value = "";
    form.querySelector("input[type='email']").value = "";
    form.querySelector("textarea").value = "";
})