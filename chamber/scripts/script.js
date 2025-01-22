document.addEventListener('DOMContentLoaded', () => {
  const apiKey = '0168a77735eeede59954db08c72d85e4'; // Mi clave API
  const lat = 45.466293566990814; // Coordenadas de Lima
  const lon = 9.180048190781868;
  const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  // Obtener clima actual
  fetch(currentWeatherUrl)
      .then(response => response.json())
      .then(updateCurrentWeather)
      .catch(error => {
          console.error('Error al obtener el clima actual:', error);
          document.getElementById('weather-description').textContent = 'Error al cargar el clima';
      });

  // Obtener pronóstico
  fetch(forecastUrl)
      .then(response => response.json())
      .then(updateForecast)
      .catch(error => {
          console.error('Error al obtener el pronóstico del clima:', error);
      });
});

// Actualizar datos del clima actual
function updateCurrentWeather(data) {
  const iconElement = document.getElementById('weather-icon');
  const temperatureElement = document.getElementById('temp');
  const conditionElement = document.getElementById('weather-description');
  const highElement = document.getElementById('high');
  const lowElement = document.getElementById('low');
  const humidityElement = document.getElementById('humidity');
  const sunriseElement = document.getElementById('sunrise');
  const sunsetElement = document.getElementById('sunset');

  iconElement.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
  conditionElement.textContent = capitalizeWeather(data.weather[0].description);
  highElement.textContent = `${Math.round(data.main.temp_max)}°C`;
  lowElement.textContent = `${Math.round(data.main.temp_min)}°C`;
  humidityElement.textContent = `${data.main.humidity}%`;
  sunriseElement.textContent = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
  sunsetElement.textContent = new Date(data.sys.sunset * 1000).toLocaleTimeString();
}

// Actualizar pronóstico del clima
function updateForecast(data) {
  const todayElement = document.getElementById('forecast-today');
  const tomorrowElement = document.getElementById('forecast-wed');
  const afterTomorrowElement = document.getElementById('forecast-thu');

  todayElement.textContent = `${Math.round(data.list[0].main.temp)}°C`;
  tomorrowElement.textContent = `${Math.round(data.list[8].main.temp)}°C`; // Pronóstico para mañana (8 intervalos de 3 horas)
  afterTomorrowElement.textContent = `${Math.round(data.list[16].main.temp)}°C`; // Pasado mañana
}

// Capitalizar la descripción del clima
function capitalizeWeather(description) {
  return description
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
}
  //¿Por qué es importante apiFetch()? Esta función es el corazón de la interacción con la API. 
  //Si no tienes esta función, nunca podrías obtener los datos de OpenWeatherMap. 
  //Esencialmente, está comunicándose con el servidor para obtener información.
  apiFetch();


  // 4 la funcion displayResults

  //¿Qué hace esta función? Esta función se encarga de tomar los datos obtenidos de la API 
  //y mostrar esos datos en la página web. Está trabajando directamente con los elementos HTML 
  //que seleccionamos al principio (currentTemp, weatherIcon, captionDesc).
  function displayResults(data) {
    currentTemp.innerHTML = `${data.main.temp}&deg;C`; // Muestra la temperatura
  
    //nos da un código que representa el ícono del clima.
    // Lo usamos para crear una URL que apunte a la imagen adecuada del clima.
    //El @2x es una versión de mayor resolución de la imagen.
    const iconSrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`; 
    const desc = data.weather[0].description; // Obtiene la descripción del clima
  

    //Aquí le decimos a la imagen (con id #weather-icon) que use la URL del ícono que creamos.
    weatherIcon.setAttribute('src', iconSrc); 

    //Establece el texto alternativo para la imagen del clima. Esto es útil para accesibilidad 
    //y también si la imagen no se puede cargar.
    weatherIcon.setAttribute('alt', desc);

    //Finalmente, la descripción del clima 
    //(por ejemplo, "Cielo nublado") se coloca en el <figcaption>.
    captionDesc.textContent = desc; 
  }
  
  //¿Por qué es importante displayResults()? Si no usáramos esta función, 
  //los datos obtenidos de la API no se mostrarían en la página web. Es crucial 
  //para actualizar dinámicamente la información de la página con los datos obtenidos de la AP