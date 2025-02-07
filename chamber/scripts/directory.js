// Ruta al archivo JSON
const url = './data/members.json';

// Función para obtener datos del JSON
async function getMembersData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    const data = await response.json();
    // Se espera que el JSON tenga una propiedad "members" que sea un array
    displayMembers(data.members);
  } catch (error) {
    console.error("Error al obtener los datos:", error);
  }
}

// Función para mostrar los miembros en el DOM
function displayMembers(members) {
  const display = document.querySelector("#cards");
  display.innerHTML = ""; // Limpiar el contenedor
  
  members.forEach(member => {
    // Crear elementos para la tarjeta del miembro
    const card = document.createElement("section");
    card.classList.add("card");

    // Nombre de la compañía
    const companyName = document.createElement("h2");
    companyName.textContent = member.name;

    // Imagen / ícono del miembro
    const portrait = document.createElement("img");
    portrait.setAttribute("src", member.imageUrl);
    portrait.setAttribute("alt", `Logo de ${member.name}`);
    portrait.setAttribute("loading", "lazy");
    portrait.setAttribute("width", "100");
    portrait.setAttribute("height", "100");

    // Dirección
    const address = document.createElement("p");
    address.textContent = member.address;

    // Teléfono
    const phoneNumber = document.createElement("p");
    phoneNumber.textContent = member.phone;

    // Sitio web
    const website = document.createElement("a");
    website.setAttribute("href", member.website);
    website.setAttribute("target", "_blank");
    website.textContent = "Sitio web";

    // Agregar elementos a la tarjeta
    card.appendChild(companyName);
    card.appendChild(portrait);
    card.appendChild(address);
    card.appendChild(phoneNumber);
    card.appendChild(website);

    // Puedes agregar otros elementos (por ejemplo, descripción o nivel de membresía) si lo deseas:
    const description = document.createElement("p");
    description.textContent = member.description;
    card.appendChild(description);
    
    // Agregar la tarjeta al contenedor principal
    display.appendChild(card);
  });
}

// Configuración de los botones de cambio de vista y carga inicial de datos
document.addEventListener('DOMContentLoaded', () => {
  const gridbutton = document.querySelector("#grid");
  const listbutton = document.querySelector("#list");
  const display = document.querySelector("#cards");

  if (gridbutton && listbutton && display) {
    // Vista Grid
    gridbutton.addEventListener("click", () => {
      display.classList.add("grid");
      display.classList.remove("list");
    });

    // Vista Lista
    listbutton.addEventListener("click", () => {
      display.classList.add("list");
      display.classList.remove("grid");
    });
  } else {
    console.error("No se encontraron los elementos necesarios (botones o contenedor).");
  }
  
  // Cargar datos del JSON
  getMembersData(url);
});
