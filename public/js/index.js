document.querySelector('.hamburger').addEventListener('click', function() {
    document.querySelector('.navbar').classList.toggle('responsive');
});
var sticky = navbar.offsetTop;
// Seguimiento de navbar
window.addEventListener("scroll", function(){
    var navbar = document.getElementById("navbar");
    navbar.classList.toggle("sticky", this.window.scrollY > sticky);
    var seccion = document.getElementById("container");
    seccion.classList.toggle("content", this.window.scrollY > sticky);
})

//Cargar las pistas de los botones de los cards
function reservar(btn) {
    console.log('Botón Reservar clickeado');
    var deporte = btn.dataset.deporte;
    window.location.href = 'public/reserva.html?deporte=' + encodeURIComponent(deporte);
}
// Modo oscuro
document.getElementById('dark-mode-toggle').addEventListener('click', function() {
    var contenedor = document.getElementById('container');
    contenedor.classList.toggle('dark-mode');
    
    var boton = document.getElementById('dark-mode-toggle');
    if (contenedor.classList.contains('dark-mode')) {
        boton.textContent = '☀️'; // Cambia a un icono de sol en modo oscuro
    } else {
        boton.textContent = '🌙'; // Cambia a un icono de luna en modo claro
    }
});