function formatDate(date) {
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}
let now = new Date();
let weekday = document.querySelector("#weekday");
weekday.innerHTML = formatDate(now);

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-bar");

  let h1 = document.querySelector("h1");
  if (searchInput.value) {
    h1.innerHTML = `${searchInput.value}`;
    searchCity(searchInput.value);
  } else {
    h1.innerHTML = null;
    h1.innerHTML = `Please enter a city`;
  }
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

// HW5
function searchCity(city) {
  let apiKey = "2a322e4fe40fcdfe735e1b428a60315f";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayTemperature);
}

function displayTemperature(response) {
document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#current-temperature").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}
searchCity("Canggu");

//Bonus

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "2a322e4fe40fcdfe735e1b428a60315f";
  let units = "metric";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiURL).then(displayTemperature);
}

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getLocation);

// function displayFahrenheit(event) {
// event.preventDefault();
// let convertFahrenheit = document.querySelector("#current-temperature");
// let tempFahrenheit = "37";
// convertFahrenheit.innerHTML = tempFahrenheit;
// }
// let fahrenheit = document.querySelector("#fahrenheit");
// fahrenheit.addEventListener("click", displayFahrenheit);

// function displayCelcius(event) {
// event.preventDefault();
// let convertCelsius = document.querySelector("#current-temperature");
// let tempCelsius = "3";
// convertCelsius.innerHTML = tempCelsius;
// }

// let celsius = document.querySelector("#celsius");
// celsius.addEventListener("click", displayCelcius);
