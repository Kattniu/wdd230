//const modeButton = document.querySelector("#mode");
//const main = document.querySelector("main");
//modeButton.addEventListener("click", () => {
//	if (modeButton.textContent.includes("😎")) {
//		main.style.background = "#000";
//		main.style.color = "#fff";
//		modeButton.textContent = "☀️";
//	} else {
//		main.style.background = "#eee";
//		main.style.color = "#000";
//		modeButton.textContent = "😎";
//	}
//});
const modeButton = document.querySelector("#mode");
const body = document.querySelector("body");

modeButton.addEventListener("click", () => {
    if (modeButton.textContent.includes("😎")) {
        body.classList.add("dark-mode");
        body.classList.remove("light-mode");
        modeButton.textContent = "☀️";
    } else {
        body.classList.add("light-mode");
        body.classList.remove("dark-mode");
        modeButton.textContent = "😎";
    }
});

const hamburgerButton = document.querySelector("#hamburger-button");
const navLinks = document.querySelector("#nav-links");

hamburgerButton.addEventListener("click", () => {
    navLinks.classList.toggle("show");
});

