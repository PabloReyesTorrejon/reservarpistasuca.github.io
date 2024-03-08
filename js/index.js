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
    window.location.href = '/html/reserva.html?deporte=' + encodeURIComponent(deporte);
}