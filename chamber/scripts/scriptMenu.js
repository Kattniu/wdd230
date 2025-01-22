const menuToggle = document.getElementById('menuToggle');
const menuLinks = document.getElementById('menuLinks');

menuToggle.addEventListener('click', () => {
  const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', !isExpanded);
  menuLinks.classList.toggle('show');
});
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;