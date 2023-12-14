const cityName = document.getElementById("cityName");
const countryName = document.getElementById("countryName");
const output = document.getElementById("result");
const submit = document.getElementById("submit")

async function find(City, Country) {
    if (City != "" && Country != "") {
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '51adffd33cmsh6ff182208e964d0p1daa72jsn5c703584e8a7',
                'X-RapidAPI-Host': 'best-booking-com-hotel.p.rapidapi.com'
            }
        };
    
        const response = await fetch(`https://best-booking-com-hotel.p.rapidapi.com/booking/best-accommodation?cityName=${City}&countryName=${Country}`, options);
        const result = await response.json();

        output.querySelector("p[name='hotel']").innerText = "Hotel name: " + result.name;
        output.querySelector("p[name='link']").innerText = "Booking link: " + result.link;
        output.querySelector("p[name='rating']").innerText = "Rating: " + result.rating;
    }
};

submit.addEventListener("click", () => {
    find(cityName.value, countryName.value)
})