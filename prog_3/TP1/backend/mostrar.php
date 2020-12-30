<?php
include_once(__DIR__.'/validarSesion.php');
include_once(__DIR__.'/empleado.php');
include_once(__DIR__.'/fabrica.php');

if(true)
{
    $null = false;
    $miFabrica = new Fabrica("Turimar");
    $miFabrica->TraerDeArchivo("empleados.txt");
    $empleado = $miFabrica->GetEmpleados();
    if($empleado != null)
    {
            echo "
            <HTML>
                <head>
                <script src='../javascript/validaciones.js'></script>
                <title>HTML 5 – Listado de Empleados</title>
                    <style>
                    th, td 
                    {
                        padding: 5px;
                        text-align: left;    
                    }
                    </style>
                    
                </head>
                <body>
                <form id='form' action='../index.php' method='POST' >
                    <h2>Listado de Empleados</h2>
                    <table border='0' align='center'>
                    <tr>
                    <th colspan='2'><h4>Info</h4></th>
                    </tr>
                    <tr>
                        <th colspan='4'><hr><th>
                    </tr>";
        foreach ($empleado as $emp) 
        {
            $auxLeg = $emp->GetLegajo();
            $path = $emp->GetPathFoto();
            $DNI = $emp->GetDni();
            echo "
                    <tr>
                        <td >".$emp->ToString() . "</td>
                        <td><image src='../$path'width='90' height='90'></td>
                        <td><a href='eliminar.php?legajo=$auxLeg'>Eliminar<br/></a></td>
                        
                        <td><input type='button' value='Modificar' onclick='AdministrarModificar($DNI)'></td>
                    </tr>";       
        }
        echo "
                    <input type='hidden' id='inpHidden' value='' name='hdnModEmp'>
                    <tr><th colspan='4'><hr><th></tr>
                    <tr><td><a href='../index.php'>Alta de Empleados<br/></a></td></tr>
                    <tr><td><a href='./cerrarSesion.php'>Deslogear</a></td></tr>
                    </table>
                    </form>
                </body>
            </html>";
    }
    else
    {
        header("refresh:1;url=../index.php");
    }
}    
?>