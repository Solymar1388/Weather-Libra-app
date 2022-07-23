function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  let day = days[date.getDay()];

  return `${day}, ${hours}:${minutes}`;
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector('#temperature');
  let cityElement = document.querySelector('#city');
  let descriptionElement = document.querySelector('#description');
  let humidityElement = document.querySelector('#humidity');
  let windElement = document.querySelector('#wind');
  let dateElement = document.querySelector('#date');
  let iconElement = document.querySelector('#icon');

  celciusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    'src',
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute('alt', response.data.weather[0].description);
}

function search(city) {
  let apiKey = 'ce41b28ce42cc32953b2215b8a1bd7b5';
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector('#city-input');
  search(cityInputElement.value);
}

function showFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector('#temperature');
  celciusLink.classList.remove('active');
  fahrenheitLink.classList.add('active');
  let fahrenheitTemperature = (celciusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function showCelciusTemperature(event) {
  event.preventDefault();
  celciusLink.classList.add('active');
  fahrenheitLink.classList.remove('active');
  let temperatureElement = document.querySelector('#temperature');
  temperatureElement.innerHTML = Math.round(celciusTemperature);
}

function searchLocation(position) {
  let apiKey = 'ce41b28ce42cc32953b2215b8a1bd7b5';
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
  console.log(searchLocation);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let celciusTemperature = null;

let form = document.querySelector('#search-form');
form.addEventListener('submit', handleSubmit);

let fahrenheitLink = document.querySelector('#fahrenheit-link');
fahrenheitLink.addEventListener('click', showFahrenheitTemperature);

let celciusLink = document.querySelector('#celcius-link');
celciusLink.addEventListener('click', showCelciusTemperature);

let currentLocationButton = document.querySelector('#location-button');
currentLocationButton.addEventListener('click', getCurrentLocation);

search('Kyiv');