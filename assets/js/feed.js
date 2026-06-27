let posts = [
  {
    id: "1",
    usuario: "Samuel",
    descricao: "Encontrei esse cachorro no centro!",
    imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNTpfeBF1Bf7IilhGGVTN3466wzHY1ihA2JcbqKqH937SrN9rEC1cKHk-Rtg7RBN2cM0lrsqXl4oiWjQvSVEQj7SJ1L8XYVhr2p_iXJDZ8&s=10",
    tipo: "encontrado",
    raca: "Desconhecida",
    cor: "Caramelo",
    porte: "Médio",
    animal: "Cachorro",
    data: "Hoje",
    comentarios: []
  },
  {
    id: "2",
    usuario: "Maria",
    descricao: "Gatinho para adoção ❤️",
    imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNSwF5RGb0FxnTQYXGYDpLW04PlSbsyvXR3Hgx6xK5FhFDaX6KCgSUxGW-SK0JR3Q-TH91VZrG4vR5affNnLZhKcHUJEsvP_Ma7tFLKWzc&s=10",
    tipo: "adoção",
    raca: "Vira-lata",
    cor: "Preto",
    porte: "Pequeno",
    animal: "Gato",
    data: "Hoje",
    comentarios: []
  }
];
function renderizarPosts() {
  const feed = document.getElementById("feed");

  posts.forEach((post, index) => {
    const postHTML = `
      <div class="post-card">
        
        <div class="post-header">
          <h3>${post.usuario}</h3>
          <span>${post.data}</span>
        </div>

        <p>${post.descricao}</p>

        ${post.imagem ? `<img src="${post.imagem}" class="post-img">` : ""}

        <div class="post-info">
          <span><strong>Animal:</strong> ${post.animal}</span>
          <span><strong>Raça:</strong> ${post.raca}</span>
          <span><strong>Cor:</strong> ${post.cor}</span>
          <span><strong>Porte:</strong> ${post.porte}</span>
        </div>

      </div>
    `;

    feed.innerHTML += postHTML;
  });
}
renderizarPosts();