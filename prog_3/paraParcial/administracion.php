<?php
    include_once 'clases/empleado.php';
    include_once 'clases/fabrica.php';

    $muestro = isset($_POST['opcion']) ? $_POST['opcion'] : NULL;
    //Datos a recibir
    $apellido = isset($_POST['apellido']) ? $_POST['apellido'] : NULL;
    $nombre = isset($_POST['nombre']) ? $_POST['nombre'] : NULL;
    $dni = isset($_POST['dni']) ? $_POST['dni'] : NULL;
    $legajo = isset($_POST['legajo']) ? $_POST['legajo'] : NULL;
    $sueldo = isset($_POST['sueldo']) ? $_POST['sueldo'] : NULL;
    $foto = isset($_FILES['foto']) ? $_FILES['foto'] : NULL;
    
    try {
        $usuario='root';
        $clave='310393';
        $objetoPDO = new PDO('mysql:host=localhost;dbname=empleados;charset=utf8', $usuario, $clave);
    } 
    catch (PDOException $e) 
    {
        echo $e->getMessage();
    }
    
    $path = "archivos/empleados.txt";
    $miFabrica = new Fabrica("Pitusas", 1000);

    switch ($muestro) {
        case 'alta':
            if($apellido != NULL && $nombre != NULL && $dni != NULL && $legajo != NULL && $sueldo != NULL)
            {
                $miFabrica->TraerDeArchivo($path);
                $emp = new Empleado($apellido, $nombre, $dni, $legajo, $sueldo);

                $emp->SetFoto($miFabrica->AgregarFoto($emp));
                if($miFabrica->AgregarEmpleado($emp))
                { 
                    $consulta = $objetoPDO->prepare("INSERT INTO tablaempleados (apellido, nombre, dni, legajo, sueldo, foto) VALUES (:apellido, :nombre, :dni, :legajo, :sueldo, :foto)");
                    $consulta->bindValue(":apellido", $emp->GetApellido());
                    $consulta->bindValue(":nombre", $emp->GetNombre());
                    $consulta->bindValue(":dni", $emp->GetDni());
                    $consulta->bindValue(":legajo", $emp->GetLegajo());
                    $consulta->bindValue(":sueldo", $emp->GetSueldo());
                    $consulta->bindValue(":foto", $emp->GetFoto());
                    if($consulta->execute())
                    {
                        echo "salio todo bien" . PHP_EOL;
                    }
                    else
                    {
                        echo "salio todo mal";
                    }
                    echo "Se agrego el empleado Exitosamente!!" . PHP_EOL;
                }
                $miFabrica->GuardarEnArchivo($path);
            }    
            else
            {
                echo "Error, Datos incorrectos o NULL".PHP_EOL;
            }
            break;

        case 'baja':
            if($dni != NULL)
            {
                $miFabrica->TraerDeArchivo($path);
                $miFabrica->EliminarEmpleado($dni);
                $consulta = $objetoPDO->prepare("DELETE FROM tablaempleados WHERE dni=:dni");
                $consulta->bindValue(":dni", $dni);
                if($consulta->execute())
                {
                    echo "salio todo bien";
                }
                else
                {
                    echo "salio todo mal";
                }
                $miFabrica->GuardarEnArchivo($path);
            }
            else
            {
                echo "Error, Datos incorrectos o NULL".PHP_EOL;
            }
            break;

        case 'modificar':
            if($apellido != NULL && $nombre != NULL && $sueldo != NULL)
            {
                $miFabrica->TraerDeArchivo($path);
                $emp = new Empleado($apellido, $nombre, $dni, $legajo, $sueldo, $foto);
                if($miFabrica->ModificarEmpleado($emp))
                {
                    $miFabrica->GuardarEnArchivo($path);
                    echo "Se modifico exitosamente el empleado.".PHP_EOL;
                    $consulta = $objetoPDO->prepare("UPDATE tablaempleados SET apellido=:apellido, nombre=:nombre, dni=:dni,legajo=:legajo, sueldo=:sueldo, foto=:foto WHERE dni=:dni");
                    $consulta->bindValue(":apellido", $emp->GetApellido());
                    $consulta->bindValue(":nombre", $emp->GetNombre());
                    $consulta->bindValue(":dni", $emp->GetDni());
                    $consulta->bindValue(":legajo", $emp->GetLegajo());
                    $consulta->bindValue(":sueldo", $emp->GetSueldo());
                    $consulta->bindValue(":foto", $fabrica->BuscarFoto($empleadoAux));
                    if($consulta->execute())
                    {
                        echo "salio todo bien";
                    }
                    else
                    {
                        echo "salio todo mal";
                    }
                }
                else
                {
                    echo "No se encontro el empleado que se desea modificar".PHP_EOL;
                }
            }
            else
            {
                echo "Error, Datos incorrectos o NULL".PHP_EOL;
            }
            break;

        case 'mostrar':
            $miFabrica->TraerDeArchivo($path);
            $empleados = $miFabrica->GetEmpleados();
            $obj = new stdClass();
            if(count($empleados) == 0)
            {
                echo "No hay empleados para mostrar.".PHP_EOL;
            }
            else
            {
                
                $consulta = $objetoPDO->prepare("SELECT apellido, nombre, dni, legajo, sueldo, foto FROM tablaempleados");
                $consulta->execute();
                $catidadFilas = $consulta->rowCount();

                //$obj->Html = "Cantidad de filas: " . $catidadFilas . "---";
                echo "MUESTO DESDE BASE DE DATOS:" . PHP_EOL;
                $resultado = $consulta->fetchall();
                foreach ($resultado as $fila) {
                    echo 
                    "////////////////////////////////////". PHP_EOL.PHP_EOL.
                    "- Apellido: " . $fila['apellido'] . PHP_EOL.
                    "- Nombre: " . $fila['nombre'] . PHP_EOL.
                    "- DNI: " . $fila['dni'] . PHP_EOL.
                    "- Legajo: " . $fila['legajo'] . PHP_EOL.
                    "- Sueldo: " . $fila['sueldo'] . PHP_EOL.
                    "- Foto: " . $fila['foto'] . PHP_EOL;
                }
                echo PHP_EOL . "*************************************" . PHP_EOL;
                echo "MUESTO DESDE TXT:" . PHP_EOL.PHP_EOL;
                foreach ($empleados as $emp) 
                {
                    echo $emp->ToString().PHP_EOL;
                }
            }
            break;
        default:
            echo "error";
            break;
    }
?>