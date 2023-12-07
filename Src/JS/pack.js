const free = document.querySelector("div#wrapper > div > button");
const premium = document.querySelector("div#wrapper > div#premium > button");
const account = JSON.parse(localStorage.getItem("Account"));

if (localStorage.getItem("Account")) {
    if (account.usingPack == "Free") {
        free.innerText = "Owned"
    }
    else if (account.usingPack == "Premium") {
        premium.innerText = "Owned"
    };
}
else {
    location = "/Src/Pages/Cova/login-signup.html"
};

free.addEventListener("click", () => {
    if (localStorage.getItem("Account") && account.usingPack == "Premium") {
        account.usingPack = "Free";
        location = "/Src/Pages/Cova/pack.html";
        localStorage.setItem("Account", JSON.stringify(account));
    }
});
premium.addEventListener("click", () => {
    if (localStorage.getItem("Account") && account.usingPack == "Free") {
        account.usingPack = "Premium";
        location = "/Src/Pages/Cova/pack.html";
        localStorage.setItem("Account", JSON.stringify(account));
    }
});