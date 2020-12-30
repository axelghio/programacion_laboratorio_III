<?php
include_once(__DIR__ . '/empleado.php');
include_once(__DIR__ . '/fabrica.php');
    //recupero el legajo del empleado a eliminar
    $legajo = $_GET["legajo"];
    $fabrica = new Fabrica("Turimar");
    $fabrica->TraerDeArchivo("empleados.txt");
    $turimar = $fabrica->GetEmpleados();
    foreach ($turimar as $emp) {
        if($emp->GetLegajo() == $legajo)
        {
            if($fabrica->EliminarEmpleado($emp) != false)
            {
                $fabrica->GuardarEnArchivo("empleados.txt");
                echo "Se elimino correctamente al empleado";
                header("refresh:3;url=./mostrar.php");
            }
            else
            {
                echo "No se pudo eliminar el empleado.";
                header("refresh:3;url=./mostrar.php");
            }
           
        }
    }
?>