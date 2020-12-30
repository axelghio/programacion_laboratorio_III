<?php
require_once "clases/Televisor.php";
$tipo = isset($_POST["tipo"]) ? $_POST["tipo"] : null;
$precio = isset($_POST["precio"]) ? $_POST["precio"] : null;
$paisOrigen = isset($_POST["paisOrigen"]) ? $_POST["paisOrigen"] : null;
$televisor = new Televisor($tipo,$precio,$paisOrigen);

if($televisor->Agregar())
{
    echo "se ha guardado con exito";
}
else
{
    echo "no se ha podido guardar";
}
?>