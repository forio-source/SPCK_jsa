const login = document.getElementById("loginForm");
const signup = document.getElementById("signupForm");
const emailDomains = ["@gmail.com", "@outlook.com"];

login.addEventListener("submit", (e) => {
    e.preventDefault();

    let values = {
        Email: document.querySelector("form#loginForm > input.email").value,
        Pass: document.querySelector("form#loginForm > input#password").value,
    }

    if (values.Email == localStorage.getItem("Email") && values.Pass == localStorage.getItem("Password")) {
        location = "/Src/Pages/index.html"
    }
});

signup.addEventListener("submit", (e) => {
    e.preventDefault();

    let values = {
        Email: document.querySelector("form#signupForm > input.email").value,
        Pass: document.querySelector("form#signupForm > input#password1").value,
        RePass: document.querySelector("form#signupForm > input#password2").value,
    }

    if (emailDomains.some(i => values.Email.includes(i)) && values.Pass.length >= 6 && values.Pass == values.RePass && localStorage.getItem("Email") == undefined && localStorage.getItem("Password") == undefined) {
        localStorage.setItem("Email", values.Email);
        localStorage.setItem("Password", values.RePass);
        login.style = "display: block";
        signup.style = "display: none";
    }
});

document.querySelector('form#signupForm > a').addEventListener("click", () => {
    login.style = "display: block";
    signup.style = "display: none";
});

document.querySelector('form#loginForm > a').addEventListener("click", () => {
    signup.style = "display: block";
    login.style = "display: none";
});