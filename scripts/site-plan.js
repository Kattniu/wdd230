// Obtener el año actual y ponerlo en el pie de página
document.getElementById('current-year').textContent = new Date().getFullYear();

// Obtener la fecha de la última modificación y mostrarla en el pie de página
//Aquí, queremos conservar parte del texto existente: "Last modified: ".
//Al usar +=, no reemplazamos este texto; en lugar de eso, le añadimos dinámicamente el valor de document.lastModified.
document.getElementById('lastModified').textContent += document.lastModified;