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
  e.clearSelection();
});

var htmlClipboard = new Clipboard('.copyHTML', {
  text: function(trigger) {
    return trigger.nextElementSibling.innerHTML;
  }
})

htmlClipboard.on('success', function(e) {
  e.clearSelection();
});


var allNavLinks = document.querySelectorAll('#navigation a');
for (var i = 0; i < allNavLinks.length; i++) {
  allNavLinks[i].addEventListener('click', function(e) {
    var elem = document.querySelector('#' + this.dataset.target);
    scrollIt(elem, e);
  });
}

function scrollIt(element, event) {
  event.preventDefault();

  var siteHeader = document.querySelector('.page-list');

  window.scrollTo({
    'behavior': 'smooth',
    'left': 0,
    'top': (element.offsetTop - (siteHeader.offsetHeight * 2))
  });
}