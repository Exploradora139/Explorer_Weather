function searchWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");

  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = FormDate(date);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = "${response.data.temperature.humidity}%";
  windSpeedElement.innerHTML = "${response.data.wind.speed}mph";
  temperatureElement.innerHTML = Math.round(temperature);
  iconElement.innerHTML =
    '<img="${response.data.condition.icon-url}" class="weather-app-icon"\>';
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = "0${minutes}";
  }

  return "${day} ${hours}: ${minutes}";
}

function searchCity(city) {
  let apiKey = "36399t92b73b5o4fa0b8a2cb798d68aa";
  let apiUrl =
    "https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial";
  axios.get(apiUrl).then(searchWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");

  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Mexico City");
