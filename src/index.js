function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[date.getDay()];
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}`;
}

function displayForecast (response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast")
  let forecastHTML =`<div class = "row">`;
  let dayss = ["Thu", "Fri", "Sat", "Sun","Mon"];
  dayss.forEach(function(day){
      forecastHTML=  forecastHTML + `
  
  <div class="col-2">
      <div class="weather-forecast-date"> ${day} </div>
     
      <img 
          src=" http://openweathermap.org/img/wn/03n@2x.png"
          alt=""
          width="25"
      />
      <div class="weather-forecast-temperatures" >
          <span class="weather-forecast-temperature-max"> 18°</span> 
          <span class="weather-forecast-temperature-min"> 12°</span> 
      </div>
    </div> 
    `;
  });

  forecastHTML = forecastHTML +`</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "7f5a3748cbe33e0ca87d6a6fcae64515";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

let now = new Date();
let currentTime = document.querySelector("#time");
currentTime.innerHTML = formatDate(now);



function yourPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "7f5a3748cbe33e0ca87d6a6fcae64515";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(nowWeather);
}
function showPosition(position) {
  navigator.geolocation.getCurrentPosition(yourPosition);
}
let locationButton = document.querySelector("#geoButton");
locationButton.addEventListener("click", showPosition);
searchCity("Kyiv");

//displayForecast();

function submitCity(event) {
  event.preventDefault();
  let city = document.querySelector("#yourLocation").value;
  searchCity(city);
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", submitCity);

function nowWeather(response) {
  let city = response.data.name;
  let yourCity = document.querySelector("#current-city");
  let descriptionElement = document.querySelector("#description");
   let temperature = Math.round(response.data.main.temp);
  let tempNow = document.querySelector("#temp-value");
  let wind = Math.round(response.data.wind.speed);
  let windNow = document.querySelector("#wind");
  let humidity = response.data.main.humidity;
  let humidityNow = document.querySelector("#humidity");
  let iconElement = document.querySelector("#icon");
  
  celsiusTemperature = response.data.main.temp;

   yourCity.innerHTML = city;
  descriptionElement.innerHTML=response.data.weather[0].description;
   tempNow.innerHTML = temperature;
 windNow.innerHTML = wind;
humidityNow.innerHTML = humidity;
iconElement.setAttribute(
  "src",
  `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
);
iconElement.setAttribute("alt", response.data.weather[0].description);

getForecast(response.data.coord);
}



function searchCity(city) {
  let apiKey = "7f5a3748cbe33e0ca87d6a6fcae64515";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(nowWeather);
}


function displayFarenheitTemperature(event) {
  event.preventDefault();
  let farenheitTemperature = (celsiusTemperature*9)/5+32;
 celsiusLink.classList.remove("active");
 farenheitLink.classList.add("active");
  let temperatureElement = document.querySelector("#temp-value");
  temperatureElement.innerHTML=Math.round(farenheitTemperature);
}
function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
 farenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temp-value");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let farenheitLink = document.querySelector("#farenheit-link");
farenheitLink.addEventListener("click", displayFarenheitTemperature); 

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature); 
