const renderApp = () => {
    const mainContainer = document.createElement("div");
    mainContainer.id = "main-container";
    mainContainer.style.backgroundImage =
        "url('assets/images/backgrounds/midday.jpg')";
    mainContainer.appendChild(renderForm());

    return mainContainer;
};

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
        getData();
        e.preventDefault();
    });

    formContainer.appendChild(searchButton);

    return formContainer;
};
const getLocalDateTime = (data) => {
    const utcSeconds = parseInt(data.dt, 10) + parseInt(data.timezone, 10);
    const utcMilliseconds = utcSeconds * 1000;
    let fullDate = new Date(utcMilliseconds).toUTCString();

    return fullDate;
};
const changeBackground = (
    data,
    sunriseTime,
    sunsetTime,
    mainContainer,
    weatherCard
) => {
    const utcSeconds = parseInt(data.dt, 10) + parseInt(data.timezone, 10);
    const utcMilliseconds = utcSeconds * 1000;
    const localHour = new Date(utcMilliseconds).getUTCHours();
    let sunriseHour = Number(sunriseTime.substring(0, 2));
    let sunsetHour = Number(sunsetTime.substring(0, 2));
    console.log(weatherCard);
    if (localHour === sunriseHour || localHour === sunriseHour - 1) {
        mainContainer.style.backgroundImage =
            "url('assets/images/backgrounds/sunrise.jpg')";
        weatherCard.style.color = "black";
    } else if (localHour === sunsetHour || localHour === sunsetHour + 1) {
        mainContainer.style.backgroundImage =
            "url('assets/images/backgrounds/sunset.jpg')";
        weatherCard.style.color = "black";
    } else if (localHour > sunriseHour + 1 && localHour < sunsetHour - 1) {
        mainContainer.style.backgroundImage =
            "url('assets/images/backgrounds/midday.jpg')";
        weatherCard.style.color = "black";
    } else {
        mainContainer.style.backgroundImage =
            "url('assets/images/backgrounds/night.jpg')";
        weatherCard.style.color = "white";
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
const windDir = (deg) => {
    let index = Math.round(deg / 22.5);
    let compassReading = compassLabels[index];
    return compassReading;
};
const renderWeatherCard = (data) => {
    const sunriseTime = new Date(data.sys.sunrise * 1000)
        .toTimeString()
        .substring(0, 8);
    const sunsetTime = new Date(data.sys.sunset * 1000)
        .toTimeString()
        .substring(0, 8);

    const mainContainer = document.getElementById("main-container");
    const weatherCard = document.createElement("div");
    // weatherCard.style.backgroundImage =
    //     `url('assets/images/backgrounds/cardWeather/${data.weather[0].description}.jpg')`;
    changeBackground(data, sunriseTime, sunsetTime, mainContainer, weatherCard);
    weatherCard.id = "weather-card";
    const location = document.createElement("h3");

    location.innerHTML = `${data.name}, ${data.sys.country}`;
    weatherCard.appendChild(location);
    const locationDateTime = document.createElement("p");
    locationDateTime.innerHTML = getLocalDateTime(data);
    weatherCard.appendChild(locationDateTime);
    for (let i = 0; i < data.weather.length; i += 1) {
        const icon = document.createElement("img");
        icon.src = `http://openweathermap.org/img/wn/${data.weather[i].icon}@2x.png`;
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
    humidity.innerHTML = 'Humidity :';
    tempInnerContainerL.appendChild(humidity);
    const pressure = document.createElement("p");
    pressure.innerHTML = 'Pressure :';
    tempInnerContainerL.appendChild(pressure);
    //R
    const tempInnerContainerR = document.createElement("div");
    tempInnerContainerR.id = "temp-inner-container-r";
    tempContainer.appendChild(tempInnerContainerR);
    const tempValue = document.createElement("p");
    tempValue.innerHTML = kelvinToCelsius(data.main.temp);
    tempInnerContainerR.appendChild(tempValue);
    const minTempValue = document.createElement("p");
    minTempValue.innerHTML = kelvinToCelsius(data.main.temp_min);
    minTempValue.id = "min-temp-value";
    tempInnerContainerR.appendChild(minTempValue);
    const maxTempValue = document.createElement("p");
    maxTempValue.innerHTML = kelvinToCelsius(data.main.temp_max);
    maxTempValue.id = "max-temp-value";
    tempInnerContainerR.appendChild(maxTempValue);
    const feelsLikeValue = document.createElement("p");
    feelsLikeValue.innerHTML = kelvinToCelsius(data.main.feels_like);
    feelsLikeValue.id = "feels-like-value";
    tempInnerContainerR.appendChild(feelsLikeValue);
    const humidityValue = document.createElement("p");
    humidityValue.innerHTML = data.main.humidity;
    tempInnerContainerR.appendChild(humidityValue);
    const pressureValue = document.createElement("p");
    pressureValue.innerHTML = data.main.pressure;
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
    windSpeed.innerHTML = `${data.wind.speed} m/s`;
    windInnerContainerL.appendChild(windSpeed);
    const windDirection = document.createElement("p");
    windDirection.id = "wind-direction";
    windDirection.innerHTML = windDir(data.wind.deg);
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
    arrowRed.style.transform = `rotate(${data.wind.deg}deg)`;

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
