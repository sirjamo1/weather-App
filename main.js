const renderApp = () => {
    const mainContainer = document.createElement("div");
    mainContainer.id = "main-container";
    mainContainer.style.backgroundImage =
        "url('assets/images/backgrounds/midday.jpg')";
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
// const windSpeed = weatherDataResponse.wind.speed;
// const winDirection = weatherDataResponse.wind.deg;

const changeBackground = (data, sunriseTime, sunsetTime, el) => {
    const utcSeconds = parseInt(data.dt, 10) + parseInt(data.timezone, 10);
    const utcMilliseconds = utcSeconds * 1000;
    const localHour = new Date(utcMilliseconds).getUTCHours();
    let sunriseHour = Number(sunriseTime.substring(0, 2));
    let sunsetHour = Number(sunsetTime.substring(0, 2));
    if (localHour === sunriseHour || localHour === sunriseHour - 1) {
        el.style.backgroundImage =
            "url('assets/images/backgrounds/sunrise.jpg')";
    } else if (localHour === sunsetHour || localHour === sunsetHour + 1) {
        el.style.backgroundImage =
            "url('assets/images/backgrounds/sunset.jpg')";
    } else if (localHour > sunriseHour + 1 && localHour < sunsetHour - 1) {
        el.style.backgroundImage =
            "url('assets/images/backgrounds/midday.jpg')";
    } else {
        el.style.backgroundImage = "url('assets/images/backgrounds/night.jpg')";
    }

    console.log(localHour);
    console.log(sunriseTime);
    console.log((sunriseHour += 1));
    console.log(sunsetHour);
};

///NEED TO match the above with the local sunrise/ sunset else midday/ night
const renderWeatherCard = (data) => {
    const sunriseTime = new Date(data.sys.sunrise * 1000)
        .toTimeString()
        .substring(0, 8);
    const sunsetTime = new Date(data.sys.sunset * 1000)
        .toTimeString()
        .substring(0, 8);

    const mainContainer = document.getElementById("main-container");
    changeBackground(data, sunriseTime, sunsetTime, mainContainer);
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
    const sunContainer = document.createElement("div");
    sunContainer.id = "sun-container";
    const sunrise = document.createElement("p");
    sunrise.innerHTML = `Sunrise : ${sunriseTime} am`;
    sunContainer.appendChild(sunrise);
    const sunset = document.createElement("p");
    sunset.innerHTML = `Sunset : ${sunsetTime} pm`;
    sunContainer.appendChild(sunset);
    weatherCard.appendChild(sunContainer);
    const windContainer = document.createElement("div");
    windContainer.id = "wind-container";
    const windSpeed = document.createElement("p");
    windSpeed.innerHTML = `Wind speed : ${data.wind.speed}`;
    windContainer.appendChild(windSpeed);
    const windDirection = document.createElement("p");
    windDirection.innerHTML = `Wind direction : ${data.wind.deg}`;
    windContainer.appendChild(windDirection);
    weatherCard.appendChild(windContainer);
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
        const lat = weatherData.coord.lat;
        const lon = weatherData.coord.lon;
        console.log(weatherData);
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
// const timeAdjustment = (num) => {
// const time = new Date(num.dt * 1000 - .timezone * 1000);
// return time
// }
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
