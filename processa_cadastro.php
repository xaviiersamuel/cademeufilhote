<?php
    require_once 'conexao.php';

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $nome = $_POST['nome'];
        $telefone = $_POST['telefone'];
        $email = $_POST['email'];
        $senha = $_POST['senha'];

        $senha_criptografada = password_hash($senha, PASSWORD_DEFAULT);

        $stmt_check = $conn->prepare("SELECT id FROM usuarios WHERE email = ?");
        $stmt_check->bind_param("s", $email);
        $stmt_check->execute();
        $stmt_check->store_result();

        if ($stmt_check->num_rows > 0) {
            echo "<script>
                    alert('Este e-mail já está cadastrado no sistema!');
                    window.location.href='cadastro.html';
                </script>";
        } else {
            
            $stmt_insert = $conn->prepare("INSERT INTO usuarios (nome, telefone, email, senha) VALUES (?, ?, ?, ?)");
            $stmt_insert->bind_param("ssss", $nome, $telefone, $email, $senha_criptografada);

            if ($stmt_insert->execute()) {
                echo "<script>
                        alert('Cadastro realizado com sucesso!');
                        window.location.href='login.html';
                    </script>";
            } else {
                echo "<script>
                        alert('Erro ao realizar o cadastro. Tente novamente.');
                        window.location.href='cadastro.html';
                    </script>";
            }
            $stmt_insert->close();
        }
        
        $stmt_check->close();
        $conn->close();
    }
?>