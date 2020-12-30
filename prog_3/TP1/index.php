<?php
$document_root = $_SERVER['DOCUMENT_ROOT'];
include_once($document_root.'/prog_3/TPS/TP1/backend/fabrica.php');
$modificar = false;
if(isset($_POST["hdnModEmp"]) ? TRUE:FALSE)
{
    $dni = $_POST["hdnModEmp"];
    $miFabrica = new Fabrica("Rocklets");
    $miFabrica->TraerDeArchivo("empleados.txt");
    $empleados = $miFabrica->GetEmpleados();
    foreach ($empleados as $emp)
    {
        $empDNI = $emp->GetDni();
        if($dni == $empDNI) 
        {
            $empApe = $emp->GetApellido();
            $empNom = $emp->GetNombre();
            $empSex = $emp->GetSexo();
            $empLeg = $emp->GetLegajo();
            $empSuel = $emp->GetSueldo();
            $empTurn = $emp->GetTurno();
            $modificar = true;
            break;
        }
    }
}

?>
<!DOCTYPE html>
<html lang='en'>
<head>
    <meta charset='UTF-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <script src='./javascript/validaciones.js'></script>
    <?php
    if($modificar)
    {
        echo "<title>HTML 5 – Formulario Modificar Empleado</title>";
    }
    else
    {
        echo "<title>HTML 5 – Formulario Alta Empleado</title>";
    }
    ?>
    <style>
        table, th, td {
          border: 0px solid black;
          border-collapse: collapse;
        }
        th, td {
          padding: 3px;
          text-align: left;    
        }
    </style>
    </head>
<body>
    <form id='formindex' action='backend/administracion.php' method='POST' enctype='multipart/form-data'>
        <?php
        if($modificar)
        {
            echo "<h2>Modifica Empleados</h2>";
        }
        else
        {
            echo "<h2>Alta Empleados</h2>";
        }
        ?>
        <table align='center'>
            <!--DATOS PERSONALES-->
            <tr>
                <th colspan='2'><h4>Datos Personales</h4></th>
            </tr>
            <!--Linea divisora-->
            <tr>
            <th colspan='2' align='center'><hr></th>
            </tr>
            <!--DNI-->
            <tr>
            <td style='width: 50px;'>DNI:</td>
            <?php
            if($modificar)
            {
                echo "<td><input type='number' name='txtDni' id='dni' value='$empDNI' min='1000000' step='1' max='55000000'></td>";
            }
            else
            {
                echo "<td><input type='number' name='txtDni' id='dni' value='1' min='1000000' step='1' max='55000000'></td>";
            }
            ?>   
            </tr>
            <tr>
                <td><span id='spnDNI' style='display:none;'>*</span></td>
            </t
            <!--Apellido-->
            <tr>
                <td>Apellido:</td>
            <?php
                if($modificar)
                {
                    echo "<td><input type='text' name='txtApellido' id='apellido' value= '$empApe'></td>";
                }
                else
                {
                    echo "<td><input type='text' name='txtApellido' id='apellido'></td>";
                }
            ?>
            </tr>
            <tr>
                <td><span id='spnApellido' style='display:none;'>*</span></td>
            </tr>
            <!--Nombre-->
            <tr>
                <td>Nombre: 
                <?php
                if($modificar)
                {
                    echo "<td><input type='text' name='txtNombre' id='nombre' value='$empNom'></td>";
                }
                else
                {
                    echo "<td><input type='text' name='txtNombre' id='nombre'></td>";
                }
                ?>
            </tr>
            <tr>
                <td><span id='spnNombre' style='display:none;'>*</span></td>
            </tr>
            <!--Sexo-->
            <tr>
                <td>Sexo:</td>
                <td>
                <?php
                if($modificar)
                {
                    if($empSex == "hombre")
                    {
                        echo "
                        <select id='cboSexo' name='cboSexo'>
                        <option value='seleccione'>Seleccione</option>
                        <option value='hombre' selected>Hombre</option>
                        <option value='mujer'>Mujer</option>
                        </select>";
                    }
                    else if($empSex == "mujer")
                    {
                        echo "
                        <select id='cboSexo' name='cboSexo'>
                        <option value='seleccione'>Seleccione</option>
                        <option value='hombre'>Hombre</option>
                        <option value='mujer' selected>Mujer</option>
                        </select>";
                    }
                }
                else
                {
                    echo "
                        <select id='cboSexo' name='cboSexo'>
                        <option value='seleccione' selected>Seleccione</option>
                        <option value='hombre'>Hombre</option>
                        <option value='mujer'>Mujer</option>
                        </select>";
                }
                ?>
                </td>
            </tr>
            <tr>
                <td><span id='spnSexo' style='display:none;'>*</span></td>
            </tr>
            
            <!--DATOS LABORALES-->
            <tr>
                <th colspan='2' style='text-align: left;'><h4>Datos Laborales</h4></th>
            </tr>
            <!--Linea divisora-->
            <tr>
                <th colspan='2'><hr></th>
            </tr>
            
            <!--Degajo-->
            <tr>
                <td>Legajo:</td>
                <?php
                if($modificar)
                {
                    echo "<td><input type='number' name='txtLegajo' id='legajo' value='$empLeg' min='100' max='550' step='1'></td>";
                }
                else
                {
                    echo "<td><input type='number' name='txtLegajo' id='legajo' value='1' min='100' max='550' step='1'></td>";
                }
                ?>
            </tr>
            <tr>
                <td><span id='spnLegajo' style='display:none;'>*</span></td>
            </tr>
            <!--Sueldo-->
            <tr>
                <td>Sueldo:</td>
                <?php
                if($modificar)
                {
                    echo "<td><input type='number' name='txtSueldo' id='sueldo' value='$empSuel' min='8000' step='500'></td>";
                }
                else
                {
                    echo "<td><input type='number' name='txtSueldo' id='sueldo' value='1' min='8000' step='500'></td>";
                }
                ?>
                
            </tr>
            <tr>
                <td><span id='spnSueldo' style='display:none;'>*</span></td>
            </tr>
            <!--Turno-->
            <tr>
                <td colspan='2'>Turno:</td>
            </tr>
            <?php
            if($modificar)
            {
                if($empTurn == "Maniana")
                {
                    echo "
                    <tr>
                        <td colspan='2'><input type='radio' name='rdoTurno' value='Maniana' checked style='margin-left: 20%;'>Ma&ntilde;ana</td>
                    </tr>
                    <tr>
                        <td colspan='2'><input type='radio' name='rdoTurno' value='Tarde' style='margin-left: 20%;'>Tarde</td>
                    </tr>
                    <tr>
                        <td colspan='2'><input type='radio' name='rdoTurno' value='Noche' style='margin-left: 20%;'>Noche</td>
                    </tr>";
                }
                else if($empTurn == "Tarde")
                {
                    echo "
                    <tr>
                        <td colspan='2'><input type='radio' name='rdoTurno' value='Maniana' style='margin-left: 20%;'>Ma&ntilde;ana</td>
                    </tr>
                    <tr>
                        <td colspan='2'><input type='radio' name='rdoTurno' value='Tarde' checked style='margin-left: 20%;'>Tarde</td>
                    </tr>
                    <tr>
                        <td colspan='2'><input type='radio' name='rdoTurno' value='Noche' style='margin-left: 20%;'>Noche</td>
                    </tr>";
                }
                else
                {
                echo "
                    <tr>
                        <td colspan='2'><input type='radio' name='rdoTurno' value='Maniana' style='margin-left: 20%;'>Ma&ntilde;ana</td>
                    </tr>
                    <tr>
                        <td colspan='2'><input type='radio' name='rdoTurno' value='Tarde' style='margin-left: 20%;'>Tarde</td>
                    </tr>
                    <tr>
                        <td colspan='2'><input type='radio' name='rdoTurno' value='Noche' checked style='margin-left: 20%;'>Noche</td>
                    </tr>";
                }
            }
            else
            {
                echo "
                <tr>
                    <td colspan='2'><input type='radio' name='rdoTurno' value='Maniana' checked style='margin-left: 20%;'>Ma&ntilde;ana</td>
                </tr>
                <tr>
                    <td colspan='2'><input type='radio' name='rdoTurno' value='Tarde' style='margin-left: 20%;'>Tarde</td>
                </tr>
                <tr>
                    <td colspan='2'><input type='radio' name='rdoTurno' value='Noche' style='margin-left: 20%;'>Noche</td>
                </tr>";
            }
            ?>
            <!--Seleccionar Foto-->
            <tr>
                <td colspan='1'>Foto:</td>
                <td><input type='file' name='archivo' id='archivo' class='Foto'/></td>
            </tr>
            <!--Linea divisora-->
            <tr>
                <th colspan='2'><hr></th>
            </tr>
            <!--Botones-->
            <tr>
                <td colspan='2' style='text-align: right;'><input type='reset' value='Reset'></td>
            </tr>
            <?php
            if($modificar)
            {
                echo "
                <tr>
                    <td colspan='2' style='text-align: right;'><input type='button' name='guardar' id='guardar' value='Modificar' onclick='AdministrarValidaciones()'></td>
                    <input type='hidden' id='inpHidden' value='$empDNI' name='hdnModificar'>
                </tr>";
            }
            else
            {
                echo "
                <tr>
                    <td colspan='2' style='text-align: right;'><input type='button' name='guardar' id='guardar' value='Enviar' onclick='AdministrarValidaciones()'></td>
                </tr>";
            }
            
            ?>
        </table>
    </form>
</body>