const login = document.getElementById("login");
const mysaves = document.getElementById("mysaves");
const logout = document.getElementById("logout");

if (localStorage.getItem("Account") != undefined) {
    let data = JSON.parse(localStorage.getItem("Account"));

    if (data.covaDictionaryLogedin == true) {
        document.querySelector("div#wrapper > h1").innerText = data.email;
        
        login.style = "display: none;";
        mysaves.style = "display: block;";
        logout.style = "display: block;";
    }
    
};

function logOut() {
    localStorage.clear();

    location = "/Src/Pages/";
}

function logIn() {
    let data = JSON.parse(localStorage.getItem("Account"));
    data.covaDictionaryLogedin = true;
    localStorage.setItem("Account", JSON.stringify(data));
    location = "/Src/Pages/";
}