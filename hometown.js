// Initialize Swiper.js carousel
var swiper = new Swiper('.swiper-container', {
  direction: 'horizontal',
  loop: false,
  slidesPerView: 4, // Display 'x' images in the viewport
  spaceBetween: 2, // Reduce the spacing between slides
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  allowTouchMove: false, // Disable swiping between slides
});

// Hide navigation buttons when the carousel is inactive
swiper.on('reachEnd', function () {
  $('.swiper-button-next').addClass('swiper-button-disabled');
});

swiper.on('fromEdge', function () {
  $('.swiper-button-disabled').removeClass('swiper-button-disabled');
});

// Add click handlers to the navigation buttons
$('.swiper-button-next').on('click', function () {
  swiper.slideNext();
});

$('.swiper-button-prev').on('click', function () {
  swiper.slidePrev();
});
