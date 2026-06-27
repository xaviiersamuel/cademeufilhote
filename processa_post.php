<?php
session_start();
require_once 'conexao.php';
header('Content-Type: application/json; charset=utf-8');

if (!isset($_SESSION['usuario_id'])) {
    echo json_encode(['success' => false, 'message' => 'Usuário não autenticado.']);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    $usuario_id  = $_SESSION['usuario_id'];
    $descricao   = $data['descricao'] ?? '';
    $imagem      = $data['imagem'] ?? '';
    $tipo        = $data['tipo'] ?? 'perdido';
    $animal      = $data['animal'] ?? '';
    $raca        = $data['raca'] ?? '';
    $porte       = $data['porte'] ?? '';
    $idade       = $data['idade'] ?? '';
    $cor         = $data['cor'] ?? '';
    $bairro      = $data['bairro'] ?? '';
    $contato     = $data['contato'] ?? '';
    $localizacao = $data['localizacao'] ?? '';

    if (empty($contato) || empty($localizacao)) {
        echo json_encode(['success' => false, 'message' => 'Contato e Localização são obrigatórios.']);
        exit();
    }

    $stmt = $conn->prepare("INSERT INTO posts (usuario_id, descricao, imagem, tipo, animal, raca, porte, idade, cor, bairro, contato, localizacao) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("isssssssssss", $usuario_id, $descricao, $imagem, $tipo, $animal, $raca, $porte, $idade, $cor, $bairro, $contato, $localizacao);

    if ($stmt->execute()) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'message' => $conn->error]);
    }

    $stmt->close();
    $conn->close();
}
?>