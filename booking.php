<!doctype html>
<html lang="en">

<? include('./head-nav.php'); ?>

  <div class="container-fluid">
    <div class="container">

      <section id="booking">

        <h1 class="text-center">BOOKING</h1>
        <p id="userMessage">
          We are always looking to work with new artists. Fill out the form below and someone will get back
          to you as soon as we can!
        </p>
        <form id="contactForm" method="post" action="process-form.php">
          <div class="form-group">
            <label for="name">Name</label>
            <input type="text" class="form-control" name="name" id="name" placeholder="Name">
          </div>
          <div class="form-group">
            <label for="email">Email Address</label>
            <input type="email" class="form-control" name="email" id="email" aria-describedby="emailHelp" placeholder="Email">
            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="start-date">Desired Start Date</label>
              <input type="date" class="form-control" name="start-date" id="start-date" placeholder="mm/dd/yyyy">
            </div>
            <div class="form-group col-md-6">
              <label for="end-date">Desired End Date</label>
              <input type="date" class="form-control" name="end-date" id="end-date" placeholder="mm/dd/yyyy">
            </div>
          </div>
          <div class="form-group">
              <label for="service">Tell us what you are looking for:</label>
              <select class="form-control" name="service" id="service">
                <option value="">Select:</option>
                <option value="Tracking">Tracking</option>
                <option value="Mixing">Mixing</option>
                <option value="Mastering">Mastering</option>
                <option value="Full Production">Full Production</option>
                <option value="Commercial Services">Commercial Servies</option>
                <option value="Other">Other</option>
              </select>
          </div>
          <div class="form-group">
              <label for="message">Message:</label>
              <textarea class="form-control" name="message" id="message" rows="3"></textarea>
          </div>
          <div class="form-group">
            <div class="g-recaptcha" data-sitekey="6LdScEkUAAAAAJMH5SrBbIKSwEe_PWGVp0ycVsgR"></div>
          </div>
          <button id="submit" type="submit" class="btn btn-outline-dark text-right">Submit</button>
          <input type="hidden" name="token" id="token" value="<? echo md5(date('YmdH') . "D4teS4lt"); ?>" />
        </form>

      </section>
    </div>
  </div>

<? include('./footer.php'); ?>

</html>
