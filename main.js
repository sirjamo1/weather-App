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

// const sunrise = weatherDataResponse.sys.sunrise;
// const sunset = weatherDataResponse.sys.sunset;
// const windSpeed = weatherDataResponse.wind.speed;
// const winDirection = weatherDataResponse.wind.deg;


const renderWeatherCard = (data) => {
    const mainContainer = document.getElementById("main-container");
    const weatherCard = document.createElement("div");
    weatherCard.id = "weather-card";
    const location = document.createElement("h3");
    location.innerHTML = `${data.name}, ${data.sys.country}`;
    weatherCard.appendChild(location);
    const tempContainer = document.createElement("div");
    tempContainer.id = "temp-container";
    const temp = document.createElement("p");
    temp.innerHTML = `Temp : ${kelvinToCelsius(data.main.temp)}`;
    temp.id = "temp";
    tempContainer.appendChild(temp);
    const minTemp = document.createElement("p");
    minTemp.innerHTML = `Min-temp : ${kelvinToCelsius(data.main.temp_min)}`;
    minTemp.id = "min-temp";
    tempContainer.appendChild(minTemp);
    const maxTemp = document.createElement("p");
    maxTemp.innerHTML = `Max-temp : ${kelvinToCelsius(data.main.temp_max)}`;
    maxTemp.id = "max-temp";
    tempContainer.appendChild(maxTemp);
    const feelsLike = document.createElement("p");
    feelsLike.innerHTML = `Feels like : ${kelvinToCelsius(
        data.main.feels_like
    )}`;
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
        renderWeatherCard(weatherData);
    } catch (err) {
        console.log(err);
    }
};

// sys:
//  country: "AU";
//  id: 2005393;
//  sunrise: 1669920296;
//  sunset: 1669969777;

// weather: (weather[0])
//  Array(1)
//  0: {id: 803, main: 'Clouds', description: 'broken clouds', icon: '04d'}
//  length: 1
//  [[Prototype]]: Array(0)

// wind:
//  deg: 170;
//  speed: 6.17;

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

// sys:
//  country: "AU";
//  id: 2005393;
//  sunrise: 1669920296;
//  sunset: 1669969777;

// weather: (weather[0])
//  Array(1)
//  0: {id: 803, main: 'Clouds', description: 'broken clouds', icon: '04d'}
//  length: 1
//  [[Prototype]]: Array(0)

// wind:
//  deg: 170;
//  speed: 6.17;
