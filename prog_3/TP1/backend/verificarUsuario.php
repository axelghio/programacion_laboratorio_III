<?php
include_once(__DIR__.'/empleado.php');
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
        if($empleado[0] != ""){
            $empleado = new Empleado($empleado[0], $empleado[1], $empleado[2], $empleado[3], $empleado[4], $empleado[5], $empleado[6]);
            $empDNI = $empleado->GetDni();
            $empApe = $empleado->GetApellido();
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
        $_SESSION["DNIEmpleado"] = $DNI;
        echo "Se logeo correctamente.";
        header("refresh:2;url=./mostrar.php");
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
    echo "false";
}
?>