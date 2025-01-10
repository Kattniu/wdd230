// Obtener el año actual y ponerlo en el pie de página
document.getElementById('current-year').textContent = new Date().getFullYear();

// Obtener la fecha de la última modificación y mostrarla en el pie de página
//Aquí, queremos conservar parte del texto existente: "Last modified: ".
//Al usar +=, no reemplazamos este texto; en lugar de eso, le añadimos dinámicamente el valor de document.lastModified.
document.getElementById('lastModified').textContent += document.lastModified;

// Función principal para obtener los datos del clima
document.addEventListener('DOMContentLoaded', async () => {
    const apiKey = '0168a77735eeede59954db08c72d85e4'; // Mi clave API
    const lat = 45.464637175261366; // Coordenadas de Milán
    const lon = 9.188993400662007;
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    try {
        const currentWeatherResponse = await fetch(currentWeatherUrl);
        const currentWeatherData = await currentWeatherResponse.json();
        updateCurrentWeather(currentWeatherData);

        const forecastResponse = await fetch(forecastUrl);
        const forecastData = await forecastResponse.json();
        updateForecast(forecastData);
    } catch (error) {
        console.error('Error al obtener los datos del clima:', error);
        document.getElementById('weather-description').textContent = 'Error al cargar el clima';
    }
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
    iconElement.alt = `Clima: ${data.weather[0].description}`;
    temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
    conditionElement.textContent = capitalizeWeather(data.weather[0].description);
    highElement.textContent = `${Math.round(data.main.temp_max)}°C`;
    lowElement.textContent = `${Math.round(data.main.temp_min)}°C`;
    humidityElement.textContent = `${data.main.humidity}%`;

    const formatter = new Intl.DateTimeFormat('es-PE', { hour: '2-digit', minute: '2-digit' });
    sunriseElement.textContent = formatter.format(new Date(data.sys.sunrise * 1000));
    sunsetElement.textContent = formatter.format(new Date(data.sys.sunset * 1000));
}

// Actualizar pronóstico del clima
function updateForecast(data) {
    const todayElement = document.getElementById('forecast-today');
    const tomorrowElement = document.getElementById('forecast-wed');
    const afterTomorrowElement = document.getElementById('forecast-thu');

    if (data.list[0]) {
        todayElement.textContent = `${Math.round(data.list[0].main.temp)}°C`;
    }
    if (data.list[8]) {
        tomorrowElement.textContent = `${Math.round(data.list[8].main.temp)}°C`;
    }
    if (data.list[16]) {
        afterTomorrowElement.textContent = `${Math.round(data.list[16].main.temp)}°C`;
    }
}

// Capitalizar la descripción del clima
function capitalizeWeather(description) {
    return description
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}