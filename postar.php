<?php
session_start();
if (!isset($_SESSION['usuario_id'])) {
    header("Location: login.html");
    exit();
}
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Cadê meu filhotinho? - Postar</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="assets/css/style.css" />
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

      <main class="col-12 col-lg-5 content-col">
        <section class="post-card">
          <div class="d-flex align-items-center gap-3 mb-3"><a href="index.php"
              class="text-dark text-decoration-none">←</a>
            <div class="chips"><button class="chip active">Perdido</button><button
                class="chip">Achado</button><button class="chip">Adoção</button></div>
          </div><label class="upload-box" id="uploadBox" for="photoInput"><input id="photoInput" type="file" accept="image/*"
              hidden><span id="uploadText">Adicione uma foto do seu pet</span><img id="previewImage"
              hidden alt="Pré-visualização"></label>
          <div class="crop-controls" id="cropControls" hidden>
            <label class="zoom-control" for="zoomInput">Zoom
              <input id="zoomInput" type="range" min="1" max="3" step="0.01" value="1">
            </label>
            <small class="crop-hint">Arraste a imagem para ajustar o enquadramento</small>
          </div>
          <input id="croppedImageData" type="hidden" name="croppedImageData">
          <div class="meta-grid">
            <label class="meta-field">Animal:
              <input class="meta-input" type="text" name="animal" placeholder="Digite o animal">
            </label>
            <label class="meta-field">Porte:
              <input class="meta-input" type="text" name="porte" placeholder="Digite o porte">
            </label>
            <label class="meta-field">Raça:
              <input class="meta-input" type="text" name="raca" placeholder="Digite a raça">
            </label>
            <label class="meta-field">Idade:
              <input class="meta-input" type="text" name="idade" placeholder="Digite a idade">
            </label>
            <label class="meta-field">Cor:
              <input class="meta-input" type="text" name="cor" placeholder="Digite a cor">
            </label>
            <label class="meta-field">Bairro:
              <input class="meta-input" type="text" name="bairro" placeholder="Digite o bairro">
            </label>
            <label class="meta-field">Contato:
              <input class="meta-input" type="text" name="contato" id="contatoInput" placeholder="Digite o contato" required>
            </label>
          </div><textarea class="desc-input" maxlength="1000"
            placeholder="Escreva uma descrição... (opcional)"></textarea>
          <label class="location-field d-flex justify-content-between">
            <input class="location-input" type="text" name="localizacao" id="localizacaoInput" placeholder="Adicionar localização" required>
            <span>📍</span>
          </label><button class="publish-btn mt-3" id="publishBtn">Publicar</button>
        </section>
      </main>
    </div>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
  <script src="js/loadComponents.js"></script>
  <script src="assets/js/app.js"></script>
</body>
</html>
