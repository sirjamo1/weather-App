import data from "./assets/city.list.json" assert { type: "json" };

const cityData = data;
const renderApp = () => {
    const mainContainer = document.createElement("div");
    mainContainer.id = "main-container";
    mainContainer.style.backgroundImage =
        "url('assets/images/backgrounds/midday.jpg')";
    mainContainer.appendChild(renderForm());
    console.log(cityData);

    console.log("done");
    return mainContainer;
};
const confirmCity = (city) => {
    console.log(city);
    let cityFormatted = "";
    const splitString = city.split(" ");
    for (let i = 0; i < splitString.length; i += 1) {
        let lowerCase =
            i !== splitString.length - 1
                ? splitString[i][0].toUpperCase() +
                  splitString[i].slice(1) +
                  " "
                : splitString[i][0].toUpperCase() + splitString[i].slice(1);
        cityFormatted += lowerCase;
    }
    console.log({ cityFormatted });

    for (let i = 0; i < cityData.length; i += 1) {
        if (cityData[i].name == cityFormatted) {
            let cityId = cityData[i].id;
            console.log(cityId);
            return cityId;
        }
    }
    console.log(`${city} city not found`);
};
// need to use id to search for for 5 day weather
const renderForm = () => {
    const formContainer = document.createElement("form");
    formContainer.id = "form-container";
    const locationInput = document.createElement("input");
    locationInput.type = "search";
    locationInput.name = "location";
    locationInput.id = "location";
    locationInput.placeholder = "Enter location";
    formContainer.appendChild(locationInput);
    const searchButton = document.createElement("button");
    searchButton.type = "search";
    searchButton.innerHTML = "Search";
    searchButton.addEventListener("click", (e) => {
        let id = confirmCity(locationInput.value);

        getData(id);
        e.preventDefault();
    });

    formContainer.appendChild(searchButton);

    return formContainer;
};

const getLocalDateTime = (timezone) => {
    let d = new Date();
    let utc = d.getTime() + d.getTimezoneOffset() * 60000;
    let nd = new Date(utc + 3600000 * timezone);

    //    return nd.toLocaleString()
    return nd.toLocaleString();
};
const getSunRiseSunSet = (timezone, dataTime) => {
    let date = new Date(dataTime * 1000);
    let time = date.getTime();
    let localOffset = date.getTimezoneOffset() * 60000;
    let utc = time + localOffset;
    let localTime = utc + 1000 * timezone;
    return new Date(localTime).toTimeString().substring(0, 8);
};

const changeBackground = (
    localDateTime,
    sunriseTime,
    sunsetTime,
    mainContainer,
    weatherCard
) => {
    let localHour = Number(localDateTime.substring(12, 14));
    console.log(localHour);
    let sunriseHour = Number(sunriseTime.substring(0, 2));
    let sunsetHour = Number(sunsetTime.substring(0, 2));
    if (localHour === sunriseHour || localHour === sunriseHour - 1) {
        mainContainer.style.backgroundImage =
            "url('assets/images/backgrounds/sunrise.jpg')";
    } else if (localHour === sunsetHour || localHour === sunsetHour + 1) {
        mainContainer.style.backgroundImage =
            "url('assets/images/backgrounds/sunset.jpg')";
    } else if (localHour > sunriseHour + 1 && localHour < sunsetHour - 1) {
        mainContainer.style.backgroundImage =
            "url('assets/images/backgrounds/midday.jpg')";
    } else {
        mainContainer.style.backgroundImage =
            "url('assets/images/backgrounds/night.jpg')";
    }
};
const compassLabels = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
    "N",
];


const fiveDayForcast = () => {
    
}
const windDir = (deg) => {
    let index = Math.round(deg / 22.5);
    let compassReading = compassLabels[index];
    return compassReading;
};
const renderWeatherCard = (data) => {
    const timezone = data.city.timezone / 60 / 60;
    const localDateTime = getLocalDateTime(timezone);
    const sunriseTime = getSunRiseSunSet(data.city.timezone, data.city.sunrise);
    const sunsetTime = getSunRiseSunSet(data.city.timezone, data.city.sunset);

    const mainContainer = document.getElementById("main-container");
    const weatherCard = document.createElement("div");
    // weatherCard.style.backgroundImage =
    //     `url('assets/images/backgrounds/cardWeather/${data.weather[0].description}.jpg')`;
    changeBackground(
        localDateTime,
        sunriseTime,
        sunsetTime,
        mainContainer,
        weatherCard
    );
    weatherCard.id = "weather-card";
    const location = document.createElement("h3");

    location.innerHTML = `${data.city.name}, ${data.city.country}`;
    weatherCard.appendChild(location);
    const locationDateTime = document.createElement("p");
    locationDateTime.innerHTML = localDateTime;
    weatherCard.appendChild(locationDateTime);
    for (let i = 0; i < data.list[0].weather.length; i += 1) {
        const icon = document.createElement("img");
        icon.src = `http://openweathermap.org/img/wn/${data.list[0].weather[i].icon}@2x.png`;
        icon.classList = "weather-icons";
        weatherCard.appendChild(icon);
    }

    //TEMP container

    const tempContainer = document.createElement("div");
    //L
    const tempInnerContainerL = document.createElement("div");
    tempInnerContainerL.id = "temp-inner-container-l";
    tempContainer.appendChild(tempInnerContainerL);
    tempContainer.id = "temp-container";
    const temp = document.createElement("p");
    temp.innerHTML = `Temp :`;
    temp.id = "temp";
    tempInnerContainerL.appendChild(temp);
    const minTemp = document.createElement("p");
    minTemp.innerHTML = `Min-temp :`;
    minTemp.id = "min-temp";
    tempInnerContainerL.appendChild(minTemp);
    const maxTemp = document.createElement("p");
    maxTemp.innerHTML = `Max-temp :`;
    maxTemp.id = "max-temp";
    tempInnerContainerL.appendChild(maxTemp);
    const feelsLike = document.createElement("p");
    feelsLike.innerHTML = `Feels like :`;
    feelsLike.id = "feels-like";
    tempInnerContainerL.appendChild(feelsLike);
    const humidity = document.createElement("p");
    humidity.innerHTML = "Humidity :";
    tempInnerContainerL.appendChild(humidity);
    const pressure = document.createElement("p");
    pressure.innerHTML = "Pressure :";
    tempInnerContainerL.appendChild(pressure);
    //R
    const tempInnerContainerR = document.createElement("div");
    tempInnerContainerR.id = "temp-inner-container-r";
    tempContainer.appendChild(tempInnerContainerR);
    const tempValue = document.createElement("p");
    tempValue.innerHTML = kelvinToCelsius(data.list[0].main.temp);
    tempInnerContainerR.appendChild(tempValue);
    const minTempValue = document.createElement("p");
    minTempValue.innerHTML = kelvinToCelsius(data.list[0].main.temp_min);
    minTempValue.id = "min-temp-value";
    tempInnerContainerR.appendChild(minTempValue);
    const maxTempValue = document.createElement("p");
    maxTempValue.innerHTML = kelvinToCelsius(data.list[0].main.temp_max);
    maxTempValue.id = "max-temp-value";
    tempInnerContainerR.appendChild(maxTempValue);
    const feelsLikeValue = document.createElement("p");
    feelsLikeValue.innerHTML = kelvinToCelsius(data.list[0].main.feels_like);
    feelsLikeValue.id = "feels-like-value";
    tempInnerContainerR.appendChild(feelsLikeValue);
    const humidityValue = document.createElement("p");
    humidityValue.innerHTML = data.list[0].main.humidity;
    tempInnerContainerR.appendChild(humidityValue);
    const pressureValue = document.createElement("p");
    pressureValue.innerHTML = data.list[0].main.pressure;
    tempInnerContainerR.appendChild(pressureValue);
    weatherCard.appendChild(tempContainer);

    //Sun Container
    const sunContainer = document.createElement("div");
    sunContainer.style.backgroundImage =
        "url('assets/images/sunrise-sunset.png')";
    sunContainer.id = "sun-container";
    sunContainer.id = "sun-container";
    const sunrise = document.createElement("p");
    sunrise.innerHTML = `${sunriseTime} am`;
    sunContainer.appendChild(sunrise);
    const sunset = document.createElement("p");
    sunset.innerHTML = `${sunsetTime} pm`;
    sunContainer.appendChild(sunset);
    weatherCard.appendChild(sunContainer);

    //wind container
    const windContainer = document.createElement("div");
    //L
    const windInnerContainerL = document.createElement("div");
    windInnerContainerL.id = "wind-inner-container-l";
    windContainer.appendChild(windInnerContainerL);
    windContainer.id = "wind-container";
    const wind = document.createElement("p");
    wind.innerHTML = `Wind`;
    windInnerContainerL.appendChild(wind);
    const windSpeed = document.createElement("p");
    windSpeed.innerHTML = `${data.list[0].wind.speed} m/s`;
    windInnerContainerL.appendChild(windSpeed);
    const windDirection = document.createElement("p");
    windDirection.id = "wind-direction";
    windDirection.innerHTML = windDir(data.list[0].wind.deg);
    windInnerContainerL.appendChild(windDirection);
    //R
    const windInnerContainerR = document.createElement("div");
    windInnerContainerR.id = "wind-inner-container-r";
    windContainer.appendChild(windInnerContainerR);
    const compass = document.createElement("img");
    compass.src = "assets/icons/compass.png";
    compass.id = "compass";
    const arrowRed = document.createElement("img");
    arrowRed.src = "assets/icons/redArrow.png";
    arrowRed.id = "arrow-red";
    arrowRed.style.transform = `rotate(${data.list[0].wind.deg}deg)`;

    windInnerContainerR.appendChild(compass);
    windInnerContainerR.appendChild(arrowRed);

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
const getData = async (id) => {
    try {
        const response = await fetch(
            `http://api.openweathermap.org/data/2.5/forecast?id=${id}&appid=9f22446b3c7684227930790425851744`,
            { mode: "cors" }
        );
        const weatherData = await response.json();
        console.log(weatherData);
        renderWeatherCard(weatherData);
    } catch (err) {
        console.log(err);
    }

    // try {
    //     const response1 = await fetch(
    //         `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=9f22446b3c7684227930790425851744`,
    //         { mode: "cors" }
    //     );
    //     const weatherData = await response1.json();
    //     const lat = weatherData.coord.lat;
    //     const lon = weatherData.coord.lon;
    //     console.log(weatherData);
    //     renderWeatherCard(weatherData);
    //     try {
    //         const response2 = await fetch(
    //             `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=9f22446b3c7684227930790425851744`,
    //             { mode: "cors" }
    //         );
    //         const weatherForcast = await response2.json();
    //         console.log(weatherForcast);
    //     } catch (err) {
    //         console.log(err);
    //     }
    // } catch (err) {
    //     console.log(err);
    // }
};
//153.0281, lat: -27.4679
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
