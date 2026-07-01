<?php
  session_start();
?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Cadê meu filhotinho? - Feed</title>

 <script>
      window.currentUser = <?php echo isset($_SESSION['usuario_id']) ? json_encode([
          'id' => $_SESSION['usuario_id'],
          'nome' => $_SESSION['usuario_nome'],
          'email' => $_SESSION['usuario_email'],
          'membroDesde' => $_SESSION['usuario_ano']
      ]) : 'null'; ?>;
  </script>

  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="assets/css/style.css?v=<?php echo time(); ?>" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,500;1,500&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:ital,wght@0,600;1,600&display=swap" rel="stylesheet">
</head>

<body>
  <div id="navbar-container"></div>

  <div class="layout container-fluid">
    <div class="row g-0">
      <aside id="sidebar-left-container" class="col-lg-3 left-col d-none d-xl-block"></aside>

      <main id="feed" class="col-12 col-xl-5 col-xl-5 content-col">
        <button class="post-cta" onclick="location.href='postar.php'">Quer postar algo?</button>
        <section id="feedPosts"></section>
      </main>
    </div>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
  <script src="js/loadComponents.js"></script>
  <script src="assets/js/app.js?v=<?php echo time(); ?>"></script>
</body>
</html>
