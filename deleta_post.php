<?php
    session_start();
    require_once 'conexao.php';
    header('Content-Type: application/json; charset=utf-8');

    if (!isset($_SESSION['usuario_id'])) {
        echo json_encode(['success' => false, 'message' => 'Acesso não autorizado.']);
        exit();
    }

    $data = json_decode(file_get_contents('php://input'), true);
    $post_id = $data['post_id'] ?? 0;
    $usuario_logado = $_SESSION['usuario_id'];

    $stmt = $conn->prepare("DELETE FROM posts WHERE id = ? AND usuario_id = ?");
    $stmt->bind_param("ii", $post_id, $usuario_logado);

    if ($stmt->execute() && $stmt->affected_rows > 0) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Erro ao deletar ou você não tem permissão para excluir este post.']);
    }

    $stmt->close();
    $conn->close();
?>