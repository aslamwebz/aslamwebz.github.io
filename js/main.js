(function ($) {
  "use strict"; // Start of use strict

  $(document).ready(function () {
    $(window).on("scroll", function () {
      if ($(window).scrollTop() >= 20) {
        $(".navbar").addClass("compressed");
      } else {
        $(".navbar").removeClass("compressed");
      }
    });
  });

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('#sidebar-wrapper .js-scroll-trigger').click(function () {
    $("#sidebar-wrapper").removeClass("active");
    $(".menu-toggle").removeClass("active");
    $(".menu-toggle > .fa-bars, .menu-toggle > .fa-times").toggleClass("fa-bars fa-times");
  });

  // Scroll to top button appear
  $(document).scroll(function () {
    var scrollDistance = $(this).scrollTop();
    if (scrollDistance > 100) {
      $('.scroll-to-top').fadeIn();
    } else {
      $('.scroll-to-top').fadeOut();
    }
  });

  if ($('.text-slider').length == 1) {
    var typed_strings = $('.text-slider-items').text();
    var typed = new Typed('.text-slider', {
      strings: typed_strings.split(','),
      typeSpeed: 80,
      loop: true,
      backDelay: 1100,
      backSpeed: 30
    });
  }

})(jQuery); // End of use strict

// Disable Google Maps scrolling
// See http://stackoverflow.com/a/25904582/1607849
// Disable scroll zooming and bind back the click event
var onMapMouseleaveHandler = function (event) {
  var that = $(this);
  that.on('click', onMapClickHandler);
  that.off('mouseleave', onMapMouseleaveHandler);
  that.find('iframe').css("pointer-events", "none");
}
var onMapClickHandler = function (event) {
  var that = $(this);
  // Disable the click handler until the user leaves the map area
  that.off('click', onMapClickHandler);
  // Enable scrolling zoom
  that.find('iframe').css("pointer-events", "auto");
  // Handle the mouse leave event
  that.on('mouseleave', onMapMouseleaveHandler);
}
// Enable map zooming with mouse scroll when the user clicks the map
$('.map').on('click', onMapClickHandler);


//Portfolio Hexagon Skills

$(document).ready(function () {
  function hex_initial_animation() {
    $(".hex-wrap,.hover-notify").velocity("transition.expandIn", {
      stagger: 150
    });
    $(".hex-wrap").velocity("callout.pulse");
    $(".hoverblock").velocity("fadeOut", {
      delay: 3000,
      duration: 0
    });
  }
  hex_initial_animation();

  var hoverdetect = setInterval(function () {
    hovernotify()
  }, 3000);

  function hovernotify() {
    $(".hover-notify").velocity("callout.tada");
  }

  function myStopFunction() {
    $(".hover-notify").velocity('stop', true).velocity("fadeOut");
    clearInterval(hoverdetect);
  }

  $(".hex-init").mouseenter(function () {

    myStopFunction();

    var title_color = $(this).parent().attr("data-color");
    var title_name = $(this).parent().attr("data-title");
    var desc_name = $(this).parent().attr("data-content");

    function hex_description() {
      $('.code-description').velocity('stop', true).velocity("transition.slideRightBigIn");
      $('.' + desc_name).siblings().removeClass('desc-active');
      setTimeout(function () {
        $('.' + desc_name).addClass('desc-active');
        $('.code-descriptopn > div, .desc-active').children().velocity('stop', true).velocity("transition.slideRightBigIn", {
          stagger: 300
        });
        $('.code-title, .desc-active span').velocity({
          color: title_color
        }, {
          queue: false
        });
        $('.code-title').text(title_name)
      }, 0);
    }
    hex_description();

    $(this).parent().addClass('hexactive');
    $('.hexactive').velocity({
      scaleX: "1.1",
      scaleY: "1.1"
    }, {
      duration: 200
    });

  }).mouseleave(function () {
    $('.hexactive').velocity('stop', true).velocity('reverse').removeClass('hexactive');
  });
});

// Isotope

// init Isotope
var $grid = $('.grid').isotope({
  itemSelector: '.grid-item',

});

// filter functions
var filterFns = {
  ium: function () {
    var name = $(this).find('.name').text();
    return name.match(/ium$/);
  }
};

// bind filter button click
$('#filters').on('click', 'button', function () {
  var filterValue = $(this).attr('data-filter');
  // use filterFn if matches value
  filterValue = filterFns[filterValue] || filterValue;
  $grid.isotope({
    filter: filterValue
  });
});