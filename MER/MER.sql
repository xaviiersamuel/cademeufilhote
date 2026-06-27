CREATE TABLE `Usuario` (
  `id_usuario` int PRIMARY KEY AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `email` varchar(100) UNIQUE NOT NULL,
  `senha` varchar(255) NOT NULL,
  `cidade` varchar(100) NOT NULL,
  `membro_desde` timestamp DEFAULT (now())
);

CREATE TABLE `Postagem` (
  `id_post` int PRIMARY KEY AUTO_INCREMENT,
  `id_usuario` int NOT NULL,
  `tipo_post` varchar(20) NOT NULL COMMENT 'Pode ser: Perdido, Achado ou Adoção',
  `imagem_pet` text NOT NULL,
  `animal` varchar(50) NOT NULL,
  `porte` varchar(30) NOT NULL,
  `raca` varchar(50),
  `idade` varchar(30),
  `cor` varchar(50) NOT NULL,
  `bairro` varchar(100) NOT NULL,
  `localizacao` varchar(255) NOT NULL,
  `contato_post` varchar(100) NOT NULL,
  `descricao` text COMMENT 'Limite de 1000 caracteres',
  `data_publicacao` timestamp DEFAULT (now())
);

ALTER TABLE `Postagem` ADD FOREIGN KEY (`id_usuario`) REFERENCES `Usuario` (`id_usuario`);
