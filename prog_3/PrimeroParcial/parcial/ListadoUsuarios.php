<?php
require_once "clases/Usuario.php";

$usuarios = Usuario::TraerTodos();
$mostrar = " ";
foreach($usuarios as $user)
{
    $mostrar .= $user->ToString() . "<br>";
}

echo $mostrar;
?>