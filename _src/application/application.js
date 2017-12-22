var menuToggle = document.querySelector('.hamburger');

menuToggle.addEventListener('click', function() {
  this.classList.toggle('is-active');
});

var clipboard = new Clipboard('#copyCSS', {
  text: function() {
    return document.querySelector('#client-theme').innerHTML;
  }
});