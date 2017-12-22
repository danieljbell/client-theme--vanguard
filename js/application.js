var menuToggle = document.querySelector('.hamburger');

menuToggle.addEventListener('click', function() {
  this.classList.toggle('is-active');
});

var cssClipboard = new Clipboard('#copyCSS', {
  text: function() {
    return document.querySelector('#client-theme').innerHTML;
  }
});

cssClipboard.on('success', function(e) {
  e.trigger.innerHTML = "Copied!";
  e.clearSelection();
});

var htmlClipboard = new Clipboard('.copyHTML', {
  text: function(trigger) {
    return trigger.nextElementSibling.innerHTML;
  }
})

htmlClipboard.on('success', function(e) {
  e.trigger.innerHTML = "Copied!";
  e.clearSelection();
});