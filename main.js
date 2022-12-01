const renderApp = () => {
    const mainContainer = document.createElement("div");
    mainContainer.id = "main-container";
    mainContainer.appendChild(renderForm());
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
    const submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.innerHTML = "Search";
    formContainer.appendChild(submitButton);

    return formContainer;
};

const renderWeatherCard = () => {
    const weatherCard = document.createElement("div");
    weatherCard.id = "weather-card";
    const location = document.createElement("h3");
    location.innerHTML = "London";
    weatherCard.appendChild(location);

    return weatherCard;
};

document.querySelector("body").appendChild(renderApp());
