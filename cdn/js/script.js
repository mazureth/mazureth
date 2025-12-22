$(function () {

  $('body').show();

  // WebP detection for older browsers
  function canUseWebP() {
    var elem = document.createElement('canvas');
    if (!!(elem.getContext && elem.getContext('2d'))) {
      return elem.toDataURL('image/webp').indexOf('data:image/webp') == 0;
    }
    return false;
  }

  function generateLnkBio(works) {
    var template = '';

    for (var i = 0; i < works.length; i++) {

      var artistName = works[i].artistName,
        albumName = works[i].albumName,
        coverArt = works[i].coverArt,
        extension = webpSupported
          ? 'webp'
          : 'jpg',
        host = (window.location.host.indexOf('localhost') > -1)
          ? 'http://localhost:9000/cdn/'
          : 'https://mazureth.com/cdn/';

      template += `
    <div class="col-lg-3 col-md-6 col-sm-6 col-xs-6">
      <div class="card">`;

      template += coverArt.length
        ? `<img class="card-img-top" src="${host}${coverArt}${extension}" alt="${artistName} - ${albumName}">`
        : ``;

      template += `</div></div>`;

    }

    return template;
  }

  function generateCoverGrid(works) {
    var template = '';

    for (var i = 0; i < works.length; i++) {

      var artistName = works[i].artistName,
        albumName = works[i].albumName,
        description = works[i].description,
        coverArt = works[i].coverArt,
        artistLink = works[i].artistLink,
        albumLink = works[i].albumLink,
        jobType = works[i].jobType,
        extension = webpSupported
          ? 'webp'
          : 'jpg',
        host = (window.location.host.indexOf('localhost') > -1)
          ? 'http://localhost:9000/cdn/'
          : 'https://mazureth.com/cdn/';

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
        ? `<img class="card-img-top" src="${host}${coverArt}${extension}" alt="${artistName} - ${albumName}">`
        : ``;

      template += `</div></div>`;

    }

    return template;
  }

  // use local css when necessary
  if (window.location.host.indexOf('localhost') > -1) {
    cssTag = document.getElementById('mainStylesheet');
    cssTag.href = 'cdn/css/styles.css';
  }

  // phone call/email buttons
  $('.callUs').click(function (e) {
    e.preventDefault();
    window.open('tel:2063959009', '_self');
  });
  $('.phNum').append(atob('KDIwNikgMzk1IC0gOTAwOQ=='));
  $('.emailAddr').append(atob('aW5mb0BtYXp1cmV0aC5jb20='));

  var $window = $(window),
    $hero = $('.hero'),
    $mainSection = $('.main section'),
    $navbarNav = $('#navbarNav'),
    webpSupported = canUseWebP(),
    maxScrollDepth = 0;

  // nav clicks for active 'tab'
  $('.navbar .nav-item, .navbar .navbar-brand').on('click', function (e) {
    var href, scrollTo,
      loc = window.location,

      href = $(this).find('a').attr('href') || $(this).attr('href');

    // bail if we are on a subpage, links should work as expected
    // added /mazureth/ to account for github pages
    if (loc.pathname !== "/" && loc.pathname !== "/mazureth/") {
      if (loc.host === 'mazureth.github.io') {
        // if github pages put path back in
        href = 'mazureth/' + href;
      }
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

    if (history.pushState) {
      history.pushState(null, null, href);
    } else {
      location.hash = '#myhash';
    }

  });

  // auto close navbar on click
  $('.navbar-collapse a').click(function () {
    $(".navbar-collapse").collapse('hide');
  });

  // Scroll listener
  $window.on('scroll', function (e) {
    var scroll = $window.scrollTop(),
      heroPosition;

    if (scroll > maxScrollDepth) {
      maxScrollDepth = scroll;
    }

    if ($hero.length) {
      heroPosition = $hero.css('backgroundPosition').split(' ');

      // hero paralax
      heroPosition[1] = 0 + (scroll / 5) + 'px';
      $hero.css('backgroundPosition', heroPosition.join(' '));

      // dumb scroll spy
      $mainSection.each(function () {
        var $this = $(this)[0];
        if (Math.abs($this.offsetTop - scroll) < 20) {
          $navbarNav.find('.active').removeClass('active');
          $navbarNav.find('a[href="#' + $this.id + '"]').addClass('active');

        }
      });
    }
  });

  // services clicks
  $('#services .nav-item').click(function () {
    var $this = $(this);
    var tab = $this.find('.nav-link')[0].id.split('-')[0];
    gtag('event', 'service tab click', {
      'value': tab
    });
  });

  // form handler
  $('form').submit(function (e) {
    var $firstName = $('#firstName'),
      $lastName = $('#lastName'),
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
      $('.g-recaptcha :first-child').first().css('border', '1px solid red');
      defaultPrevented = true;
      e.preventDefault();
    } else {
      $('.g-recaptcha :first-child').first().css('border', 'none');
    }

    if (!$firstName.val().trim()) {
      $firstName.removeClass('is-valid');
      $firstName.addClass('is-invalid');
      defaultPrevented = true;
      e.preventDefault();
    } else {
      $firstName.removeClass('is-invalid');
      $firstName.addClass('is-valid');
    }

    if (!$lastName.val().trim()) {
      $lastName.removeClass('is-valid');
      $lastName.addClass('is-invalid');
      defaultPrevented = true;
      e.preventDefault();
    } else {
      $lastName.removeClass('is-invalid');
      $lastName.addClass('is-valid');
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

  var $bioLinks = $('#bioLinks');
  if ($bioLinks.length) {
    var template = generateLnkBio(works);
    $bioLinks.append(template);
  }

  var $clients = $('#clientRows');
  if ($clients.length) {
    var template = generateCoverGrid(works);
    $clients.append(template);
  }

  // add 4 random covers to main page if screen is large
  if ($window.height() > 924) {
    var fourWorks = [], i, randWork = 0, moreCovers, tmpWorks = works;
    for (var i = 0; i < 4; i++) {
      randWork = Math.floor(Math.random() * ((tmpWorks.length - 1) + 1));
      fourWorks.push(works[randWork]);
      tmpWorks.splice(randWork, 1);
    }
    moreCovers = generateCoverGrid(fourWorks);
    $('#otherClients').removeClass('hidden');
    $('#moreCovers').append(moreCovers);
  }

  // replace webp with jpg when not supported
  if (!webpSupported) {
    // grabs all images tags on the page and changes the extension
    $('img[src$=".webp"]').each(function () {
      var src = this.src;
      src = src.replace('webp', 'jpg');
      this.src = src;
    });
    // adds a class to the hero window to use different background image
    $('#welcome').addClass('noWebp');
  }

  /*************************************************
   * Skyline Diffuser Generator (Bottom-of-Page)
   * -----------------------------------------------
   * Safe to include directly before </body>
   *************************************************/

  /* =========================
     Constants & Materials
     ========================= */

  var PINE_DENSITY = 22.0;       // lb / ft³
  var PLYWOOD_DENSITY = 34.0;    // lb / ft³
  var IN3_PER_FT3 = 1728;

  /* =========================
     Utility Functions
     ========================= */

  function shuffle(array) {
    var a = array.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i];
      a[i] = a[j];
      a[j] = tmp;
    }
    return a;
  }

  /* =========================
     Diffuser Generator
     ========================= */

  function generateDiffuser(opts) {
    var plywoodWidthIn = opts.plywoodWidthIn;
    var plywoodHeightIn = opts.plywoodHeightIn;
    var cellSizeIn = opts.cellSizeIn || 1.5;
    var maxDepthIn = opts.maxDepthIn || 6.0;
    var seed = opts.seed;

    if (seed !== undefined && seed !== null) {
      var s = seed;
      Math.random = function () {
        s = Math.sin(s) * 10000;
        return s - Math.floor(s);
      };
    }

    var N = Math.floor(
      Math.min(plywoodWidthIn, plywoodHeightIn) / cellSizeIn
    );

    if (N < 2) {
      throw new Error("Plywood too small for diffuser grid.");
    }

    // Base Latin square
    var matrix = [];
    for (var r = 0; r < N; r++) {
      var row = [];
      for (var c = 0; c < N; c++) {
        row.push(((r + c) % N) + 1);
      }
      matrix.push(row);
    }

    // Randomize rows
    matrix = shuffle(matrix);

    // Randomize columns
    var colPerm = shuffle(Array.from({ length: N }, function (_, i) { return i; }));
    matrix = matrix.map(function (row) {
      return colPerm.map(function (c) {
        return row[c];
      });
    });

    // Randomize symbols
    var symbols = shuffle(Array.from({ length: N }, function (_, i) { return i + 1; }));
    var symbolMap = {};
    for (var i = 0; i < N; i++) {
      symbolMap[i + 1] = symbols[i];
    }

    matrix = matrix.map(function (row) {
      return row.map(function (v) {
        return symbolMap[v];
      });
    });

    var depthStep = maxDepthIn / N;

    // Build cut list
    var cutList = {};
    matrix.flat().forEach(function (v) {
      var h = +(v * depthStep).toFixed(3);
      cutList[h] = (cutList[h] || 0) + 1;
    });

    // Weight calculations
    var blockFaceArea = cellSizeIn * cellSizeIn;
    var pineVolumeIn3 = 0;

    for (var h in cutList) {
      pineVolumeIn3 += blockFaceArea * parseFloat(h) * cutList[h];
    }

    var pineWeight = (pineVolumeIn3 / IN3_PER_FT3) * PINE_DENSITY;

    var plywoodVolumeIn3 =
      plywoodWidthIn * plywoodHeightIn * 0.25;

    var plywoodWeight =
      (plywoodVolumeIn3 / IN3_PER_FT3) * PLYWOOD_DENSITY;

    var totalWeight = +(pineWeight + plywoodWeight).toFixed(2);

    return {
      N: N,
      matrix: matrix,
      cutList: cutList,
      depthStep: depthStep,
      totalWeight: totalWeight
    };
  }

  /* =========================
     8' Plank Estimator
     ========================= */

  function estimatePlanks(opts) {
    var cutList = opts.cutList;
    var plankLengthIn = opts.plankLengthIn || 96;
    var kerfIn = opts.kerfIn || 0.125;

    var cuts = [];
    for (var length in cutList) {
      for (var i = 0; i < cutList[length]; i++) {
        cuts.push(parseFloat(length));
      }
    }

    cuts.sort(function (a, b) { return b - a; });

    var planks = [];

    cuts.forEach(function (cut) {
      var placed = false;

      for (var i = 0; i < planks.length; i++) {
        if (planks[i].remaining >= cut + kerfIn) {
          planks[i].remaining -= (cut + kerfIn);
          planks[i].cuts.push(cut);
          placed = true;
          break;
        }
      }

      if (!placed) {
        planks.push({
          remaining: plankLengthIn - cut - kerfIn,
          cuts: [cut]
        });
      }
    });

    return {
      plankCount: planks.length,
      planks: planks
    };
  }

  /* =========================
     DOM Renderer
     ========================= */

  function renderDiffuserMatrix(matrix, opts) {
    opts = opts || {};
    var cellPx = opts.cellPx || 18;
    var gapPx = opts.gapPx || 2;
    var showValues = opts.showValues !== false;

    var N = matrix.length;
    var container = document.createElement("div");

    container.style.display = "grid";
    container.style.gridTemplateColumns = "repeat(" + N + ", " + cellPx + "px)";
    container.style.gap = gapPx + "px";
    container.style.marginBottom = "16px";

    matrix.forEach(function (row) {
      row.forEach(function (value) {
        var cell = document.createElement("div");
        var shade = Math.round(255 * (1 - value / N));

        cell.style.width = cellPx + "px";
        cell.style.height = cellPx + "px";
        cell.style.backgroundColor = "rgb(" + shade + "," + shade + "," + shade + ")";
        cell.style.display = "flex";
        cell.style.alignItems = "center";
        cell.style.justifyContent = "center";
        cell.style.fontSize = "10px";
        cell.style.fontFamily = "monospace";
        cell.style.border = "1px solid #555";

        if (showValues) {
          cell.textContent = value;
        }

        container.appendChild(cell);
      });
    });

    return container;
  }

  /* =========================
     Example Usage (Auto-run)
     ========================= */

  var diffuser = generateDiffuser({
    plywoodWidthIn: 48,
    plywoodHeightIn: 48,
    maxDepthIn: 6.0,
    seed: 42
  });

  var lumber = estimatePlanks({
    cutList: diffuser.cutList
  });

  var info = document.createElement("pre");
  info.textContent =
    "Grid: " + diffuser.N + " x " + diffuser.N + "\n" +
    "Max depth: 6\"\n" +
    "Estimated weight: " + diffuser.totalWeight + " lb\n" +
    "8' planks required: " + lumber.plankCount;

  const diffuserElem = document.getElementById('diffuser');
  diffuserElem.appendChild(info);

  var grid = renderDiffuserMatrix(diffuser.matrix, {
    cellPx: 18,
    showValues: true
  });

  diffuserElem.appendChild(grid);

});

var works = [
  {
    artistName: "27 South",
    albumName: "27 South (LP)",
    description: "27 South was a southern heavy metal band from Tallahassee, FL. 'Pantera riffs and Slayer speeds'",
    coverArt: "images/artists/27_South.",
    artistLink: "",
    albumLink: "",
    jobType: "Full Production"
  },
  {
    artistName: "400.40",
    albumName: "MMXVII (EP)",
    description: "Follow up to the bands debut EP release, this released explored a wider range of musical styles dipping into blues and hip hop.",
    coverArt: "images/artists/400.40_-_MMXVII.",
    artistLink: "",
    albumLink: "https://soundcloud.com/the40040official/sets/mmxvii",
    jobType: "Full Production"
  },
  {
    artistName: "400.40",
    albumName: "Wasted Time (EP)",
    description: "Seattle piano driven indie rock with hints of jass and hip hop.",
    coverArt: "images/artists/400.40_-_Wasted_Time.",
    artistLink: "",
    albumLink: "https://soundcloud.com/the40040official/sets/wasted-time",
    jobType: "Full Production"
  },
  {
    artistName: "Aaron MacCarley",
    albumName: "Sunflowewrs In The Rain",
    description: "Documentary about the war in Ukraine",
    coverArt: "images/artists/SunflowersInTheRain.",
    artistLink: "https://www.imdb.com/name/nm9268955/",
    albumLink: "https://www.imdb.com/title/tt33319210/",
    jobType: "Recording, Mixing & Mastering"
  },
  {
    artistName: "Alpenglow",
    albumName: "Mountain Time (EP)",
    description: "Seattle based progressive bluegrass band that wanted a demo to send to venues for booking.",
    coverArt: "images/artists/AlpenglowMountainTime.",
    artistLink: "https://www.facebook.com/AlpenglowSeattle/",
    albumLink: "https://open.spotify.com/album/1aucdFj58YlUALfS3p3ru4?si=dKaG-qGVQRam0bO489NAww",
    jobType: "Full Production"
  },
  {
    artistName: "Anthrocene",
    albumName: "Nucleation (LP)",
    description: "Seattle based power thrash metal that takes listeners on a wild journey of fiction centering around a fire wielding demon",
    coverArt: "images/artists/anthrocene.",
    artistLink: "https://www.facebook.com/anthroceneband/",
    albumLink: "https://open.spotify.com/album/1rZ0TSTy1MJpyL17ZLNxAb?si=qMPs6hXdTuqAVABHtVZxwA",
    jobType: "Tracking"
  },
  {
    artistName: "Ari Warmack",
    albumName: "The Life (Single)",
    description: "Snoqualmie based singer/songwriter",
    coverArt: "images/artists/Ari_The_Life.",
    artistLink: "https://open.spotify.com/artist/5OWg8nza0NfynvaJbgCi6C?si=bfaGYHThR_Ox5Xz_hl3g-g",
    albumLink: "https://open.spotify.com/album/08MyV4wI64aDh0ZTRdnptF?si=S56XDGbHRg2KfPkYlDm5PQ",
    jobType: "Mixing and Mastering"
  },
  {
    artistName: "Ari Warmack",
    albumName: "Writer's Bloc (Single)",
    description: "Snoqualmie based singer/songwriter",
    coverArt: "images/artists/ari_writers_bloc.",
    artistLink: "https://open.spotify.com/artist/5OWg8nza0NfynvaJbgCi6C?si=bfaGYHThR_Ox5Xz_hl3g-g",
    albumLink: "https://open.spotify.com/album/08xpTRuVYjH6OdB972EQgP?si=mMMmKS4FTCi5km5wO_P1Wg",
    jobType: "Mixing and Mastering"
  },
  {
    artistName: "Ari Warmack",
    albumName: "Waiting Room (EP)",
    description: "Snoqualmie based singer/songwriter",
    coverArt: "images/artists/ari_warmack_waiting_room.",
    artistLink: "https://open.spotify.com/artist/5OWg8nza0NfynvaJbgCi6C?si=bfaGYHThR_Ox5Xz_hl3g-g",
    albumLink: "https://open.spotify.com/album/5a0th7L1r9lk7J6RYiko2i?si=qRhqLuH2Tz-dv-p2FJdVWw",
    jobType: "Mixing and Mastering"
  },
  {
    artistName: "The Avenue",
    albumName: "8-Track Diaries (EP)",
    description: "Tallahassee based indie emo punk rock",
    coverArt: "images/artists/avenue_1.",
    artistLink: "",
    albumLink: "",
    jobType: "Full Production"
  },
  {
    artistName: "The Avenue",
    albumName: "The Process of Eliminating Options (LP)",
    description: "The Avenue's first (and only) full length album with catchy riffs and clever lyrics that defined this era of power pop punk",
    coverArt: "images/artists/avenue_2.",
    artistLink: "",
    albumLink: "",
    jobType: "Full Production"
  },
  {
    artistName: "Bo Randall",
    albumName: "Cascade Highway",
    description: "Irish influecned Pacific Northwest blugrass",
    coverArt: "images/artists/bo_randall_cascade_highway.",
    artistLink: "https://open.spotify.com/artist/0gCvdYz9jKqnivUcbzjfB1?si=BM0_37K2Q52ge7oygz3vtQ",
    albumLink: "https://open.spotify.com/album/4IHmE2b2Hon9pb01FTyUgw?si=P_E5Fv6DQuGHFLXNMHyIpA",
    jobType: "Full Production"
  },
  {
    artistName: "Bone Frau",
    albumName: "Umlaut",
    description: "Seattle based prog rock with a very braod musical range",
    coverArt: "images/artists/bone_frau_umlaut.",
    artistLink: "https://bonefrau.bandcamp.com/",
    albumLink: "https://bonefrau.bandcamp.com/album/umlaut",
    jobType: "Full Production"
  },
  {
    artistName: "Castle Dwellers",
    albumName: "Like the Waving Sea",
    description: "Catchy guitar driven indie rock with obvious blues influences",
    coverArt: "images/artists/castle-dwellers.",
    artistLink: "https://open.spotify.com/artist/4Lb6DpAcqn6Y21HkOsjyHA?si=3U0MPlssQxKHFqe5MP16ZA",
    albumLink: "https://open.spotify.com/album/5Ry7lYkRmmtkYa00lPAje0?si=zhoVk5-JT-yHRl09jY82tw",
    jobType: "Full Production"
  },
  {
    artistName: "Divine Comedy Club",
    albumName: "Euclidian Distances",
    description: "Seattle based atmosphereic and psychadelic band's first album, fronted by a powerful female vocalist.",
    coverArt: "images/artists/dcc_-_euclidian_distances.",
    artistLink: "https://open.spotify.com/artist/0V3wNDGlwNMLVEaLXaUohT",
    albumLink: "https://open.spotify.com/album/6NXK1KEN16US4TeRmTIQ4B?si=9XP-2XBvToCz86ulMHJxfg",
    jobType: "Full Production"
  },
  {
    artistName: "Divine Comedy Club",
    albumName: "Nothing Cool Happens In Heaven (Single)",
    description: "Seattle based atmosphereic and psychadelic band's second single release, fronted by a powerful female vocalist.",
    coverArt: "images/artists/dcc_-_heaven.",
    artistLink: "https://open.spotify.com/artist/0V3wNDGlwNMLVEaLXaUohT",
    albumLink: "https://open.spotify.com/album/3knh0sDKjE63NkxLLz27rY?si=4tq55k50RYaLaMh76b6lcA",
    jobType: "Full Production"
  },
  {
    artistName: "Divine Comedy Club",
    albumName: "Out For Launch (Single)",
    description: "Seattle based atmosphereic and psychadelic band's first single release, fronted by a powerful female vocalist.",
    coverArt: "images/artists/dcc_-_launch.",
    artistLink: "https://open.spotify.com/artist/0V3wNDGlwNMLVEaLXaUohT",
    albumLink: "https://open.spotify.com/album/4kdDONVqMXR8XP3IchLR85",
    jobType: "Full Production"
  },
  {
    artistName: "drew.",
    albumName: "Ballin For U (Single)",
    description: "Snowqualmie, WA based hip hop artists with clear Juice WRLD influences, meshing rapping with singing.",
    coverArt: "images/artists/drew._-_ballin_4_u.",
    artistLink: "https://soundcloud.com/drew-johnson-382771780/tracks",
    albumLink: "https://soundcloud.com/drew-johnson-382771780/ballin-for-u",
    jobType: "Mixing & Mastering"
  },
  {
    artistName: "E.M. Bodwick",
    albumName: "Broken Bones",
    description: "North Bend, WA based artist with threads of new wave, psycadelic rock, and americana.",
    coverArt: "images/artists/em_bodwick_broken_bones.",
    artistLink: "https://open.spotify.com/artist/6oyWVVf5PLnmNLUBV7CunO?si=CZoKMfp7QgG6SoVTumd0VQ",
    albumLink: "https://open.spotify.com/album/24Zkut36T227XvnmiGaNAp?si=hal__GgURMi5cdrhyKB-ng",
    jobType: "Full Production"
  },
  {
    artistName: "Fairvalley",
    albumName: "The Dogwoods",
    description: "Folky songs from singer/songwriter Joe Larson.",
    coverArt: "images/artists/dogwoods.",
    artistLink: "https://open.spotify.com/artist/1iggIBZxWLdFI1rY89OVYw?si=3PuOHan6QEKY9vyMbmiW7Q",
    albumLink: "https://open.spotify.com/album/4YMmjPbejY5Dj2o8iYy0Um?si=Ol6zY0gnTKeEaxHuRsyfaw",
    jobType: "Mastering"
  },
  {
    artistName: "Glen Ridge",
    albumName: "All The Things (LP)",
    description: "Folky bluegrass musings of singer/songwriter Glen Ridge.",
    coverArt: "images/artists/glen_ridge.",
    artistLink: "",
    albumLink: "",
    jobType: "Full Production"
  },
  {
    artistName: "Jindos",
    albumName: "Horror Machine (EP)",
    description: "The second release from the Washingtonian band.",
    coverArt: "images/artists/jindos.",
    artistLink: "https://open.spotify.com/artist/0b8VQ84NzFUWFfvlVqFHHK?si=Cu9J0NKPRzuKx7X_a_VeWQ",
    albumLink: "https://open.spotify.com/album/2GdhSwyI5WtO2LknA0F8AM?si=yPAiDz6sQQqjBnxUNWXAYw",
    jobType: "Full Production"
  },
  {
    artistName: "Luna Nova",
    albumName: "What are you, gay? (EP)",
    description: "Trip hop, jazztronic, downtemp songs about coming out as a non-binary",
    coverArt: "images/artists/lunanova.",
    artistLink: "",
    albumLink: "",
    jobType: "Full Production"
  },
  {
    artistName: "Miners Work",
    albumName: "Miners Work (LP)",
    description: "Tallahasse based indie frat rock",
    coverArt: "images/artists/miners_work.",
    artistLink: "",
    albumLink: "https://soundcloud.com/user-359899219/sets/miners-work",
    jobType: "Full Production"
  },
  {
    artistName: "PiKLE",
    albumName: "PiKLE",
    description: "Seattle based proto-metal jam band with clearn influences from Motorhead and the Doors",
    coverArt: "images/artists/pikle_pikle.",
    artistLink: "https://open.spotify.com/artist/22ykSXntw7I4Xsg3NXaQnp?si=RBF76Tg3SrWQCTyPGNnwfw",
    albumLink: "https://open.spotify.com/album/0yCdRNgraRU7kmXEZZDsfG?si=SW1paQnMTrylE9Sb-uMgOw",
    jobType: "Full Production"
  },
  {
    artistName: "Plateau",
    albumName: "Everything Was Sweet (LP)",
    description: "Seattle based indie rock band with clear influences from both the gunge era as well as the British pop invasion of the 60s.",
    coverArt: "images/artists/plateau.",
    artistLink: "https://plateauseattle.bandcamp.com/",
    albumLink: "https://soundcloud.com/user-359899219/sets/plateau-everything-was-sweet",
    jobType: "Mixing & Mastering"
  },
  {
    artistName: "Red Is Recovery",
    albumName: "Red Is Recovery (LP)",
    description: "Debut album of Tallahassee based indie rock band that kicked off local fame leading to regional followings and label attention.",
    coverArt: "images/artists/red_is_recovery.",
    artistLink: "https://open.spotify.com/artist/6inp8VYBZ7iQb9DFe6rbZI?si=6C6tReDHS3Se7yOqTlQfFg",
    albumLink: "https://open.spotify.com/album/36hIX7KYySRYxgzMXjXJjq?si=Ltn-88-mT1KrcRTeJNw7QA",
    jobType: "Full Production"
  },
  {
    artistName: "Red Is Recovery",
    albumName: "Goodbyes Are New Beginnings (EP)",
    description: "The follow up to their debut album released immedately before the band relocated to Orlando, FL.",
    coverArt: "images/artists/red_is_recovery_2.",
    artistLink: "https://open.spotify.com/artist/6inp8VYBZ7iQb9DFe6rbZI?si=6C6tReDHS3Se7yOqTlQfFg",
    albumLink: "https://open.spotify.com/album/0NyNRHSNoay2z38vwWDMPA?si=NVwAlNS9Rn2P7dIbLJT5Hw",
    jobType: "Full Production"
  },
  {
    artistName: "Red Is Recovery",
    albumName: "Two Years (EP)",
    description: "The first release with the band's seoond singer, release after their move to Orlando, FL",
    coverArt: "images/artists/rir_two_years.",
    artistLink: "https://open.spotify.com/artist/6inp8VYBZ7iQb9DFe6rbZI?si=6C6tReDHS3Se7yOqTlQfFg",
    albumLink: "https://open.spotify.com/album/10Ye6qvHQJ0Bb2mvhmUPQ0?si=XW_IdpEtRi6lSAlsA1W7Aw",
    jobType: "Co-Production"
  },
  {
    artistName: "Red Is Recovery",
    albumName: "Chillin Like Freeman (EP)",
    description: "The final release the band ever had, and arguable the most successful",
    coverArt: "images/artists/rir_freeman.",
    artistLink: "https://open.spotify.com/artist/6inp8VYBZ7iQb9DFe6rbZI?si=6C6tReDHS3Se7yOqTlQfFg",
    albumLink: "https://open.spotify.com/album/1qmbGjxqeKSdtp9t01HvFU?si=KqOkFgRZTUq6qr2C2FSQEQ",
    jobType: "Co-Production"
  },
  {
    artistName: "The Lively Arts",
    albumName: "A New Age?",
    description: "Snoqualmie valley based old school punk rock band, with influences from the 70s and 80s punk scenes.",
    coverArt: "images/artists/the_lively_arts.",
    artistLink: "https://open.spotify.com/artist/3SiyA3K1Cau4lTfz4lWQlj?si=WQ1LbTDzSzyKNfsIuNW_SA",
    albumLink: "https://open.spotify.com/album/2DWWUKmAIQwycWnaNGJS5X?si=G-FC3pyATZq58v57pS3MiQ",
    jobType: "Full Production (selected tracks)"
  },
  {
    artistName: "The Run Out",
    albumName: "The Six Pack (EP)",
    description: "The Leavenworth, WA outfit's second album.",
    coverArt: "images/artists/the_run_out_1.",
    artistLink: "https://open.spotify.com/artist/2KC2HcmRWU73FqDgejf3jg?si=ei5s-mTTR8u0rst3ONUcCw",
    albumLink: "https://open.spotify.com/album/38ArNVv4nJc9dW9pGMO5zO?si=_6ISExkHS6uD2MJSAkz89Q",
    jobType: "Full Production"
  },
  {
    artistName: "Sharkeologist",
    albumName: "Sharkeologist",
    description: "Sophmore album of Seattle indie rock band Sharkeologist",
    coverArt: "images/artists/Sharkeologist_Sharkeologist.",
    artistLink: "https://open.spotify.com/artist/3UqK7v9C14OxGRxNlhAXpt?si=_jB8HiF1QkmxxWMkgSUIMg",
    albumLink: "https://open.spotify.com/album/0hryQIBSPHrSE5cFitfJYV?si=d1y7NVnxSfae7gNJHEn6SQ",
    jobType: "Full Production"
  },
  {
    artistName: "Sharkeologist",
    albumName: "The Last Gasp",
    description: "Debut album of Seattle indie rock band Sharkeologist",
    coverArt: "images/artists/Sharkeologist_Last_Gasp.",
    artistLink: "https://open.spotify.com/artist/3UqK7v9C14OxGRxNlhAXpt?si=_jB8HiF1QkmxxWMkgSUIMg",
    albumLink: "https://open.spotify.com/album/3tyk99wfmyyDSRqFoS3JYE?si=eQ6U4DVpTdGfTCf6n5xjAA",
    jobType: "Mixing & Mastering"
  },
  {
    artistName: "Tormenta",
    albumName: "Junge Dead (Single)",
    description: "Debut single of Seattle death thrash band",
    coverArt: "images/artists/tormenta_jungle_dead.",
    artistLink: "https://open.spotify.com/album/6KPsurCBJSHooFyDZtIrLu?si=uGRs2d0MToS_pcaZzbsHdQ",
    albumLink: "https://open.spotify.com/album/6KPsurCBJSHooFyDZtIrLu?si=uGRs2d0MToS_pcaZzbsHdQ",
    jobType: "Full Production"
  },
  {
    artistName: "Violent Insurrection",
    albumName: "Arson (EP)",
    description: "Debut release of Seattle death thrash band",
    coverArt: "images/artists/violent_insurrection_arson.",
    artistLink: "https://open.spotify.com/artist/05FydTe5LjHJgDRJWhfp5V?si=VgY-FKzzQKKOpKVztkiR_A",
    albumLink: "https://open.spotify.com/album/1ijqYxDzRz90aIavkZ85aH?si=ZW5Jzg4IQE6ZL0EVDJnaQg",
    jobType: "Full Production"
  }
];
