<script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
<script>
  (function() {
    var scriptTag = document.createElement('script');
    scriptSrc = '',
      body = document.querySelector('body');
    if (window.location.host.indexOf('localhost') > -1) {
      scriptSrc = 'cdn/js/script.js';
    } else {
      scriptSrc = 'https://mazureth.com/cdn/js/script.min.js';
    }
    scriptTag.src = scriptSrc;
    body.appendChild(scriptTag);
  })();
</script>

</body>