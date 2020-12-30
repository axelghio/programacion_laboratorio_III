<?php
require_once "clases/usuario.php";
date_default_timezone_set("America/Argentina/Buenos_Aires");
$email = isset($_POST["email"]) ? $_POST["email"] : null;
$clave = isset($_POST["clave"]) ? $_POST["clave"] : null;

if($email != NULL && $clave != NULL)
{
    $usuario = new Usuario($email, $clave);

    if(Usuario::VerificarExistencia($usuario))
    {
        setcookie($_POST["email"],date("d-m-y") . " - ". date("H:i:s"));
        header("location: ListadoUsuarios.php");
    }
    else
    {
        $retorno = "El usuario ingresado no existe";
        return $retorno;
    }
}
else
{
    echo "Los valores ingresados son nulos." . PHP_EOL;
}
?>