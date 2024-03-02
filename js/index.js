document.querySelector('.hamburger').addEventListener('click', function() {
    document.querySelector('.navbar').classList.toggle('responsive');
});
//Cargar las pistas de los botones de los cards
function reservar(btn) {
    console.log('Botón Reservar clickeado');
    var deporte = btn.dataset.deporte;
    window.location.href = 'reserva.html?deporte=' + encodeURIComponent(deporte);
}