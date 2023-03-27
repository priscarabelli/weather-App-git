let now = new Date();

let dayTime = document.querySelector("li, #day-time");

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
 let day = days [now.getDay()];
 let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  };
 let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  };

 dayTime.innerHTML = `${day} ${hours}:${minutes}`;


function searchCity(city){
let apiKey = "f09d3949047ab6c9e3bcaf79cf61f619";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayWeatherSearch);
}


 function displayWeatherSearch(response){
  document.querySelector("#city-input").innerHTML = response.data.name;
  document.querySelector("#temperature-link").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
 document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
document.querySelector("#description").innerHTML = response.data.weather[0].main;
};

 
function searchSubmit(event){
  event.preventDefault();

let city = document.querySelector("#search-bar").value;
searchCity(city);
};

function searchLocation(position){
let apiKey = "f09d3949047ab6c9e3bcaf79cf61f619";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayWeatherSearch);
}


function getLocalWeather(event){
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}



let searchForm = document.querySelector("#input-form");
searchForm.addEventListener("submit", searchSubmit);

let currentLocationButton = document.querySelector("#current-button")
currentLocationButton.addEventListener("click", getLocalWeather);
searchCity("London");





 






