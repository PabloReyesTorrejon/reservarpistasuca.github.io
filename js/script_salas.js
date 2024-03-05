// Get the offset position of the navbar
var sticky = navbar.offsetTop;

window.addEventListener("scroll", function(){
    var navbar = document.getElementById("navbar");
    navbar.classList.toggle("sticky", this.window.scrollY > sticky);
    var seccion = document.querySelector("section");
    seccion.classList.toggle("content", this.window.scrollY > sticky);
})