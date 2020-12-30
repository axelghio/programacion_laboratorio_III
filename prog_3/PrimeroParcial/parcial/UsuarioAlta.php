<?php

require_once "clases/Usuario.php";

$email = isset($_POST["email"]) ? $_POST["email"] : null;
$clave = isset($_POST["clave"]) ? $_POST["clave"] : null;

if($email != NULL && $clave != NULL)
{
    $usuario = new Usuario($email, $clave);
    $validacion = $usuario->GuardarEnArchivo();
    echo $validacion;
}
else
{
    echo "Parametros NULOS." . PHP_EOL;
}
?>