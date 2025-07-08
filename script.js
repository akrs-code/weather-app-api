const apiKey = "748ba2bbb2a95142506d248e5fa10c07";
const weatherBtn = document.querySelector("#getWeatherBtn");
const cityInput = document.querySelector("#cityInput");
const card = document.querySelector("#weatherCard");

weatherBtn.addEventListener("click", async event => {
    event.preventDefault();
    const city = cityInput.value;
    if (city) {
        try {
            const weatherData = await getWeatherData(city);
            dislayWeatherInfo(weatherData)

        } catch (error) {
            displayError("An error occurred while fetching the weather data. Please try again later.");
            console.error("Error fetching weather data:", error);
        }

    } else {
        displayError("Please enter a city")
    }
})

async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error("Could not fetch weather data")
    }
    return await response.json()

}
function dislayWeatherInfo(data) {
    console.log(data)
    const { name: city, main: { temp, humidity }, weather: [{ description }], sys:{country}} = data;

    card.textContent = "";
    card.style.display = "flex"

    const cityDisplay = document.createElement("h2");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descriptionDisplay = document.createElement("p");
    const countryDisplay = document.createElement("p");

    cityDisplay.textContent = city;
    countryDisplay.textContent = country;
    tempDisplay.textContent = `Temperature: ${(temp - 273.15).toFixed(2)} °C`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descriptionDisplay.textContent = `Condition: ${description}`;


    cityDisplay.classList.add("city-name");
    tempDisplay.classList.add("temperature");
    humidityDisplay.classList.add("humidity");
    descriptionDisplay.classList.add("condition");
    countryDisplay.classList.add("country");
    
    card.appendChild(cityDisplay);
    card.appendChild(countryDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descriptionDisplay);
    }


    function displayError(message) {
        const errorDisplay = document.createElement("p");
        errorDisplay.textContent = message;
        errorDisplay.classList.add("error-message")

        card.textContent = "";
        card.style.display = "flex"
        card.appendChild(errorDisplay)
    }
