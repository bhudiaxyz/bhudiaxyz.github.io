(function ($) {

  new WOW().init();

  jQuery(window).load(function () {
    jQuery("#load").delay(100).fadeOut("slow");
  });


  //jQuery to collapse the navbar on scroll
  $(window).scroll(function () {
    if ($(".navbar").offset().top > 50) {
      $(".navbar-fixed-top").addClass("top-nav-collapse");
    } else {
      $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }
  });

  //jQuery for page scrolling feature - requires jQuery Easing plugin
  $(function () {
    $('.navbar-nav li a').bind('click', function (event) {
      var $anchor = $(this);
      $('html, body').stop().animate({
        scrollTop: $($anchor.attr('href')).offset().top
      }, 1500, 'easeInOutExpo');
      event.preventDefault();
    });
    $('.page-scroll a').bind('click', function (event) {
      var $anchor = $(this);
      $('html, body').stop().animate({
        scrollTop: $($anchor.attr('href')).offset().top
      }, 1500, 'easeInOutExpo');
      event.preventDefault();
    });
  });

  //Google Map
  var latitude = $('#google-map').data('latitude');
  var longitude = $('#google-map').data('longitude');

  function initialize_map() {
    var myLatlng = new google.maps.LatLng(latitude, longitude);
    var mapOptions = {
      zoom: 16,
      center: myLatlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      navigationControl: true,
      mapTypeControl: false,
      scrollwheel: false,
      disableDoubleClickZoom: true
    };
    var map = new google.maps.Map(document.getElementById('google-map'), mapOptions);
    var marker = new google.maps.Marker({
      position: myLatlng,
      map: map
    });
    // add information window
    var infowindow = new google.maps.InfoWindow({
      content: '<div class="info"><strong>Quedex Ltd</strong><br/>are here:<br/><br/>Aston House,<br/>Cornwall Avenue,<br/>London, N3 1LF<br/>UK</div>'
    });

    // add listener for a click on the pin
    google.maps.event.addListener(marker, 'click', function () {
      infowindow.open(map, marker);
    });

  }

  google.maps.event.addDomListener(window, 'load', initialize_map);

})(jQuery);

$(document).ready(function () {
  /*============================================
   Project thumbs - Masonry
   ==============================================*/
  $(window).load(function () {

    $('#projects-container').css({visibility: 'visible'});

    $('#projects-container').masonry({
      itemSelector: '.project-item:not(.filtered)',
      //columnWidth:370,
      isFitWidth: true,
      isResizable: true,
      isAnimated: !Modernizr.csstransitions,
      gutterWidth: 25
    });

    scrollSpyRefresh();
    waypointsRefresh();

  });

  /*============================================
   Filter Projects
   ==============================================*/
  $('#filter-works a').click(function (e) {
    e.preventDefault();

    if ($('#project-preview').hasClass('open')) {
      closeProject();
    }

    $('#filter-works li').removeClass('active');
    $(this).parent('li').addClass('active');

    var category = $(this).attr('data-filter');

    $('.project-item').each(function () {
      if ($(this).is(category)) {
        $(this).removeClass('filtered');
      }
      else {
        $(this).addClass('filtered');
      }

      $('#projects-container').masonry('reload');
    });

    scrollSpyRefresh();
    waypointsRefresh();
  });

  /*============================================
   Project Preview
   ==============================================*/
  $('.project-item').click(function (e) {
    e.preventDefault();

    var elem = $(this),
      title = elem.find('.project-title').text(),
      descr = elem.find('.project-description').html(),
      slidesHtml = '<ul class="slides">',
      elemDataCont = elem.find('.project-description');

    slides = elem.find('.project-description').data('images').split(',');

    for (var i = 0; i < slides.length; ++i) {
      slidesHtml = slidesHtml + '<li><img src=' + slides[i] + ' alt=""></li>';
    }

    slidesHtml = slidesHtml + '</ul>';

    $('#project-title').text(title);
    $('#project-content').html(descr);
    $('#project-slider').html(slidesHtml);

    openProject();

  });

  function openProject() {

    $('#project-preview').addClass('open');
    $('.masonry-wrapper').animate({'opacity': 0}, 300);

    setTimeout(function () {
      $('#project-preview').slideDown();
      $('.masonry-wrapper').slideUp();

      $('html,body').scrollTo(0, '#filter-works',
        {
          gap: {y: -20},
          animation: {
            duration: 400
          }
        });

      $('#project-slider').flexslider({
        prevText: '<i class="fa fa-angle-left"></i>',
        nextText: '<i class="fa fa-angle-right"></i>',
        animation: 'slide',
        slideshowSpeed: 3000,
        useCSS: true,
        controlNav: true,
        pauseOnAction: false,
        pauseOnHover: true,
        smoothHeight: false,
        start: function () {
          $(window).trigger('resize');
          $('#project-preview').animate({'opacity': 1}, 300);
        }
      });

    }, 300);

  }

  function closeProject() {

    $('#project-preview').removeClass('open');
    $('#project-preview').animate({'opacity': 0}, 300);

    setTimeout(function () {
      $('.masonry-wrapper').slideDown();
      $('#project-preview').slideUp();

      $('#project-slider').flexslider('destroy');
      $('.masonry-wrapper').animate({'opacity': 1}, 300);


    }, 300);

    setTimeout(function () {
      $('#projects-container').masonry('reload');
    }, 500)
  }

  $('.close-preview').click(function () {
    closeProject();
  })

  /*============================================
   Waypoints Animations
   ==============================================*/
  $('#skills').waypoint(function () {

    $('.skills-item').each(function () {
      $(this).css({'height': $(this).data('height') + '%'});
    })

    $('.skills-bars').css({'opacity': 1});

  }, {offset: '40%'});

  $('.scrollimation').waypoint(function () {
    $(this).addClass('in');
  }, {offset: '90%'});

  /*============================================
   Resize Functions
   ==============================================*/
  var thumbSize = $('.project-item').width();

  $(window).resize(function () {
    $('#home').height($(window).height() + 50);

    if ($('.project-item').width() != thumbSize) {

      $('#projects-container').masonry('reload');
      thumbSize = $('.project-item').width();
    }

    scrollSpyRefresh();
    waypointsRefresh();
  });

  /*============================================
   Refresh scrollSpy function
   ==============================================*/
  function scrollSpyRefresh() {
    setTimeout(function () {
      $('body').scrollspy('refresh');
    }, 1000);
  }

  /*============================================
   Refresh waypoints function
   ==============================================*/
  function waypointsRefresh() {
    setTimeout(function () {
      $.waypoints('refresh');
    }, 1000);
  }
});
