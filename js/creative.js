(function($) {
  'use strict'; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (
      location.pathname.replace(/^\//, '') ==
        this.pathname.replace(/^\//, '') &&
      location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate(
          {
            scrollTop: target.offset().top - 56
          },
          1000,
          'easeInOutExpo'
        );
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 57
  });

  // Collapse Navbar
  var navbarCollapse = function() {
    if ($('#mainNav').offset().top > 100) {
      $('#mainNav').addClass('navbar-shrink');
    } else if (window.location.href.includes('featured-on')) {
      $('#mainNav').addClass('navbar-shrink');
    } else {
      $('#mainNav').removeClass('navbar-shrink');
    }
  };
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);

  // Scroll reveal calls
  window.sr = ScrollReveal();

  sr.reveal('.sr-icon-1', {
    delay: 200,
    scale: 0
  });
  sr.reveal('.sr-icon-2', {
    delay: 400,
    scale: 0
  });
  sr.reveal('.sr-icon-3', {
    delay: 600,
    scale: 0
  });
  sr.reveal('.sr-icon-4', {
    delay: 800,
    scale: 0
  });
  sr.reveal('.sr-button', {
    delay: 200,
    distance: '15px',
    origin: 'bottom',
    scale: 0.8
  });
  sr.reveal('.sr-contact-1', {
    delay: 200,
    scale: 0
  });
  sr.reveal('.sr-contact-2', {
    delay: 400,
    scale: 0
  });

  // Magnific popup calls
  $('.popup-gallery').magnificPopup({
    delegate: 'a',
    type: 'image',
    tLoading: 'Loading image #%curr%...',
    mainClass: 'mfp-img-mobile',
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0, 1]
    },
    image: {
      tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
    }
  });
})(jQuery); // End of use strict

// custom js

// type writer effect
const TypeWriter = function(txtElement, words, wait) {
  this.txtElement = txtElement;
  this.words = words;
  this.txt = 'A Corporate Drop-Out';
  this.wordIndex = 0;
  this.wait = parseInt(wait, 10);
  this.type();
  this.isDeleting = false;
};

// type method
TypeWriter.prototype.type = function() {
  // current word index
  const current = this.wordIndex % this.words.length;
  // get full text of current word
  const fullTxt = this.words[current];

  // check if deleting
  if (this.isDeleting) {
    // remove char
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    // add char
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  // insert txt into dom
  this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

  //  initial type speed
  let typeSpeed = 200;

  if (this.isDeleting) {
    typeSpeed /= 2;
  }

  // if words if complete
  if (!this.isDeleting && this.txt === fullTxt) {
    // makes pause at end
    typeSpeed = this.wait;
    // set deleting to true
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    // move to next word
    this.wordIndex++;
    typeSpeed = 500;
  }

  setTimeout(() => this.type(), typeSpeed);
};

// init on dom load
window.addEventListener('load', init);

// init
function init() {
  const txtElement = document.querySelector('.text-type');
  const words = JSON.parse(txtElement.getAttribute('data-words'));
  const wait = txtElement.getAttribute('data-wait');

  // init type writer
  new TypeWriter(txtElement, words, wait);
}

// if (
//   window.location.pathname === '/' ||
//   window.location.pathname === '/index.html'
// ) {
//   $(window).on('load', function() {
//     $('.lazyload').each(function() {
//       //* set the img src from data-src
//       $(this).attr('src', $(this).attr('data-src'));
//     });
//   });
// }
