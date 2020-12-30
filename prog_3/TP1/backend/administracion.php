<?php
include_once(__DIR__ . '/empleado.php');
include_once(__DIR__ . '/fabrica.php');
$alta = isset($_POST["guardar"]) ? TRUE:FALSE;
$modEmp = isset($_POST["hdnModificar"]) ? TRUE:FALSE;
$archivoOk = false;
if($alta)
{
    $fabrica = new Fabrica("AxelCorp");
    $fabrica->TraerDeArchivo("empleados.txt");
    
    if($modEmp)
    {
        foreach ($fabrica->GetEmpleados() as $emp) {
            $dni = $emp->GetDni();
            if($dni == $modEmp)
            {
                $fabrica->EliminarEmpleado($emp);
                break;
            }
        }
    }

    $path = "fotos/".$_FILES["archivo"]["name"];
    $upload = true;
    $tipoArchivo = pathinfo($path, PATHINFO_EXTENSION); 
    $name = "./fotos/". $_POST["txtDni"] . "-" . $_POST["txtApellido"] . "." . $tipoArchivo;
    if(file_exists($path))
    {
        echo "El Archivo ya existe. Verificar!!";
        $upload = false;
    }
    if($_FILES["archivo"]["size"] > 100000)
    {
        echo "El archivo es mas grande que lo permitido.";
        $upload = false;
    }
    $esImagen = getimagesize($_FILES["archivo"]["tmp_name"]);
    if($esImagen === false)
    {
       echo "solo son permitidas imagenes";
       $upload = false;
    }
    else
    {
        if($tipoArchivo != "jpg" && $tipoArchivo != "bmp" && $tipoArchivo != "gif" && $tipoArchivo != "png" && $tipoArchivo != "jpeg") {
            echo "Solo son permitidos archivos con extension  JPG, BMP, GIF, PNG o JPEG.";
            $upload = false;
        }
    }
    if($upload)
    {
        if (move_uploaded_file($_FILES["archivo"]["tmp_name"], ".".$name)) {
            echo "<br/>El archivo ". basename( $_FILES["archivo"]["name"]). " ha sido subido exitosamente.";
            $archivoOk = true;
        } else {
            echo "<br/>Lamentablemente ocurri&oacute; un error y no se pudo subir el archivo.";
        }
    }
    else
    {
        echo "<br/>NO SE PUDO SUBIR EL ARCHIVO.";
    }
    
    if($archivoOk)
    {
        $empleado = new Empleado($_POST["txtApellido"], $_POST["txtNombre"],$_POST["txtDni"], $_POST["cboSexo"], $_POST["txtLegajo"], $_POST["txtSueldo"], $_POST["rdoTurno"]);
        $empleado->SetPathFoto($name);
        if($fabrica->AgregarEmpleado($empleado) == TRUE)
        {
            $fabrica->GuardarEnArchivo("empleados.txt");
            echo "Se agrego exitosamente el empleado.";
            header('Location: ./mostrar.php');
        }
        else
        {
            echo "Error, al agregar el empleado a la fabrica. ";
            header('Location: ../index.php');
        }
    }
}
?>