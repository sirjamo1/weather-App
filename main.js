const renderApp = () => {
    const mainContainer = document.createElement("div");
    mainContainer.id = "main-container";
    mainContainer.appendChild(renderForm());
    mainContainer.appendChild(renderWeatherCard());
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
    searchButton.addEventListener('click', (e) => {
     getData();
    e.preventDefault();
    })

    formContainer.appendChild(searchButton);

    return formContainer;
};
// https://api.openweathermap.org/data/2.5/weather?q=brisbane&appid=9f22446b3c7684227930790425851744
const renderWeatherCard = () => {
    const weatherCard = document.createElement("div");
    weatherCard.id = "weather-card";
    const location = document.createElement("h3");
    location.innerHTML = `London`;
    weatherCard.appendChild(location);
    const tempContainer = document.createElement("div");
    tempContainer.id = "temp-container";
    const temp = document.createElement("p");
    temp.innerHTML = `Temp : `;
    temp.id = "temp";
    tempContainer.appendChild(temp);
    const minTemp = document.createElement("p");
    minTemp.innerHTML = `Min-temp : `;
    minTemp.id = "min-temp";
    tempContainer.appendChild(minTemp);
    const maxTemp = document.createElement("p");
    maxTemp.innerHTML = `Max-temp : `;
    maxTemp.id = "max-temp";
    tempContainer.appendChild(maxTemp);
    const feelsLike = document.createElement("p");
    feelsLike.innerHTML = `Feels like : `;
    feelsLike.id = "feels-like";
    tempContainer.appendChild(feelsLike);
    weatherCard.appendChild(tempContainer);

    return weatherCard;
};

const getData = async () => {
 let location = document.getElementById('location').value;
  try {
   const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=9f22446b3c7684227930790425851744`, {mode: 'cors'});
   const weatherData = await response.json();
   console.log(weatherData)
  } catch(err) {
   console.log(err)
  }

}
document.querySelector("body").appendChild(renderApp());
