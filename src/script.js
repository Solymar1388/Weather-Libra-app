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
  let months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  let currentMonth = months[date.getMonth()];
  let currentYear = date.getFullYear();
  let currentDate = date.getDate();

  return `${day}, ${currentDate} ${currentMonth} ${currentYear}, ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return days[day];
}

function showWeatherIcon(iconNumber) {
  let weatherIconDictionary = {
    '01d': '01d.svg',
    '01n': '01n.svg',
    '02d': '02d.svg',
    '02n': '02n.svg',
    '03d': '03d.svg',
    '03n': '03n.svg',
    '04d': '04d.svg',
    '04n': '04n.svg',
    '09d': '09d.svg',
    '09n': '09n.svg',
    '10d': '10d.svg',
    '10n': '10n.svg',
    '11d': '11d.svg',
    '11n': '11n.svg',
    '13d': '13d.svg',
    '13n': '13n.png',
    '50d': '50d.svg',
    '50n': '50n.png',
  };
  let weatherIcon = weatherIconDictionary[iconNumber];
  return weatherIcon;
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector('#forecast');
  let forecastHTML = `<div class="row d-flex justify-content-center">`;
    forecast.forEach(function (forecastDay, index) {
      if (index < 6) {
        forecastHTML =
          forecastHTML +
          `
              <div class="col shadow p-2 m-1 flex-wrap weather-card">
                  <div class="weather-forecast-date fw-bolder ">
                  ${formatDay(forecastDay.dt)}
                  </div>
                    <img src="img/${showWeatherIcon(
                      forecastDay.weather[0].icon
                    )}" alt="" width="64">
                  <div class="weather-forecast-temperatures">
                      <span class="weather-forecast-temperature-max fw-bold">${Math.round(
                        forecastDay.temp.max
                      )}°</span>
                      <span class="weather-forecast-temperature-min text-muted">${Math.round(
                        forecastDay.temp.min
                      )}°</span>     
                  </div>
              </div>
          `;
      }
    });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  forecastTemp = forecast;
}

function getForecast(coordinates) {
  let apiKey = 'ce41b28ce42cc32953b2215b8a1bd7b5';
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector('#temperature');
  let cityElement = document.querySelector('#city');
  let countryElement = document.querySelector('#country');
  let descriptionElement = document.querySelector('#description');
  let humidityElement = document.querySelector('#humidity');
  let windElement = document.querySelector('#wind');
  let dateElement = document.querySelector('#date');
  let iconElement = document.querySelector('#icon');

  celciusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  countryElement.innerHTML = response.data.sys.country;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute('src', `img/${response.data.weather[0].icon}.svg`);
  iconElement.setAttribute('alt', response.data.weather[0].description);

  getForecast(response.data.coord);
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
  let forecastMax = document.getElementsByClassName(
    'weather-forecast-temperature-max'
  );
  let forecastMin = document.getElementsByClassName(
    'weather-forecast-temperature-min'
  );

  for (i = 0; i < 7; i++) {
    forecastMin[i].innerHTML = `${Math.round(
      (forecastTemp[i].temp.min * 9) / 5 + 32
    )}°`;
    forecastMax[i].innerHTML = `${Math.round(
      (forecastTemp[i].temp.max * 9) / 5 + 32
    )}°`;
  }
}

function showCelciusTemperature(event) {
  event.preventDefault();
  celciusLink.classList.add('active');
  fahrenheitLink.classList.remove('active');
  let temperatureElement = document.querySelector('#temperature');
  temperatureElement.innerHTML = Math.round(celciusTemperature);
  let forecastMin = document.getElementsByClassName(
    'weather-forecast-temperature-min'
  );
  let forecastMax = document.getElementsByClassName(
    'weather-forecast-temperature-max'
  );

  for (i = 0; i < 7; i++) {
    forecastMin[i].innerHTML = `${Math.round(forecastTemp[i].temp.min)}°`;
    forecastMax[i].innerHTML = `${Math.round(forecastTemp[i].temp.max)}°`;
  }
}

function searchLocation(position) {
  let apiKey = 'ce41b28ce42cc32953b2215b8a1bd7b5';
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let celciusTemperature = null;
let forecastTemp = [];

let form = document.querySelector('#search-form');
form.addEventListener('submit', handleSubmit);

let fahrenheitLink = document.querySelector('#fahrenheit-link');
fahrenheitLink.addEventListener('click', showFahrenheitTemperature);

let celciusLink = document.querySelector('#celcius-link');
celciusLink.addEventListener('click', showCelciusTemperature);

let currentLocationButton = document.querySelector('#location-button');
currentLocationButton.addEventListener('click', getCurrentLocation);

search('Kyiv');
