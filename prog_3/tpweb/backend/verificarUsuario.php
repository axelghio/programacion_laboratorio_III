<?php
include_once("empleado.php");
$flag = false;
if(!empty($_POST["guardarLogin"]))
{
    $archivo = fopen("../archivos/empleados.txt", "r");
    while(!feof($archivo))
    {
        $DNI = $_POST["txtDni"];
        $APELLIDO = $_POST["txtApellido"];
        $archAux = fgets($archivo);
        $empleado = explode("-", $archAux);
        $empleado[0] = trim($empleado[0]);
        if($empleado[0] != "")
        {
            $empDNI = $empleado[2];
            $empApe = $empleado[0];
            if($empDNI == $DNI && $empApe == $APELLIDO)
            {
                $flag = true;
                break;
            }
        }
    }
    if($flag)
    {
        //inicializo la sesion
        session_start();
        $_SESSION["DNIEmpleado"] = $_POST["txtDni"];
        echo "Se logeo correctamente.".PHP_EOL;
        header("refresh:3;url=./mostrar.php");
        exit;
    }
    else
    {
        echo "Error, No se encontro ningun Empleado con ese DNI y Apellido.";
        header("refresh:3;url=../login.html");
    }
    fclose($archivo);
}
else
{
    echo "ERROR 404";
}
?>