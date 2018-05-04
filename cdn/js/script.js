$(function() {

var $window = $(window),
    $mixer = $('.mixer'),
    $mainSection = $('.main section'),
    $navbarNav = $('#navbarNav');

// nav clicks for active 'tab'
$('.navbar .nav-item').on('click', function(e){
   var href, scrollTo,
       subpages = [
         '/booking.html',
         '/clients.html',
         '/gearlist.html'
       ];

   // bail if we are on a subpage, links should work as expected
   if (subpages.indexOf(window.location.pathname) >= 0) { return }

   href = $(this).find('a').attr('href');
   scrollTo = $(href)[0].offsetTop;

   e.preventDefault();

   $navbarNav.find('.active').removeClass('active');
   $(this).addClass('active');

   window.scroll({
     top: scrollTo,
     left: 0,
     behavior: 'smooth'
   });

   if(history.pushState) {
     history.pushState(null, null, href);
   } else {
    location.hash = '#myhash';
   }

});

// auto close navbar on click
$('.navbar-collapse a').click(function(){
    $(".navbar-collapse").collapse('hide');
});

// Scroll listener
$window.on('scroll', function(e){
  var scroll = $window.scrollTop(),
      mixerPosition;

  if ($mixer.length) {
    mixerPosition = $mixer.css('backgroundPosition').split(' ');

    // mixer paralax
    mixerPosition[1] = 0 + (scroll / 5) + 'px';
    $mixer.css('backgroundPosition', mixerPosition.join(' '));

    // dumb scroll spy
    $mainSection.each(function(){
      var $this = $(this)[0];
      if (Math.abs($this.offsetTop-scroll) < 20) {
        $navbarNav.find('.active').removeClass('active');
        $navbarNav.find('a[href="#' + $this.id + '"]').addClass('active');
      }
    });
  }
});

// form handler
$('form').submit( function(e) {
  var $name = $('#name'),
      $email = $('#email'),
      $startDate = $('#start-date'),
      $endDate = $('#end-date'),
      $message = $('#message'),
      $captchaBox = $('.g-recaptcha :first-child')[0],
      isHuman = grecaptcha.getResponse(),
      defaultPrevented = false;

  // make sure its not a bot
  if (!isHuman) {
    $('.g-recaptcha :first-child').first().css('border','1px solid red');
    defaultPrevented = true;
    e.preventDefault();
  } else {
    $('.g-recaptcha :first-child').first().css('border','none');
  }

  if (!$name.val().trim()) {
    $name.removeClass('is-valid');
    $name.addClass('is-invalid');
    defaultPrevented = true;
    e.preventDefault();
  } else {
    $name.removeClass('is-invalid');
    $name.addClass('is-valid');
  }

  if (!$email.val().match(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)) {
    $email.removeClass('is-valid');
    $email.addClass('is-invalid');
    defaultPrevented = true;
    e.preventDefault();
  } else {
    $email.removeClass('is-invalid');
    $email.addClass('is-valid');
  }

  if (!$startDate.val().match(/^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/)) {
    $startDate.removeClass('is-valid');
    $startDate.addClass('is-invalid');
    defaultPrevented = true;
    e.preventDefault();
  } else {
    $startDate.removeClass('is-invalid');
    $startDate.addClass('is-valid');
  }

  if (!$endDate.val().match(/^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/)) {
    $endDate.removeClass('is-valid');
    $endDate.addClass('is-invalid');
    defaultPrevented = true;
    e.preventDefault();
  } else {
    $endDate.removeClass('is-invalid');
    $endDate.addClass('is-valid');
  }

  if (!$message.val().trim()) {
    $message.removeClass('is-valid');
    $message.addClass('is-invalid');
    defaultPrevented = true;
    e.preventDefault();
  } else {
    $message.removeClass('is-invalid');
    $message.addClass('is-valid');
  }

  if (!defaultPrevented) {
    $(this).unbind('submit').submit();
  }
});

var hash = window.location.hash;
if (hash === "#thanks") {
  $('#userMessage').html('Thank you for contacting us. We will get back to you as soon as possible');
} else if (hash === '#error') {
  $('#userMessage').html('There was an error submitting the form. Please try again.');
}

});
