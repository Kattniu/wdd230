document.addEventListener('DOMContentLoaded', () => {
  const apiKey = '0168a77735eeede59954db08c72d85e4';
  const lat = 45.4663; // Milán
  const lon = 9.1800;
  const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  fetch(currentWeatherUrl)
    .then(response => response.json())
    .then(updateCurrentWeather)
    .catch(error => console.error('Error obteniendo el clima actual:', error));
  fetch(forecastUrl)
    .then(response => response.json())
    .then(updateForecast)
    .catch(error => console.error('Error obteniendo el pronóstico del clima:', error));
  showMeetGreetBanner();
  loadSpotlightMembers();
});


//Actualizar datos del clima actual
function updateCurrentWeather(data) {
  document.getElementById('weather-icon').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  document.getElementById('temp').textContent = `${Math.round(data.main.temp)}°C`;
  document.getElementById('weather-description').textContent = capitalizeWeather(data.weather[0].description);
  document.getElementById('high').textContent = `${Math.round(data.main.temp_max)}°C`;
  document.getElementById('low').textContent = `${Math.round(data.main.temp_min)}°C`;
  document.getElementById('humidity').textContent = `${data.main.humidity}%`;
  document.getElementById('sunrise').textContent = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
  document.getElementById('sunset').textContent = new Date(data.sys.sunset * 1000).toLocaleTimeString();
}

//Actualizar pronóstico del clima
function updateForecast(data) {
  const dailyTemps = {};
  data.list.forEach(entry => {
    const date = entry.dt_txt.split(' ')[0]; // Extrae la fecha YYYY-MM-DD
    if (!dailyTemps[date]) {
      dailyTemps[date] = { max: -Infinity };
    }
    dailyTemps[date].max = Math.max(dailyTemps[date].max, entry.main.temp);
  });
  const forecastDays = Object.values(dailyTemps);
  
  // Validar si hay suficientes datos antes de asignar valores
  if (forecastDays.length >= 3) {
    document.getElementById('forecast-today').textContent = `${Math.round(forecastDays[0].max)}°C`;
    document.getElementById('forecast-wed').textContent = `${Math.round(forecastDays[1].max)}°C`;
    document.getElementById('forecast-thu').textContent = `${Math.round(forecastDays[2].max)}°C`;
  }
}
function capitalizeWeather(description) {
  return description
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
function showMeetGreetBanner() {
  const today = new Date().getDay(); // 1 = Lunes, 2 = Martes, 3 = Miércoles
  if (today >= 1 && today <= 3) {
    const banner = document.createElement('div');
    banner.id = 'meet-greet-banner';
    banner.innerHTML = `
      <p>Join us for our Chamber Meet & Greet on Wednesday at 7:00 p.m.! <button id="close-banner">❌</button></p>
    `;
    banner.style.cssText = "background: yellow; text-align: center; padding: 10px; font-weight: bold;";
    document.body.prepend(banner);
    document.getElementById('close-banner').addEventListener('click', () => {
      banner.style.display = 'none';
    });
  } 
}
// Cargar anuncios 'Spotlight' de los miembros
function loadSpotlightMembers() {
  fetch('data/members.json')  //
    .then(response => response.json())
    .then(data => {
      const eligibleMembers = data.members.filter(member =>
        member.membershipLevel === 'Gold' || member.membershipLevel === 'Silver'
      );
      const selectedMembers = shuffleArray(eligibleMembers).slice(0, 2); // Selecciona 2 al azar
      const spotlightContainer = document.getElementById('spotlight-container');
      spotlightContainer.innerHTML = '';
      selectedMembers.forEach(member => {
        const memberDiv = document.createElement('div');
        memberDiv.classList.add('spotlight-member');
        memberDiv.innerHTML = `
          <img src="${member.imageUrl}" alt="${member.name}" style="max-width: 100px; border-radius: 50%;">
          <h3>${member.name}</h3>
          <p>${member.description}</p>
          <a href="${member.website}" target="_blank">Visit Website</a>
        `;
        spotlightContainer.appendChild(memberDiv);
      });
    })
    .catch(error => console.error('Error cargando miembros:', error));
}
// Función para mezclar aleatoriamente una lista
function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}
