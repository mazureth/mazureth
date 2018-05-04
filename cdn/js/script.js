$(function() {

var $window = $(window),
    $mixer = $('.mixer'),
    $mainSection = $('.main section'),
    $navbarNav = $('#navbarNav')
    $popoverLinks = $('a.pop-over'),
    $popover = $('#pop-over'),
    $popoverContent = $('#pop-over .container'),
    $popoverClose = $('#pop-over .close');

// nav clicks for active 'tab'
$('.navbar .nav-item').on('click', function(e){
   var href = $(this).find('a').attr('href'),
       scrollTo = $(href)[0].offsetTop;
   e.preventDefault();

   $navbarNav.find('.active').removeClass('active');
   $(this).addClass('active');

   if ($popover.is(':visible')) {
      $popover.hide();
   }

   window.scroll({
     top: scrollTo,
     left: 0,
     behavior: 'smooth'
   });
});

// auto close navbar on click
$('.navbar-collapse a').click(function(){
    $(".navbar-collapse").collapse('hide');
});

// Scroll listener
$window.on('scroll', function(e){
  var scroll = $window.scrollTop(),
      mixerPosition = $mixer.css('backgroundPosition').split(' ');

  // mixer paralax
  mixerPosition[1] = 0 + (scroll / 5) + 'px';
  $mixer.css('backgroundPosition', mixerPosition.join(' '));

  // dumb scroll spy
  $mainSection.each(function(){
    var $this = $(this)[0];
    if (Math.abs($this.offsetTop-scroll) < 20) {
      $navbarNav.find('.active').removeClass('active');
      $navbarNav.find('a[href="#' + $thisuu.id + '"]').addClass('active');
    }
  });

});

// popover box
var alreadyFetched = {};
function managePopover(fetch) {
  var content = alreadyFetched[fetch] || '';

  if ($popover.is(':visible') && content) {
    $popoverContent.html(content);
  } else if ($popover.not(':visible') && content) {
    $popoverContent.html(content);
    $popover.show();
  } else {
    $popover.hide();
  }
};
$popoverLinks.on('click', function(e){
  var fetch = $(this).data('fetch');
  e.preventDefault();
  // if we havent already fetched this, do so now
  if (!alreadyFetched[fetch]) {
    // fetch the data for the extra content
    $.ajax({
      url: fetch,
      success: function(data) {
        alreadyFetched[fetch] = data;
        managePopover(fetch);
      },
      dataType: 'html'
    });
  } else {
    managePopover(fetch);
  }
});
$popoverClose.on('click', function(e){
  e.preventDefault();
  $popover.hide();
});

// form handler
$(document).on('click', '#submit', function(e){
  e.preventDefault();
  var $name = $('#name'),
      $email = $('#email'),
      $startDate = $('#start-date'),
      $endDate = $('#end-date'),
      $message = $('#message');

  if (!$name.val().trim()) {
    $name.removeClass('is-valid');
    $name.addClass('is-invalid');
  } else {
    $name.removeClass('is-invalid');
    $name.addClass('is-valid');
  }
  if (!$email.val().match(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)) {
    $email.removeClass('is-valid');
    $email.addClass('is-invalid');
  } else {
    $email.removeClass('is-invalid');
    $email.addClass('is-valid');
  }
  if (!$startDate.val().match(/^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/)) {
    $startDate.removeClass('is-valid');
    $startDate.addClass('is-invalid');
  } else {
    $startDate.removeClass('is-invalid');
    $startDate.addClass('is-valid');
  }
  if (!$endDate.val().match(/^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/)) {
    $endDate.removeClass('is-valid');
    $endDate.addClass('is-invalid');
  } else {
    $endDate.removeClass('is-invalid');
    $endDate.addClass('is-valid');
  }
  if (!$message.val().trim()) {
    $message.removeClass('is-valid');
    $message.addClass('is-invalid');
  } else {
    $message.removeClass('is-invalid');
    $message.addClass('is-valid');
  }
  $.ajax({
    url: './process-form.php',
    success: function(data) {
      var template = `<h1 class="text-center">THANKS</h1><p>Thank you for contacting us ${name}! We will get back to you as soon as we can.`;
      $popoverContent.html(template);
    }
  });
});

});
