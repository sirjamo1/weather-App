import data from "./assets/cityId.list.json" assert { type: "json" };

const cityData = data;
const renderApp = () => {
    const mainContainer = document.createElement("div");
    mainContainer.id = "main-container";
    mainContainer.style.backgroundImage =
        "url('assets/images/backgrounds/midday.jpg')";
    mainContainer.appendChild(renderForm());

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
        getWeatherApi(id);
        // getForecastData(id);
        // getCurrentWeather(id)
        e.preventDefault();
    });

    formContainer.appendChild(searchButton);

    return formContainer;
};

const getLocalDateTime = (timezone) => {
    let d = new Date();
    let utc = d.getTime() + d.getTimezoneOffset() * 60000;
    let localFullDateTime = new Date(utc + 3600000 * timezone);

    return localFullDateTime;
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
const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const renderForecast = (forecastData, weekday) => {
    //Note: This is showing thurs as fri, fri as sat etc...
    const forecastContainer = document.createElement("div");
    forecastContainer.id = "forecast-container";
    let daysOfWeekIndex = daysOfWeek.indexOf(weekday);
let forecastLength = Object.keys(forecastData.days).length
    for (let i = 1; i < forecastLength; i += 1) {
        daysOfWeekIndex =
            daysOfWeekIndex === 6
                ? (daysOfWeekIndex = 0)
                : (daysOfWeekIndex += 1);
        const dayContainer = document.createElement("div");
        dayContainer.className = "day-container";
        const day = document.createElement("p");
        day.innerHTML = `${daysOfWeek[daysOfWeekIndex]}`;
        dayContainer.appendChild(day);
        const icon = document.createElement("img");
        icon.src = `http://openweathermap.org/img/wn/${forecastData.days[i].icon}@2x.png`;
        icon.className = "forecast-icon";
        dayContainer.appendChild(icon);
        const minTemp = document.createElement("p");
        minTemp.style.color = changeHotColdText(forecastData.days[i].min)
        minTemp.innerHTML = `Min: ${kelvinToCelsius(
            forecastData.days[i].min
        )}&#176`;
        dayContainer.appendChild(minTemp);
        const maxTemp = document.createElement("p");
        maxTemp.style.color = changeHotColdText(forecastData.days[i].max)
        maxTemp.innerHTML = `Max:${kelvinToCelsius(
            forecastData.days[i].max
        )}&#176`;
        dayContainer.appendChild(maxTemp);

        forecastContainer.appendChild(dayContainer);
    }

    return forecastContainer;
};
const changeHotColdText = (temp) => {
    if (temp >= 302) {
        return "red";
    } else if (temp <= 283) {
        return "blue";
    } else {
        return "black";
    }
};
const windDir = (deg) => {
    let index = Math.round(deg / 22.5);
    let compassReading = compassLabels[index];
    return compassReading;
};
const renderWeatherCard = (currentData, forecastData) => {
    const timezone = currentData.timezone / 60 / 60;
    const localFullDateTime = getLocalDateTime(timezone);
    const weekday = localFullDateTime.toString().substring(0, 3);
    const localDateTime = localFullDateTime.toLocaleString();
    const sunriseTime = getSunRiseSunSet(
        currentData.timezone,
        currentData.sys.sunrise
    );
    const sunsetTime = getSunRiseSunSet(
        currentData.timezone,
        currentData.sys.sunset
    );
    const mainContainer = document.getElementById("main-container");
    const weatherCard = document.createElement("div");
    // weatherCard.style.backgroundImage =
    //     `url('assets/images/backgrounds/cardWeather/${currentData.weather[0].description}.jpg')`;
    changeBackground(
        localDateTime,
        sunriseTime,
        sunsetTime,
        mainContainer,
        weatherCard
    );
    weatherCard.id = "weather-card";
    const location = document.createElement("h3");

    location.innerHTML = `${currentData.name}, ${currentData.sys.country}`;
    weatherCard.appendChild(location);
    const locationDateTime = document.createElement("p");
    locationDateTime.innerHTML = localDateTime;
    weatherCard.appendChild(locationDateTime);
    for (let i = 0; i < currentData.weather.length; i += 1) {
        const icon = document.createElement("img");
        icon.src = `http://openweathermap.org/img/wn/${currentData.weather[i].icon}@2x.png`;
        icon.classList = "weather-icons";
        weatherCard.appendChild(icon);
    }

    //TEMP container

    const tempContainer = document.createElement("div");
    tempContainer.id = "temp-container";

    //L Container

    const tempInnerContainerL = document.createElement("div");
    tempInnerContainerL.id = "temp-inner-container-l";
    tempContainer.appendChild(tempInnerContainerL);
    //description L
    const descriptionL = document.createElement("div");
    descriptionL.id = "description-l";
    tempInnerContainerL.appendChild(descriptionL);
    const temp = document.createElement("p");
    temp.innerHTML = `Temp :`;
    temp.id = "temp";
    descriptionL.appendChild(temp);
    const minTemp = document.createElement("p");
    minTemp.innerHTML = `Min :`;
    minTemp.id = "min-temp";
    descriptionL.appendChild(minTemp);
    const maxTemp = document.createElement("p");
    maxTemp.innerHTML = `Max :`;
    maxTemp.id = "max-temp";
    descriptionL.appendChild(maxTemp);

    //value L
    const valueL = document.createElement("div");
    valueL.id = "value-l";
    tempInnerContainerL.appendChild(valueL);
    const tempValue = document.createElement("p");

    tempValue.style.color = changeHotColdText(currentData.main.temp);
    console.log(currentData.main.temp)
    tempValue.innerHTML = `${kelvinToCelsius(currentData.main.temp)}&#176`;
    valueL.appendChild(tempValue);
    const minTempValue = document.createElement("p");
    minTempValue.style.color = changeHotColdText(forecastData.days[0].min);
    minTempValue.innerHTML = `${kelvinToCelsius(
        forecastData.days[0].min
    )}&#176`;

    minTempValue.id = "min-temp-value";
    valueL.appendChild(minTempValue);
    const maxTempValue = document.createElement("p");
    maxTempValue.style.color = changeHotColdText(forecastData.days[0].max);
    maxTempValue.innerHTML = `${kelvinToCelsius(forecastData.days[0].max)}&#176`;
    maxTempValue.id = "max-temp-value";
    valueL.appendChild(maxTempValue);

    //R container
    const tempInnerContainerR = document.createElement("div");
    tempInnerContainerR.id = "temp-inner-container-r";
    tempContainer.appendChild(tempInnerContainerR);

    // description R
    const descriptionR = document.createElement("div");
    descriptionR.id = "description-r";
    tempInnerContainerR.append(descriptionR);
    const feelsLike = document.createElement("p");
    feelsLike.innerHTML = `Feels like :`;
    feelsLike.id = "feels-like";
    descriptionR.appendChild(feelsLike);
    const humidity = document.createElement("p");
    humidity.innerHTML = "Humidity :";
    descriptionR.appendChild(humidity);
    const pressure = document.createElement("p");
    pressure.innerHTML = "Pressure :";
    descriptionR.appendChild(pressure);
    // value r
    const valueR = document.createElement("div");
    valueR.id = "value-r";
    tempInnerContainerR.appendChild(valueR);
    const feelsLikeValue = document.createElement("p");
    feelsLikeValue.style.color = changeHotColdText(currentData.main.feels_like);
    feelsLikeValue.innerHTML = `${kelvinToCelsius(
        currentData.main.feels_like
    )}&#176`;
    feelsLikeValue.id = "feels-like-value";
    valueR.appendChild(feelsLikeValue);
    const humidityValue = document.createElement("p");
    humidityValue.innerHTML = currentData.main.humidity;
    valueR.appendChild(humidityValue);
    const pressureValue = document.createElement("p");
    pressureValue.innerHTML = currentData.main.pressure;
    valueR.appendChild(pressureValue);

    weatherCard.appendChild(tempContainer);

    //5 day forecast
    weatherCard.appendChild(renderForecast(forecastData, weekday));
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
    windSpeed.innerHTML = `${currentData.wind.speed} m/s`;
    windInnerContainerL.appendChild(windSpeed);
    const windDirection = document.createElement("p");
    windDirection.id = "wind-direction";
    windDirection.innerHTML = windDir(currentData.wind.deg);
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
    arrowRed.style.transform = `rotate(${currentData.wind.deg}deg)`;

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
const formatDate = (date) => {
    let d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return `${year}-${month}-${day}`;
};
const findMostCommon = (arr) => {
    return arr
        .sort(
            (a, b) =>
                arr.filter((v) => v === a).length -
                arr.filter((v) => v === b).length
        )
        .pop();
};
const sortDays = (data) => {
    let date = formatDate(new Date());
    let logData = false;
    let days = {};
    let daysIndex = 0;
    let day = { min: 999, max: -999, temp: 0, icon: [""], date };
    let loopCount = 0;
    for (let i = 0; i < data.list.length; i += 1) {
        date = formatDate(date);
        let iDate = formatDate(data.list[i].dt_txt);

        if (iDate === date) {
            logData = true;
            (day.temp += data.list[i].main.temp),
                (day.min =
                    data.list[i].main.temp_min < day.min
                        ? data.list[i].main.temp_min
                        : day.min),
                (day.max =
                    data.list[i].main.temp_max > day.max
                        ? data.list[i].main.temp_max
                        : day.max),
                (day.icon[loopCount] = data.list[i].weather[0].icon);
                day.date = formatDate(data.list[i].dt_txt)

            loopCount += 1;
        } else if (logData === true) {
            day.temp = day.temp / loopCount;
            let mostCommonIcon = findMostCommon(day.icon);
            days[daysIndex] = {
                min: day.min,
                max: day.max,
                temp: day.temp,
                icon: mostCommonIcon,
                date: day.date,
            };

            //reset for next loop
            daysIndex += 1;
            day = { min: 999, max: -999, temp: 0, icon: [""] };
            loopCount = 0;
            let nextDate = new Date(date);
            date = formatDate(nextDate.setDate(nextDate.getDate() + 1));
        }
    }
    return days;
};
const sortWeatherData = (data) => {
    console.log(data);
    const sortedData = {
        name: data.city.name,
        country: data.city.country,
        sunrise: data.city.sunrise,
        sunset: data.city.sunset,
        timezone: data.city.timezone,
        days: sortDays(data),
    };
    console.log(sortedData);
    // sortDays(data);
    return sortedData;
};
const getWeatherApi = async (id) => {
    try {
        const responseForecast = await fetch(
            `http://api.openweathermap.org/data/2.5/forecast?id=${id}&appid=9f22446b3c7684227930790425851744`,
            { mode: "cors" }
        );
        const forecastData = await responseForecast.json();
        console.log({forecastData})
        let sortedForecastData = sortWeatherData(forecastData);
        const responseCurrent = await fetch(
            `http://api.openweathermap.org/data/2.5/weather?id=${id}&appid=9f22446b3c7684227930790425851744`,
            { mode: "cors" }
        );
        const currentData = await responseCurrent.json();
        console.log({ currentData });
        console.log(sortedForecastData);
        renderWeatherCard(currentData, sortedForecastData);
    } catch (err) {
        console.log(err);
        // }
        // try {
        //     const responseCurrent = await fetch(
        //         `http://api.openweathermap.org/data/2.5/weather?id=${id}&appid=9f22446b3c7684227930790425851744&units=metric`,
        //         { mode: "cors" }
        //     );
        //     const currentData = await responseCurrent.json();
        //     // console.log({ currentData });
        //         renderWeatherCard(currentData);

        // } catch (err) {
        //     console.log(err);
        // }
    }
};

//}
const kelvinToCelsius = (k) => {
    let c = Math.round(k - 273.15);
    return c;
};
const kelvinToFahrenheit = (k) => {
    let f = Math.round(1.8 * (k - 273) + 32);
    return f;
};
const celsiusTofahrenheit = (c) => {
    let f = Math.round(c * 1.8 + 32);
    return f;
};
const fahrenheitToCelsius = (f) => {
    let c = Math.round((f - 32) * 0.5556);
    return c;
};

document.querySelector("body").appendChild(renderApp());
