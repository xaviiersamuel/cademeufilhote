<?php

    $host = "localhost";
    $usuario = "root"; 
    $senha = "";      
    $banco = "cade_meu_filhotinho";

    $conn = new mysqli($host, $usuario, $senha, $banco);


    if ($conn->connect_error) {
        die("Falha na conexão com o banco de dados: " . $conn->connect_error);
    }

    $conn->set_charset("utf8mb4");

?>