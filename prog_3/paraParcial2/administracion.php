<?php
include_once('clases/usuario.php');
include_once('clases/materia.php');
include_once('clases/profesor.php');
include_once('clases/asignacion.php');

$opcion = isset($_POST['opcion']) ? $_POST['opcion'] : NULL;
//Datos a recibir
$email = isset($_POST['email']) ? $_POST['email'] : NULL;
$clave = isset($_POST['clave']) ? $_POST['clave'] : NULL;
$nombre = isset($_POST['nombre']) ? $_POST['nombre'] : NULL;
$cuatrimestre = isset($_POST['cuatrimestre']) ? $_POST['cuatrimestre'] : NULL;
$nombreprof = isset($_POST['nombreprof']) ? $_POST['nombreprof'] : NULL;
$legajo = isset($_POST['legajo']) ? $_POST['legajo'] : NULL;
$foto = isset($_FILES['foto']) ? $_FILES['foto'] : NULL;
$id = isset($_POST['id']) ? $_POST['id'] : NULL;
$turno = isset($_POST['turno']) ? $_POST['turno'] : NULL;

switch ($opcion) {
    case 'usuario':
        if($email != NULL && $clave != NULL)
        {
            $user = new usuario($email, $clave);
            $user->GuardarEnArchivo();
            echo "se guardo correctamente el empleado.". PHP_EOL;
        }
        break;

    case 'login':
        {
            $user = new usuario($email, $clave);
            if($user->Login() == false)
            {
                echo "no existe el usuario ingresado." . PHP_EOL;
            }
            else
            {
                echo "Logeado correactamente.". PHP_EOL;
            }
        }
        break;
    case 'materia':
        {
            $materia = new Materia($nombre, ((int)$cuatrimestre));
            $materia->id = $materia->BuscarUltimoID();
            $materia->GuardarEnArchivo();
            echo "se guardo la materia correctamente." . PHP_EOL;
        }
        break;

    case 'profesor':
        {
            $prof = new Profesor($nombreprof, ((int)$legajo));
            if($prof->Existe())
            {
                echo "El profesor ya existe." . PHP_EOL;
            }
            else
            {
                $prof->SetFoto($prof->AgregarFoto($prof));
                $prof->GuardarEnArchivo();
                echo "Se Agrego exitosamente el profesor." . PHP_EOL;
            }
        }
        break;

    case 'asignacion':
        {
            if($id != NULL && $legajo != NULL && $turno != NULL)
            {
                $asig = new Asignacion($legajo, $id, $turno);
                if($asig->esUnico())
                {
                    $asig->GuardarEnArchivo();
                    echo "Se Agrego exitosamente la asignacion." . PHP_EOL;
                }
            }
        }
        break;
    default:
        echo "Opcion Invalida." . PHP_EOL;
        break;
}
?>