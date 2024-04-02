// Get the offset position of the navbar
var sticky = navbar.offsetTop;

window.addEventListener("scroll", function(){
    var navbar = document.getElementById("navbar");
    navbar.classList.toggle("sticky", this.window.scrollY > sticky);
    var seccion = document.querySelector("main");
    seccion.classList.toggle("content", this.window.scrollY > sticky);
})

class Tarjeta {
    constructor(domNode) {
      this.rootEl = domNode;
      this.buttonEl = this.rootEl.querySelector('button[aria-expanded]');
  
      const controlsId = this.buttonEl.getAttribute('aria-controls');
      this.contentEl = document.getElementById(controlsId);
  
      this.open = this.buttonEl.getAttribute('aria-expanded') === 'true';
  
      // add event listeners
      this.buttonEl.addEventListener('click', this.onButtonClick.bind(this));
    }
  
    onButtonClick() {
      this.toggle(!this.open);
    }
  
    toggle(open) {
      // don't do anything if the open state doesn't change
      if (open === this.open) {
        return;
      }
  
      // update the internal state
      this.open = open;
  
      // handle DOM updates
      this.buttonEl.setAttribute('aria-expanded', `${open}`);
      if (open) {
        this.contentEl.removeAttribute('hidden');
      } else {
        this.contentEl.setAttribute('hidden', '');
      }
    }
  
    // Add public open and close methods for convenience
    open() {
      this.toggle(true);
    }
  
    close() {
      this.toggle(false);
    }
}

// inicializar tarjetas
const tarjetas = document.querySelectorAll('article');
tarjetas.forEach((tarjetaEl) => {
  new Tarjeta(tarjetaEl);
});

function getUserReservas(deporte){
  let myUrl = "http://localhost:8080/reservas";
  let cont = 0;
  $.ajax({
      type: "GET",
      dataType: "json",
      url: myUrl,
      success: function(data) {
          let htmlGenerado = "<table class='reservas-table'>";   
          htmlGenerado += "<tr class='reservas-table'><th>Deporte</th><th>Pista</th><th>Fecha Reserva</th><th>Hora Inicio</th><th>Hora Fin</th><th>Capacidad</th></tr>";            
          for (let i = 0; i < data.length; i++) {
            console.log(data[i].deporte);
              if(data[i].deporte == deporte){
                  cont++;
                  htmlGenerado += `<tr><td>${data[i].deporte}</td><td>${data[i].pista}</td><td>${data[i].fechaReserva}</td><td>${data[i].h_ini}</td><td>${data[i].h_fin}</td><td>${data[i].capacidad}</td></tr>`;
              }
          }
          htmlGenerado += "</table>";
          
          if(cont > 0){
            switch(deporte){
              case "Tenis":
              $("#sect1").html(htmlGenerado);
              break;
              case "Fútbol":
              $("#sect2").html(htmlGenerado);
              case "Pádel":
              $("#sect3").html(htmlGenerado);
            }
          }
          else{
              let htmlGenerado = "<p>No hay resultados</p>";
              $("#sect1").html(htmlGenerado);
          }
      },
      error: function(res) {
          console.error("ERROR:", res.status, res.statusText);
      }
  });
}
