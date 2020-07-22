<!doctype html>
<html lang="en">

<? include('./head-nav.php'); ?>

  <div class="main container-fluid">

    <section id="welcome" class="bg-black mixer">
      <img src="https://cdn.mazureth.com/images/mazureth-logo-white.svg" class="img-fluid" alt="Mazureth Logo" />
    </section>

    <section id="about">
      <div class="container">
        <h1>ABOUT</h1>
        <div class="row">
          <div class="col-sm">
              <figure class="figure">
                <img src="https://cdn.mazureth.com/images/jesse.jpg" class="figure-image img-fluid rounded grayscale" alt="Castle Dwellers album cover" />
                <figcaption class="figure-caption">JESSE MAZUR</figcaption>
              </figure>
          </div>
          <div class="col-sm-8">
            <p class="text-justify">
              Jesse Mazur, owner, producer, and engineer at Mazureth Studios, has been producing music since
              2003 and playing for much longer. He's worked with artists ranging from ambient electronic to
              technical death metal and everything inbetween. He's toured the country in several
              bands and has been signed to both Altantic and Dream Works records. Whether you need an audio
              engineering, a producer, help with arragement, or writing, Jesse is more than capable.
            </p>
            <p class="text-justify">
              Jesse's also a multi-instumentalist and is happy to do session work on your album as well.
              While his primary instrument is guitar, he is also a skilled drummer and can play most stringed
              instruments, most brass instruments, and can navigate is way around a piano pretty well. He also has
              several years of singing and vocal lessons under his belt. It's very common for Jesse to appear
              on the albums created at Mazureth Studios.
            </p>
            <blockquote class="text-left">
              <p class="mb-0"><em>"I just love music and being a part of the creative process. I am never having more fun than when
              I am making music with people"</em></p>
              <footer class="blockquote-footer"><cite title="Jesse Mazur">Jesse Mazur</cite></footer>
            </blockquote>
          </div>
        </div>

        <h2 id="services">SERVICES</h2>
        <ul class="nav nav-tabs nav-justified" id="services" role="tablist">
          <li class="nav-item">
            <a class="nav-link active" id="recording-tab" data-toggle="tab" href="#recording" role="tab" aria-controls="home" aria-selected="true">
              <i class="icon ion-mic-a large"></i>
              <span class="sr-only">recording details</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" id="mixing-tab" data-toggle="tab" href="#mixing" role="tab" aria-controls="mixing" aria-selected="false">
              <i class="icon ion-levels large"></i>
              <span class="sr-only">mixing details</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" id="mastering-tab" data-toggle="tab" href="#mastering" role="tab" aria-controls="mastering" aria-selected="false">
              <i class="icon ion-disc large"></i>
              <span class="sr-only">mastering details</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" id="production-tab" data-toggle="tab" href="#production" role="tab" aria-controls="production" aria-selected="false">
              <i class="icon ion-ios-infinite large"></i>
              <span class="sr-only">production details</span>
            </a>
          </li>
        </ul>
        <div class="tab-content text-left" id="services-content">
          <div class="tab-pane fade show active" id="recording" role="tabpanel" aria-labelledby="recording-tab">
            <div class="container">
              <h4>Tracking</h4>
              <p>
                We have a large acoustingly tuned live room, a state of the art control room, and a plethora
                if microphones, guitars, and amps at your disposal on top of whatever you bring with you.
                We also have several digital instruments and midi controllers as well.
              </p>
            </div>
          </div>
          <div class="tab-pane fade" id="mixing" role="tabpanel" aria-labelledby="mixing-tab">
            <div class="container">
              <h4>Mixing</h4>
              <p>
                Our mixing console is a Behringer X32 Digital Console which we can use to as a Mackie
                Controller or to send the multitrack back out of Cubase for mixing "out of the box".
                Add in all our software and ourboard gear and theres nothing we cant do!
              </p>
            </div>
          </div>
          <div class="tab-pane fade" id="mastering" role="tabpanel" aria-labelledby="mastering-tab">
            <div class="container">
              <h4>Mastering</h4>
              <p>
                Our control room has been tuned to fit our Event 20/20 studio monitors and we know
                just how to get your music that final polish it needs to be radio ready. We also play
                your music back in the most common listening environmetns to be sure it will sound perfect.
              </p>
            </div>
          </div>
          <div class="tab-pane fade" id="production" role="tabpanel" aria-labelledby="production-tab">
            <div class="container">
              <h4>Production</h4>
              <p>
                We offer full production services that include pre-production "scratch" tracking, tracking,
                mixing, mastering, and post-production editing. We can also help with writing, arrangement,
                and suggest post-produciton additions to really make your sound stand out. We've got the total package.
              </p>
            </div>
          </div>
        </div>

        <h2 id="rates">RATES</h2>

        <div class="row">
          <div class="col">
            <div class="card">
              <div class="card-header">
                <strong>Studio Sessions</strong>
              </div>
              <div class="card-body">
                <p>Studio sessions include the use of our entire facility: the live room, control room, and studio gear. </p>
                <p class="rate"><sup><small>$</small></sup>50<span class="unit">/hour</span></p>
                <p class="rate"><sup><small>$</small></sup>350<span class="unit">/day<sup>*</sup></span></p>
                <a href="booking.php" class="btn btn-secondary">Book Now</a>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card">
              <div class="card-header">
                <strong>Mixing</strong>
              </div>
              <div class="card-body">
                <p>Mixing service includes importing your files into our DAW plus the use of our control room.</p>
                <p class="rate"><sup><small>$</small></sup>50<span class="unit">/hour</span></p>
                <p class="rate"><sup><small>$</small></sup>200<span class="unit">/song<sup>†</sup></span></p>
                <a href="booking.php" class="btn btn-secondary">Book Now</a>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card">
              <div class="card-header">
                <strong>Mastering</strong>
              </div>
              <div class="card-body">
                <p>Mastering service includes importing stereo mixes into our DAW and returing a final polished song.</p>
                <p class="rate"><sup><small>$</small></sup>70<span class="unit">/song</span></p>
                <p class="rate"><sup><small>$</small></sup>750<span class="unit">/LP<sup>§</sup></span></p>
                <a href="booking.php" class="btn btn-secondary">Book Now</a>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card">
              <div class="card-header">
                <strong>Commercial Services</strong>
              </div>
              <div class="card-body">
                <p>Commercial services include voice overs, audio books, cleanup, sound design and more.</p>
                <p class="rate"><sup><small>$</small></sup>65<span class="unit">/hour</span></p>
                <p class="rate"><sup><small>$</small></sup>500<span class="unit">/day<sup>*</sup></span></p>
                <a href="booking.php" class="btn btn-secondary">Book Now</a>
              </div>
            </div>
          </div>
        </div>
        <div>
        <p class="footnote"><sup>*</sup> One billable day is 9 ½ hours and includes a 1 hour break for lunch as
          well as two 15 minute "ear fatigue" breaks for the engineer. Typically the engineer is never sitting for
          more than 2 consecutive hours. Any time beyond 9 ½ hours will be billed at the hourly rate.</p>

        <p class="footnote"><sup>†</sup> The $200 song rate for mixing assumes that you will send us the multitrack
          and accept what we return with a maximum 3 rounds of feedback. For a more involved post-production process
          we will assume the hourly rate or work out a special deal with the client.</p>

        <p class="footnote"><sup>§</sup> The $750 LP flat rate assumes that the LP has a length of approx. 45 minutes
          or 12 songs. Anything outside of that range will require us to use the per song rate or work out a
          speical deal with the client.</p>
        </div>
      </div>
    </section>

    <section id="studio" class="bg-black">
      <div class="container">
        <h1>STUDIO</h1>
        <div class="row">
          <div class="col-sm text-left">
            <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
              <ol class="carousel-indicators">
                <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
              </ol>
              <div class="carousel-inner">
                <div class="carousel-item active">
                  <img class="d-block w-100" src="https://cdn.mazureth.com/images/live-room.jpg" alt="Live Room">
                </div>
                <div class="carousel-item">
                  <img class="d-block w-100" src="https://cdn.mazureth.com/images/control-room.jpg" alt="Control Room">
                </div>
                <div class="carousel-item">
                  <img class="d-block w-100" src="https://cdn.mazureth.com/images/van.jpg" alt="The Van">
                </div>
              </div>
            </div>
          </div>
          <div class="col-sm text-left">
            <h3>Overview</h3>
            <p>
              Our main console is a Behriner X32 coupled with a Behriner S32 snake. This provides us with
              32 inputs and 16 outputs. More than enough for even the largest bands. We have a plethroa of
              microphones including all the industry standards from Shure, Sennheiser, Rode, and more. Our
              powerful recoding PC has 32 gigs of ram, a quad core Intel processor, and several terabytes of
              solid state storage.
            </p>
            <p>
              We also have tons of outboard gear including compressors, preamps, equializers, are more.
              There are plenty of amps at your disposal, an arsenal of guitars and basses, and our in house
              drum set which as been perfectly tuned to the room and miced up. We can even dial in specific
              drum tones for you with our existing presets.
            </p>
            <p>
              We even have a van you can rent by the hour, day, or week to help move your equipment to and from
              the stuio, or to go on tour with.
            </p>
            <p class="text-center">
              <a class="btn btn-outline-light" href="gearlist.php">FULL GEAR LIST</a>
            </p>
          </div>
        </div>
      </div>
    </section>

    <section id="clients">
      <div class="container">
        <h1>CLIENTS</h1>
        <p>
          We have recoreded with some incredible artists over the years and have build some great relationships that we
          hope to maintain for years to come.
        </p>
        <div class="row">
          <div class="col-sm">
            <a href="https://www.facebook.com/anthroceneband/" target="_blank" rel="noreferrer">
              <figure class="figure">
                <img src="https://cdn.mazureth.com/images/artists/castle-dwellers.jpg" class="figure-image img-fluid rounded artist-image" alt="Castle Dwellers - Like the Waving Sea">
              </figure>
            </a>
          </div>
          <div class="col-sm">
            <iframe src="https://open.spotify.com/embed/album/5Ry7lYkRmmtkYa00lPAje0" width="350" height="350" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
          </div>
          <div class="col-sm text-justify">
            <h3>Castle Dwellers</h3>
            <p>
              Castle Dwellers were a Seattle based sunshine rock band, fronted by singer, songwriter, and multi-instrumentalist
              Jared Hauser who is accompanied by guitarist James Haagenson, bassist Boris Sagal, and
              drummer Alex Folkerth. Their musical style spaned a broad spectrum ranging from slow blues grooves to power pop,
              but with a common denominator that seemed to tie it all togehter. This album marked the bands 
              final release as life took many of its members in different directions. Jared and Boris continue to have 
              a presence in other Seattle outfits High Romantics and Anthrocene respectively.
            </p>
          </div>
        </div>
      </div>
      <a class="btn btn-outline-dark" href="clients.php">VIEW FULL CLIENT LIST</a>
      <br /><br /><br />
      <h1>TESTIMONIALS</h1>
      <div class="container text-center testimonials">
        <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
          <div class="carousel-inner">
            <div class="carousel-item active">
              <p class="lead">
                <em>"Listens to your suggestions and makes the recording process super easy and simple!
                  Would definitely recommend this place!"</em>
              </p>
              <cite title="Julian Forester - 400.40">Julian Forester (400.40)</cite>
            </div>
            <div class="carousel-item">
              <p class="lead">
                <em>"Killer drum sounds - very impressed!!! Tracked a whole album of drums in 3 days,
                  Jesse is a wizard. 10/10"</em>
              </p>
              <cite title="Alex Folkerth - Castle Dwellers">Alex Folkerth (Castle Dwellers)</cite>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="contact" class="bg-black">
      <div class="container">
        <h1>LET'S TALK</h1>
        <p>
          Interested in working with us? Drop us a line! We are always taking on new clients
          and would <br />love to hear from you. We have competitive rates and can work within
          your budget.
        </p>

        <a class="btn btn-lg btn-outline-light" href="booking.php">BOOK NOW</a>

        <hr />

        <p>Mazureth Studios<br />480th Ave SE<br />North Bend, WA 98045</p>
        <p>(206) 395 - 9009</p>
        <p>info@mazureth.com</p>

        <p class="social">
          <a class="btn btn-outline-light" href="https://www.facebook.com/mazurethstudios" target="_blank" rel="noreferrer">
            <i class="icon ion-social-facebook med"></i>
          </a>
          <a class="btn btn-outline-light" href="https://www.instagram.com/mazurethllc/" target="_blank" rel="noreferrer">
            <i class="icon ion-social-instagram med"></i>
          </a>
          <a class="btn btn-outline-light" href="tel:2063959009">
            <i class="icon ion-social-whatsapp med"></i>
          </a>
        </p>

      </div>
      <p class="copyright">&copy; 2003 - <? echo date("Y"); ?> Mazureth LLC. All Rights Reserved</p>
    </section>

  </div>

<? include('./footer.php'); ?>

</html>
