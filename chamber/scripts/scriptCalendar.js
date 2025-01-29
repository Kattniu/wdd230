// Obtener la fecha actual
const today = new Date().getTime();

// Recuperar la última visita desde localStorage
const lastVisit = localStorage.getItem("lastVisit");

// Seleccionar el contenedor para el mensaje
const visitMessage = document.getElementById("visit-message");

if (lastVisit) {
    const daysPassed = Math.floor((today - lastVisit) / (1000 * 60 * 60 * 24));

    if (daysPassed < 1) {
        visitMessage.textContent = "You've come back so soon! Awesome!🫡";
    } else if (daysPassed === 1) {
        visitMessage.textContent ="Your last visit was 1 day ago.😉";
    } else {
        visitMessage.textContent = `Your last visit was ${daysPassed} days ago.😊`;
    }
} else {
    visitMessage.textContent ="Welcome! Let us know if you have any questions.😁";
}

// Guardar la fecha actual como la última visita
localStorage.setItem("lastVisit", today);


//calendario
let currentDate = new Date();
  
function renderCalendar(date) {
    let month = date.getMonth();
    let year = date.getFullYear();
    let firstDay = new Date(year, month, 1).getDay();
    let daysInMonth = new Date(year, month + 1, 0).getDate();

    document.getElementById("monthYear").textContent = 
        date.toLocaleString("default", { month: "long", year: "numeric" });

    let tbody = document.getElementById("calendar-body");
    tbody.innerHTML = "";

    let row = document.createElement("tr");
    for (let i = 0; i < firstDay; i++) {
        row.appendChild(document.createElement("td"));
    }

    for (let day = 1; day <= daysInMonth; day++) {
        let cell = document.createElement("td");
        cell.textContent = day;
        if (day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear()) {
            cell.classList.add("today");
        }
        row.appendChild(cell);

        if ((firstDay + day) % 7 === 0) {
            tbody.appendChild(row);
            row = document.createElement("tr");
        }
    }
    tbody.appendChild(row);
}

function prevMonth() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar(currentDate);
}

function nextMonth() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar(currentDate);
}

document.addEventListener("DOMContentLoaded", () => renderCalendar(currentDate));
