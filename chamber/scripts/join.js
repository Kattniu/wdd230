 // El código dentro de esta función se ejecuta una vez que el DOM está completamente cargado
 document.addEventListener('DOMContentLoaded', function () {
    // Elementos del modal
    const dialogBox = document.querySelector("#dialogBox");
    const closeButton = document.querySelector("#closeButton");
    const dialogBoxText = dialogBox ? dialogBox.querySelector("div") : null;

    // Botones para abrir el modal
    const openButton1 = document.querySelector("#openButton1");
    const openButton2 = document.querySelector("#openButton2");
    const openButton3 = document.querySelector("#openButton3");
    const openButton4 = document.querySelector("#openButton4");

    // Aseguramos que los botones y el modal existan antes de agregar eventos
    //nos aseguramos de que estos elementos existan antes de intentar
    //asignarles eventos o manipulaciones. Si un elemento no existe, 
    //no intentaremos interactuar con él y evitaremos errores.    
    if (dialogBox && dialogBoxText && closeButton) {
        if (openButton1) {
            openButton1.addEventListener("click", () => {
                dialogBox.showModal();
                dialogBoxText.innerHTML = "Access to networking and events for non-profits at no cost.";
            });
        }
        if (openButton2) {
            openButton2.addEventListener("click", () => {
                dialogBox.showModal();  // Abre el modal
                dialogBoxText.innerHTML = "Includes basic discounts and exclusive webinars.";
            });
        }
        if (openButton3) {
            openButton3.addEventListener("click", () => {
                dialogBox.showModal();
                dialogBoxText.innerHTML = "Additional discounts and priority event access.";
            });
        }
        if (openButton4) {
            openButton4.addEventListener("click", () => {
                dialogBox.showModal();
                dialogBoxText.innerHTML = "All benefits included plus VIP event access and exclusive advertising opportunities.";
            });
        }

        closeButton.addEventListener("click", () => {
            dialogBox.close();  
        });
    }
});