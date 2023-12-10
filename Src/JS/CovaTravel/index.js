const account = JSON.parse(localStorage.getItem("Account"));

if (account != undefined) {
    document.getElementById("loginBlock").remove();
}
else {
    document.getElementById("loginBlock").style.transform = "translateY(0)";
    document.querySelector("body").style.overflow = "hidden";
};

if (account.usingPack == "Premium") {
    document.getElementById("ads").remove();
};