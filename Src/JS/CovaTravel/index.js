const account = JSON.parse(localStorage.getItem("Account"));

if (account != undefined) {
    if (account.usingPack == "Premium") {
        document.getElementById("ads").remove();
    };
};