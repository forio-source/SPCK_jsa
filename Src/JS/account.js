const login = document.getElementById("login");
const mysaves = document.getElementById("mysaves");
const logout = document.getElementById("logout");

if (localStorage.getItem("Email") != undefined) {
    document.querySelector("div#wrapper > h1").innerText = localStorage.getItem("Email");

    login.style = "display: none;"
    mysaves.style = "display: block;"
    logout.style = "display: block;"
};

function logOut() {
    localStorage.removeItem("Email");
    localStorage.removeItem("Password");
    localStorage.removeItem("Saved");

    location = "/Src/Pages/index.html"
}