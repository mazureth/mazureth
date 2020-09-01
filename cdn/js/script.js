$(function() {

var $window = $(window),
    $mixer = $('.mixer'),
    $mainSection = $('.main section'),
    $navbarNav = $('#navbarNav');

// nav clicks for active 'tab'
$('.navbar .nav-item, .navbar .navbar-brand').on('click', function(e){
  var href, scrollTo,
      loc = window.location,
      subpages = [
        '/booking.php',
        '/clients.php',
        '/gearlist.php'
      ];

  href = $(this).find('a').attr('href') || $(this).attr('href');

  // bail if we are on a subpage, links should work as expected
  if (subpages.indexOf(loc.pathname) >= 0) {
    window.location = loc.protocol + '//' + loc.host + '/' + href;
    return;
   }

  scrollTo = $(href).offset();

  e.preventDefault();

  $navbarNav.find('.active').removeClass('active');
  $(this).addClass('active');

  window.scroll({
    top: scrollTo.top,
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
      $service = $('#service'),
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

  if (!$startDate.val().match(/^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/)
      || (new Date($startDate.val())).getTime() < (new Date()).getTime()) {
    $startDate.removeClass('is-valid');
    $startDate.addClass('is-invalid');
    defaultPrevented = true;
    e.preventDefault();
  } else {
    $startDate.removeClass('is-invalid');
    $startDate.addClass('is-valid');
  }

  if (!$endDate.val().match(/^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/)
      || (new Date($endDate.val())).getTime() < (new Date($startDate.val())).getTime()) {
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

  if (!service.val().trim()) {
    $service.removeClass('is-valid');
    $service.addClass('is-invalid');
    defaultPrevented = true;
    e.preventDefault();
  } else {
    $service.removeClass('is-invalid');
    $service.addClass('is-valid');
  }

  if (!defaultPrevented) {
    $(this).unbind('submit').submit();
  }
});

var hash = window.location.hash;
if (hash === "#thanks") {
  $('#userMessage').addClass('alert alert-success').html('Thank you for contacting us. We will get back to you as soon as possible');
} else if (hash === '#error') {
  $('#userMessage').addClass('alert alert-danger').html('There was an error submitting the form. Please try again.');
}

var $clients = $('#clientRows');
if ($clients.length) {
  
  var template = '';

  for (var i = 0; i < works.length; i++) {
    
    var artistName = works[i].artistName,
      albumName = works[i].albumName,
      description = works[i].description,
      coverArt = works[i].coverArt,
      artistLink = works[i].artistLink,
      albumLink = works[i].albumLink,
      jobType = works[i].jobType;

    template += `
    <div class="col-lg-3 col-md-6 col-sm-6 col-xs-6">
      <div class="card">
        <div class="card-body">`;
          
    template += artistLink.length
      ? `<p class="card-text"><strong>Artist:</strong> <a href="${artistLink}" target="_blank" rel="noreferrer">${artistName}</a></p>`
      : `<p class="card-text"><strong>Artist:</strong> ${artistName}</p>`;

    template += albumLink.length
      ? `<p class="card-text"><strong>Album:</strong> <a href="${albumLink}" target="_blank" rel="noreferrer">${albumName}</a></p>`
      : `<p class="card-text"><strong>Album:</strong> ${albumName}</p>`;

    template += `
          <p class="card-text"><strong>Job Type:</strong> ${jobType}</p>
          <p class="card-text"><strong>Description:</strong> ${description}</p>
        </div>`;

    template += coverArt.length
      ? `<img class="card-img-top" src="${coverArt}" alt="${artistName} - ${albumName}">`
      : ``;

    template += `</div></div>`;

    // add template to the page
    $clients.append(template);
    template = '';

    // last one does not need new row, just break
    if (i === works.lenth) { 
      break;
    }

    // multiples of 4 need a new row
    if (i !== 0 && ((i+1) % 4) === 0) {
      $clients.append('<div class="row"></div>');      
    }

  }

}

});

var works = [
  {
    artistName: "27 South",
    albumName: "27 South (LP)",
    description: "27 South was a southern heavy metal band from Tallahassee, FL. 'Pantera riffs and Slayer speeds'",
    coverArt: "https://cdn.mazureth.com/images/artists/27_South.jpg",
    artistLink: "",
    albumLink: "",
    jobType: "Full Production"
  },
  {
    artistName: "400.40",
    albumName: "MMXVII (EP)",
    description: "Follow up to the bands debut EP release, this released explored a wider range of musical styles dipping into blues and hip hop.",
    coverArt: "https://cdn.mazureth.com/images/artists/400.40_-_MMXVII.jpg",
    artistLink: "",
    albumLink: "https://soundcloud.com/the40040official/sets/mmxvii",
    jobType: "Full Production"
  },
  {
    artistName: "400.40",
    albumName: "Wasted Time (EP)",
    description: "Seattle piano driven indie rock with hints of jass and hip hop.",
    coverArt: "https://cdn.mazureth.com/images/artists/400.40_-_Wasted_Time.jpg",
    artistLink: "",
    albumLink: "https://soundcloud.com/the40040official/sets/wasted-time",
    jobType: "Full Production"
  },
  {
    artistName: "Alpenglow",
    albumName: "Demo (Demo)",
    description: "Seattle based progressive bluegrass band that has just hit the scene, they wanted a demo to send to venues for booking.",
    coverArt: "https://cdn.mazureth.com/images/artists/alpenglow.jpg",
    artistLink: "https://www.facebook.com/AlpenglowSeattle/",
    albumLink: "",
    jobType: "Full Production"
  },
  {
    artistName: "Anthrocene",
    albumName: "Nucleation (LP)",
    description: "Seattle based power thrash metal that takes listeners on a wild journey of fiction centering around a fire wielding demon",
    coverArt: "https://cdn.mazureth.com/images/artists/anthrocene.jpg",
    artistLink: "https://www.facebook.com/anthroceneband/",
    albumLink: "https://open.spotify.com/album/1rZ0TSTy1MJpyL17ZLNxAb?si=qMPs6hXdTuqAVABHtVZxwA",
    jobType: "Tracking"
  },
  {
    artistName: "The Avenue",
    albumName: "8-Track Diaries (EP)",
    description: "Tallahassee based indie emo punk rock",
    coverArt: "https://cdn.mazureth.com/images/artists/avenue_1.jpg",
    artistLink: "",
    albumLink: "",
    jobType: "Full Production"
  },
  {
    artistName: "The Avenue",
    albumName: "The Process of Eliminating Options (LP)",
    description: "The Avenue's first (and only) full length album with catchy riffs and clever lyrics that defined this era of power pop punk",
    coverArt: "https://cdn.mazureth.com/images/artists/avenue_2.jpg",
    artistLink: "",
    albumLink: "",
    jobType: "Full Production"
  },
  {
    artistName: "Castle Dwellers",
    albumName: "Like the Waving Sea",
    description: "Catchy guitar driven indie rock with obvious blues influences",
    coverArt: "https://cdn.mazureth.com/images/artists/castle-dwellers.jpg",
    artistLink: "https://open.spotify.com/artist/4Lb6DpAcqn6Y21HkOsjyHA?si=3U0MPlssQxKHFqe5MP16ZA",
    albumLink: "https://open.spotify.com/album/5Ry7lYkRmmtkYa00lPAje0?si=zhoVk5-JT-yHRl09jY82tw",
    jobType: "Full Production"
  },
  {
    artistName: "Divide Comedy Club",
    albumName: "Nothing Cool Happens In Heaven (Single)",
    description: "Seattle based atmosphereic and psychadelic band's second single release, fronted by a powerful female vocalist.",
    coverArt: "https://cdn.mazureth.com/images/artists/dcc_-_heaven.JPG",
    artistLink: "https://open.spotify.com/artist/0V3wNDGlwNMLVEaLXaUohT",
    albumLink: "https://open.spotify.com/album/3knh0sDKjE63NkxLLz27rY?si=4tq55k50RYaLaMh76b6lcA",
    jobType: "Full Production"
  },
  {
    artistName: "Divide Comedy Club",
    albumName: "Out For Launch (Single)",
    description: "Seattle based atmosphereic and psychadelic band's first single release, fronted by a powerful female vocalist.",
    coverArt: "https://cdn.mazureth.com/images/artists/dcc_-_launch.JPG",
    artistLink: "https://open.spotify.com/artist/0V3wNDGlwNMLVEaLXaUohT",
    albumLink: "https://open.spotify.com/album/4kdDONVqMXR8XP3IchLR85",
    jobType: "Full Production"
  },
  {
    artistName: "Glen Ridge",
    albumName: "All The Things (LP)",
    description: "Folky bluegrass musings of singer/songwriter Glen Ridge.",
    coverArt: "https://cdn.mazureth.com/images/artists/glen_ridge.png",
    artistLink: "",
    albumLink: "",
    jobType: "Full Production"
  },
  {
    artistName: "Luna Nova",
    albumName: "What are you, gay? (EP)",
    description: "Trip hop, jazztronic, downtemp songs about coming out as a non-binary",
    coverArt: "https://cdn.mazureth.com/images/artists/lunanova.jpg",
    artistLink: "",
    albumLink: "",
    jobType: "Full Production"
  },
  {
    artistName: "Miners Work",
    albumName: "Miners Work (LP)",
    description: "Tallahasse based indie frat rock",
    coverArt: "https://cdn.mazureth.com/images/artists/miners_work.jpg",
    artistLink: "",
    albumLink: "https://soundcloud.com/user-359899219/sets/miners-work",
    jobType: "Full Production"
  },
  {
    artistName: "Plateau",
    albumName: "Everything Was Sweet (LP)",
    description: "Seattle based indie rock band with clear influences from both the gunge era as well as the British pop invasion of the 60s.",
    coverArt: "https://cdn.mazureth.com/images/artists/plateau.jpg",
    artistLink: "https://plateauseattle.bandcamp.com/",
    albumLink: "",
    jobType: "Mixing"
  },
  {
    artistName: "Red Is Recovery",
    albumName: "Red Is Recovery (LP)",
    description: "Debut album of Tallahassee based indie rock band that kicked off local fame leading to regional followings and label attention.",
    coverArt: "https://cdn.mazureth.com/images/artists/red_is_recovery.jpg",
    artistLink: "https://myspace.com/redisrecovery",
    albumLink: "https://soundcloud.com/user-359899219/sets/red-is-recovery-the-red-album",
    jobType: "Full Production"
  },
  {
    artistName: "Red Is Recovery",
    albumName: "Goodbyes Are New Beginnings (EP)",
    description: "The follow up to their debut album released immedately before the band relocated to Orlando, FL.",
    coverArt: "https://cdn.mazureth.com/images/artists/red_is_recovery_2.jpg",
    artistLink: "https://myspace.com/redisrecovery",
    albumLink: "https://soundcloud.com/user-359899219/sets/red-is-recovery-goodbyes-are-new-beginnings",
    jobType: "Full Production"
  }
];
