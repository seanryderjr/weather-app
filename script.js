

const apiKey = 'bce95313653248109f7230238230804';
const form = document.querySelector('form');
const addressInput = form.querySelector('input[name="address"]');
const locationBtn = form.querySelector('.location');
const submitBtn = form.querySelector('.submit');
const weatherContainer = document.createElement('div');

form.addEventListener('submit', e => {
  e.preventDefault();
  const zipCode = addressInput.value;
  if (zipCode.length !== 5 || isNaN(zipCode)) {
    alert('Please enter a valid 5-digit zip code');
    return;
  }
  getWeather(zipCode);
});

function getWeather(zipCode) {
  const currentWeatherUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${zipCode}`;
  const forecastUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${zipCode}&days=3`;

  Promise.all([
    fetch(currentWeatherUrl),
    fetch(forecastUrl)
  ])
  .then(responses => Promise.all(responses.map(response => response.json())))
  .then(data => {
    const [currentWeather, forecast] = data;
    displayWeather(currentWeather, forecast);
  })
  .catch(err => console.error(err));
}

function displayWeather(currentWeather, forecast) {
  weatherContainer.innerHTML = `
    <h2>Current Weather</h2>
    <p>Location: ${currentWeather.location.name}, ${currentWeather.location.region}, ${currentWeather.location.country}</p>
    <p>Temperature: ${currentWeather.current.temp_f} &#8457;</p>
    <p>Condition: ${currentWeather.current.condition.text}</p>
    <h2>Forecast</h2>
    ${forecast.forecast.forecastday.map(day => `
      <div>
        <h3>${day.date}</h3>
        <p>High: ${day.day.maxtemp_f} &#8457;</p>
        <p>Low: ${day.day.mintemp_f} &#8457;</p>
        <p>Condition: ${day.day.condition.text}</p>
      </div>
    `).join('')}
  `;
  form.appendChild(weatherContainer);
}






