function searchCity(city){
let apiKey = "eab04436t3405o6e84aadcd05339dfb6";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}}&key=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayWeatherSearch);
}

function formatDate(timestamp){
  let date = new Date(timestamp);
  let hours = date.getHours();
   if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [ "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"]
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;

}

 function displayWeatherSearch(response){
celsiusTemperature =  response.data.temperature.current
document.querySelector("#city-input").innerHTML = response.data.city;
document.querySelector("#temperature-link").innerHTML = Math.round(celsiusTemperature);
document.querySelector("#humidity").innerHTML = response.data.temperature.humidity;
document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
document.querySelector("#description").innerHTML = response.data.condition.description;
document.querySelector("#current-date").innerHTML = formatDate(response.data.time * 1000);
document.querySelector("#real-feel").innerHTML = Math.round(response.data.temperature.feels_like);
document.querySelector("#big-icon").setAttribute("src" , response.data.condition.icon_url);
document.querySelector("#big-icon").setAttribute("alt" , response.data.condition.description);
};

 
function searchSubmit(event){
  event.preventDefault();

let city = document.querySelector("#search-bar").value;
searchCity(city);
};

function searchLocation(position){
let apiKey = "eab04436t3405o6e84aadcd05339dfb6";
let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${position.coords.longitude}&lat=${position.coords.latitude}&key=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayWeatherSearch);
}


function getLocalWeather(event){
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function displayFahrenheitTemp(event){
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature-link");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);

}

function displayCelsiusTemp(event){
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature-link");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click" , displayFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click" , displayCelsiusTemp);

let searchForm = document.querySelector("#input-form");
searchForm.addEventListener("submit", searchSubmit);

let currentLocationButton = document.querySelector("#current-button")
currentLocationButton.addEventListener("click", getLocalWeather);

let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", searchSubmit);


searchCity("London");

 






