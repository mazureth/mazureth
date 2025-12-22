<!doctype html>
<html lang="en">

<?php include('./head-nav.php'); ?>

<div class="container-fluid">
  <div class="container">


    <section id="diffuser">
      <h1 class="text-center">Diffuser Generator</h1>
      <p>
        Width <input type="number" id="plywoodWidthIn" value="48" min="1" max="96">
        Height <input type="number" id="plywoodHeightIn" value="48" min="1" max="48">
      </p>
      <div id="renderedDiffuser">
      </div>
    </section>

  </div>
</div>
<?php include('./footer.php'); ?>

</html>