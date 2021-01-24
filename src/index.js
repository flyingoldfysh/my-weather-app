function formatDate(now) {
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
let year = now.getFullYear();
let date = now.getDate();
let monthIndex = now.getMonth();
let months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", 
];
let month =months[monthIndex];

  let dayIndex = now.getDay();
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

  return `${day}, ${date}. ${month}., ${year} | ${hours}:${minutes}`;
}
let now = new Date();
let weekday = document.querySelector("#weekday");
weekday.innerHTML = formatDate(now);




//clean up
function displayTemperature(response) {
  let cityElement = document.querySelector("#city");
  let temperatureElement =  document.querySelector("#current-temperature");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");  

  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML=Math.round(celsiusTemperature);
  cityElement.innerHTML=response.data.name;
  descriptionElement.innerHTML=response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML=Math.round(response.data.wind.speed);
  iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
iconElement.setAttribute("alt", response.data.weather[0].description)
}


function searchCity(city) {
  let apiKey = "2a322e4fe40fcdfe735e1b428a60315f";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayTemperature);
}
function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-bar");

  let h1 = document.querySelector("h1");
  if (searchInput.value) {
    h1.innerHTML = `${searchInput.value}`;
    searchCity(searchInput.value);
  } 
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", search);


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
