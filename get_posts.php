<?php
    require_once 'conexao.php';
    header('Content-Type: application/json; charset=utf-8');

    $query = "SELECT p.*, u.nome AS autor_nome 
            FROM posts p 
            JOIN usuarios u ON p.usuario_id = u.id 
            ORDER BY p.data_postagem DESC";

    $result = $conn->query($query);
    $postagens = [];

    if ($result) {
        while ($row = $result->fetch_assoc()) {
            $postagens[] = [
                'id' => $row['id'],
                'usuario_id' => $row['usuario_id'],
                'usuario' => $row['autor_nome'], 
                'descricao' => $row['descricao'],
                'imagem' => $row['imagem'],
                'tipo' => $row['tipo'],
                'raca' => $row['raca'],
                'cor' => $row['cor'],
                'porte' => $row['porte'],
                'animal' => $row['animal'],
                'contato' => $row['contato'],
                'localizacao' => $row['localizacao'],
                'data' => $row['data_postagem']
            ];
        }
    }

    echo json_encode($postagens, JSON_UNESCAPED_UNICODE);
    $conn->close();
?>