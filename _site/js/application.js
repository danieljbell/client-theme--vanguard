var menuToggle = document.querySelector('.hamburger');

menuToggle.addEventListener('click', function() {
  this.classList.toggle('is-active');
});

var clipboard = new Clipboard('#copyCSS', {
  text: function() {
    return document.querySelector('#client-theme').innerHTML;
  }
});

clipboard.on('success', function(e) {
    console.info('Action:', e.action);
    console.info('Text:', e.text);
    console.info('Trigger:', e.trigger);

    e.clearSelection();
});