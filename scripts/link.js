const linksURL = "data/links.json";
console.log("links.js está cargado correctamente.");

async function getLinks() {
    const response = await fetch(linksURL);
    const data = await response.json();
    displayLinks(data.weeks);
}

function displayLinks(weeks) {
    const container = document.getElementById("activity-links");
    container.innerHTML = ""; // Limpia el contenido previo

    weeks.forEach(week => {
        const section = document.createElement("section");
        const heading = document.createElement("h3");
        heading.textContent = week.week;
        
        const list = document.createElement("ul");
        week.links.forEach(link => {
            const listItem = document.createElement("li");
            const anchor = document.createElement("a");
            anchor.href = link.url;
            anchor.textContent = link.title;
            listItem.appendChild(anchor);
            list.appendChild(listItem);
        });

        section.appendChild(heading);
        section.appendChild(list);
        container.appendChild(section);
    });
}

getLinks();

