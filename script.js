// date
let currentDate = new Date()
let days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]

let day = days[currentDate.getDay()]
let hours = currentDate.getHours()
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = currentDate.getMinutes()
if (minutes < 10) {
  minutes = `0${minutes}`
}

let today = document.querySelector('#today')
today.innerHTML = `${day} ${hours}:${minutes}`

// celsius and farhenheit

// function convertToFahrenheit(event) {
//   event.preventDefault();
//   currentTemperature.innerHTML = `66`;
// }
// function convertToCelsius(event) {
//   event.preventDefault();
//   currentTemperature.innerHTML = `19`
// }

// let currentTemperature = document.querySelector('#current-temperature')

// let fahrenheit = document.querySelector('#fahrenheit')
// fahrenheit.addEventListener("click", convertToFahrenheit)

// let celcius = document.querySelector('#celcius');
// celcius.addEventListener('click', convertToCelsius);



function displayWeatherCondition(response) {
  document.querySelector('#city').innerHTML = response.data.name;
  document.querySelector('#current-temperature').innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector('#humidity').innerHTML = response.data.main.humidity;
  document.querySelector('#wind').innerHTML = Math.round(
    response.data.wind.speed
  );
}

function searchCity(city) {
  let apiKey = 'ce41b28ce42cc32953b2215b8a1bd7b5';
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector('#search-input').value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = 'ce41b28ce42cc32953b2215b8a1bd7b5';
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let searchForm = document.querySelector('#search-form');
searchForm.addEventListener('submit', handleSubmit);

let currentLocationButton = document.querySelector('#location-button');
currentLocationButton.addEventListener('click', getCurrentLocation);

searchCity('Kyiv');
