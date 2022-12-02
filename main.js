const renderApp = () => {
    const mainContainer = document.createElement("div");
    mainContainer.id = "main-container";
    mainContainer.appendChild(renderForm());
    // mainContainer.appendChild(renderWeatherCard());
    return mainContainer;
};

const renderForm = () => {
    const formContainer = document.createElement("form");
    formContainer.id = "form-container";
    const locationLabel = document.createElement("label");
    locationLabel.for = "location";
    locationLabel.innerHTML = "Enter location";
    formContainer.appendChild(locationLabel);
    const locationInput = document.createElement("input");
    locationInput.type = "search";
    locationInput.name = "location";
    locationInput.id = "location";
    formContainer.appendChild(locationInput);
    const searchButton = document.createElement("button");
    searchButton.type = "search";
    searchButton.innerHTML = "Search";
    searchButton.addEventListener("click", (e) => {
        getData();
        e.preventDefault();
    });

    formContainer.appendChild(searchButton);

    return formContainer;
};
// https://api.openweathermap.org/data/2.5/weather?q=brisbane&appid=9f22446b3c7684227930790425851744
const renderWeatherCard = (
    locationData,
    tempData,
    minTempData,
    maxTempData,
    feelsLikeData
) => {
    const mainContainer = document.getElementById("main-container");
    const weatherCard = document.createElement("div");
    weatherCard.id = "weather-card";
    const location = document.createElement("h3");
    location.innerHTML =
        locationData[0].toUpperCase() + locationData.slice(1).toLowerCase();
    weatherCard.appendChild(location);
    const tempContainer = document.createElement("div");
    tempContainer.id = "temp-container";
    const temp = document.createElement("p");
    temp.innerHTML = `Temp : ${tempData}`;
    temp.id = "temp";
    tempContainer.appendChild(temp);
    const minTemp = document.createElement("p");
    minTemp.innerHTML = `Min-temp : ${minTempData}`;
    minTemp.id = "min-temp";
    tempContainer.appendChild(minTemp);
    const maxTemp = document.createElement("p");
    maxTemp.innerHTML = `Max-temp : ${maxTempData}`;
    maxTemp.id = "max-temp";
    tempContainer.appendChild(maxTemp);
    const feelsLike = document.createElement("p");
    feelsLike.innerHTML = `Feels like : ${feelsLikeData}`;
    feelsLike.id = "feels-like";
    tempContainer.appendChild(feelsLike);
    weatherCard.appendChild(tempContainer);
    if (document.getElementById("weather-card")) {
        mainContainer.replaceChild(
            weatherCard,
            document.getElementById("weather-card")
        );
    } else {
        mainContainer.appendChild(weatherCard);
    }
};

const getData = async () => {
    let location = document.getElementById("location").value;
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=9f22446b3c7684227930790425851744`,
            { mode: "cors" }
        );
        const weatherData = await response.json();
        const tempC = kelvinToCelsius(weatherData.main.temp);
        const minTempC = kelvinToCelsius(weatherData.main.temp_min);
        const maxTempC = kelvinToCelsius(weatherData.main.temp_max);
        const feelsLikeTempC = kelvinToCelsius(weatherData.main.feels_like);

        renderWeatherCard(location, tempC, minTempC, maxTempC, feelsLikeTempC);
    } catch (err) {
        console.log(err);
    }
};
const kelvinToCelsius = (k) => {
    let c = Math.round(k - 273.15) + " c";
    return c;
};
const kelvinToFahrenheit = (k) => {
    let f = Math.round(1.8 * (k - 273) + 32) + " f";
    return f;
};
const celsiusTofahrenheit = (c) => {
    let f = Math.round(c * 1.8 + 32) + " f";
    return f;
};
const fahrenheitToCelsius = (f) => {
    let c = Math.round((f - 32) * 0.5556) + " c";
    return c;
};

document.querySelector("body").appendChild(renderApp());
//{temp: 295.86, feels_like: 295.65, temp_min: 295.86, temp_max: 295.86, pressure: 1010, …}
