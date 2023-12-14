const type = document.getElementById("type");
const from = document.getElementById("from");
const to = document.getElementById("to");
const departureDate = document.getElementById("departure");
const returnDate = document.getElementById("return");
const adults = document.getElementById("adults");
const children = document.getElementById("children");
const infants = document.getElementById("infants");
const classType = document.getElementById("class");
//const output = document.getElementById("result");
const submit = document.getElementById("submit");

function split(time) {
    time = time.split("T");
    console.log(time);
    let result = time[0] + " at " + time[1];
    console.log(result)
    return result
}

async function find(Type, From, To, Class, Adults, Children, Infants, Departure, Return) {
    let list = document.getElementById("result");
    list.innerHTML = "";
    list.innerText = "Getting data..."

    if (Children == "0" || Children == 0) {
        Children = ""
    };
    if (Infants == "0" || Children == 0) {
        Children = ""
    };

    if (Type == "oneway") {
        const options = {
            method: 'GET',
	        headers: {
	        	'X-RapidAPI-Key': '51adffd33cmsh6ff182208e964d0p1daa72jsn5c703584e8a7',
	        	'X-RapidAPI-Host': 'agoda-com.p.rapidapi.com'
	        }
        };
    
        const response = await fetch(`https://agoda-com.p.rapidapi.com/flights/one-way/search?flying_from=${From}&flying_to=${To}&departure_date=${Departure}&adults=${Adults}&children=${Children}&infants=${Infants}&class=${Class}`, options);
        const result = JSON.parse(await response.text());

        list.innerText = ""

        let array = result.data.bundles;

        if (result.message == "Successful") {
            for (let a = 0; a < array.length; a++) {
                let sliced = array[a].outboundSlice;
    
                let checkFromCountry = From.split(", ");
                let checkToCountry = To.split(", ");
    
                for (let i = 0; i < sliced.segments.length; i++) {
                    if (checkFromCountry.some(b => sliced.segments[i].airportContent.departureCountryName.includes(b)) && checkToCountry.some(c => sliced.segments[i].airportContent.arrivalCountryName.includes(c))) {
                        let div = document.createElement("div");
    
                        let top = document.createElement("div");
                        let img = document.createElement("div");
                        let h1 = document.createElement("h1");
                        top.classList.add("top");
                        img.classList.add("img");
    
                        h1.innerText = sliced.segments[i].carrierContent.carrierName;
                        img.style.backgroundImage = `url(${sliced.segments[i].carrierContent.carrierIcon})`;
    
                        top.appendChild(img);
                        top.appendChild(h1);
                        div.appendChild(top)
                
                        let bottom = document.createElement("div");
                        let plane = document.createElement("span");
                        let depa = document.createElement("span");
                        let arr = document.createElement("span");
                        let depaPlace = document.createElement("span");
                        let arrPlace = document.createElement("span");
                        let flightId = document.createElement("span");
                        bottom.classList.add("bottom");
    
                        if (sliced.segments[i].aircraftContent != undefined || sliced.segments[i].aircraftContent != null) {
                            plane.innerText = "Plane model: " + sliced.segments[i].aircraftContent.aircraftName;
                        }
                        else {
                            plane.innerText = "Plane model: No data found"
                        };
                        depa.innerText = "Depart: " + split(sliced.segments[i].departDateTime);
                        arr.innerText = "Arrival: " + split(sliced.segments[i].arrivalDateTime);
                        depaPlace.innerText = "Departure place: " + sliced.segments[i].airportContent.departureAirportName + " | " + sliced.segments[i].airportContent.departureCityName + " | " + sliced.segments[i].airportContent.departureCountryName;
                        arrPlace.innerText = "Arrival place: " + sliced.segments[i].airportContent.arrivalAirportName + " | " + sliced.segments[i].airportContent.arrivalCityName + " | " + sliced.segments[i].airportContent.arrivalCountryName;
                        flightId.innerText = "Flight ID: " + sliced.segments[i].flightNumber;
    
                        bottom.append(plane, depa, arr, depaPlace, arrPlace, flightId);
                        div.appendChild(bottom)
    
                        list.appendChild(div)
                    }
                }
            }
        }
        else {
            list.innerText = result.message
        };
    } else if (Type == "round") {
        const options = {
            method: 'GET',
	        headers: {
	        	'X-RapidAPI-Key': '51adffd33cmsh6ff182208e964d0p1daa72jsn5c703584e8a7',
	        	'X-RapidAPI-Host': 'agoda-com.p.rapidapi.com'
	        }
        };
    
        const response = await fetch(`https://agoda-com.p.rapidapi.com/flights/one-way/search?flying_from=${From}&flying_to=${To}&departure_date=${Departure}&return_date=${Return}&adults=${Adults}&children=${Children}&infants=${Infants}&class=${Class}`, options);
        const result = JSON.parse(await response.text());

        list.innerText = ""

        let array = result.data.bundles;

        if (result.message == "Successful") {
            for (let a = 0; a < array.length; a++) {
                let sliced = array[a].outboundSlice;
    
                let checkFromCountry = From.split(", ");
                let checkToCountry = To.split(", ");
    
                for (let i = 0; i < sliced.segments.length; i++) {
                    if (checkFromCountry.some(b => sliced.segments[i].airportContent.departureCountryName.includes(b)) && checkToCountry.some(c => sliced.segments[i].airportContent.arrivalCountryName.includes(c))) {
                        let div = document.createElement("div");
    
                        let top = document.createElement("div");
                        let img = document.createElement("div");
                        let h1 = document.createElement("h1");
                        top.classList.add("top");
                        img.classList.add("img");
    
                        h1.innerText = sliced.segments[i].carrierContent.carrierName;
                        img.style.backgroundImage = `url(${sliced.segments[i].carrierContent.carrierIcon})`;
    
                        top.appendChild(img);
                        top.appendChild(h1);
                        div.appendChild(top)
                
                        let bottom = document.createElement("div");
                        let plane = document.createElement("span");
                        let depa = document.createElement("span");
                        let arr = document.createElement("span");
                        let depaPlace = document.createElement("span");
                        let arrPlace = document.createElement("span");
                        let flightId = document.createElement("span");
                        bottom.classList.add("bottom");
    
                        if (sliced.segments[i].aircraftContent != undefined || sliced.segments[i].aircraftContent != null) {
                            plane.innerText = "Plane model: " + sliced.segments[i].aircraftContent.aircraftName;
                        }
                        else {
                            plane.innerText = "Plane model: No data found"
                        };
                        depa.innerText = "Depart: " + split(sliced.segments[i].departDateTime);
                        arr.innerText = "Arrival: " + split(sliced.segments[i].arrivalDateTime);
                        depaPlace.innerText = "Departure place: " + sliced.segments[i].airportContent.departureAirportName + " | " + sliced.segments[i].airportContent.departureCityName + " | " + sliced.segments[i].airportContent.departureCountryName;
                        arrPlace.innerText = "Arrival place: " + sliced.segments[i].airportContent.arrivalAirportName + " | " + sliced.segments[i].airportContent.arrivalCityName + " | " + sliced.segments[i].airportContent.arrivalCountryName;
                        flightId.innerText = "Flight ID: " + sliced.segments[i].flightNumber;
    
                        bottom.append(plane, depa, arr, depaPlace, arrPlace, flightId);
                        div.appendChild(bottom)
    
                        list.appendChild(div)
                    }
                }
            }
        }
        else {
            list.innerText = result.message
        };
    }
};

function change() {
    if (type.value == "oneway") {
        returnDate.setAttribute("disabled", "")
    } else {
        returnDate.removeAttribute("disabled")
    }
}
submit.addEventListener("click", () => {
    find(type.value, from.value, to.value, classType.value, adults.value, children.value, infants.value, departureDate.value, returnDate.value)
})

change()