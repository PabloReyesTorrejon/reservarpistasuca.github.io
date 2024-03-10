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