// Select all links with hashes
$('a.nav__link[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
      &&
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000);
      }
    }
});

function getTimeRemaining(endtime) {
  var t = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor((t / 1000) % 60);
  var minutes = Math.floor((t / 1000 / 60) % 60);
  var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  var days = Math.floor(t / (1000 * 60 * 60 * 24));
  return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
}

function initializeClock(id, endtime) {
  var clock = document.querySelector(id);
  var daysSpan = clock.querySelector('.timer__days');
  //var hoursSpan = clock.querySelector('.timer__hours');
  var minutesSpan = clock.querySelector('.timer__minutes');
  var secondsSpan = clock.querySelector('.timer__seconds');

  function updateClock() {
    var t = getTimeRemaining(endtime);

    daysSpan.innerHTML = ('0' + t.days).slice(-2);
    //hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

    if (t.total <= 0) {
      clearInterval(timeinterval);
    }
  }

  updateClock();
  var timeinterval = setInterval(updateClock, 1000);
}

var deadline = 'February 11 2018 23:59:59 GMT+0300';
initializeClock('#js-countdown-timer', deadline);


var fixSections = function() {
  var
    sections

  var _init = function() {
    sections = document.querySelectorAll('.js-fixed-section');
    sections = Array.prototype.slice.call(sections);
    _addEventHandlers();
    _inView();
  }

  var _addEventHandlers = function() {
    window.addEventListener('scroll', _inView, false);
    window.addEventListener('resize', _inView, false);
  }

  var _inView = function() {
    sections.forEach(function(element,index) {
      _fixSection(element, index);
    });
  }

  var _fixSection = function(element, index) {
    var pos                 = element.getBoundingClientRect();
    var elHeight            = pos.height;
    var elBottomFromTop     = pos.bottom;
    var elTopFromTop        = pos.top;
    var elTopFromBottom     = pos.top - window.innerHeight;
    var elBottomFromBottom  = pos.bottom - window.innerHeight;

    if(elTopFromTop <= 0 ) {
        element.classList.add('section_fixed');
    }
    else {
        element.classList.remove('section_fixed');
    }
  }

  return {
    init: _init
  }
}();
fixSections.init();

var modal = function() {
    var
        body,
        modalBlock,
        modalToggles,
        modalActiveClass

    var _init = function() {
        body = document.querySelector('.body');
        modalBlock = document.querySelector('.js-modal');
        modalToggles = document.querySelectorAll('.js-modal-toggle');
        modalToggles = Array.prototype.slice.call(modalToggles);
        bodyModalActiveClass = 'body_modal_open';
        modalActiveClass = 'modal_open';
        _addEventHandlers();
    }

    var _addEventHandlers = function() {
        modalToggles.forEach(function(toggle,index) {
            toggle.addEventListener('click', function(e) {
                e.preventDefault();
                modalBlock.classList.add(modalActiveClass);
                body.classList.add(bodyModalActiveClass);
            });
        });
        document.addEventListener('click', function (e) {
            if (e.target.classList.contains(modalActiveClass)) {
                modalBlock.classList.remove(modalActiveClass);
                body.classList.remove(bodyModalActiveClass);
            }
        });
    }

    return {
        init: _init
    }
}();
modal.init();
