<?php
session_start();
include_once("fabrica.php");
$miFabrica = new Fabrica("Turimar");
$miFabrica->TraerDeArchivo("empleados.txt");
$empleado = $miFabrica->GetEmpleados();

require_once $_SERVER["DOCUMENT_ROOT"] . '/vendor/autoload.php';

header('content-type:application/pdf');

$mpdf = new \Mpdf\Mpdf(['orientation' => 'P', 
                        'pagenumPrefix' => 'Página nro. ',
                        'pagenumSuffix' => ' - ',
                        'nbpgPrefix' => ' de ',
                        'nbpgSuffix' => ' páginas']);
                        
$mpdf->SetHeader('Ghio Axel||{PAGENO}{nbpg}');

$grilla = '<table class="table" border="1" align="center">
            <thead>
                <tr>
                    <th>  APELLIDO </th>
                    <th>  NOMBRE   </th>
                    <th>  DNI      </th>
                    <th>  SEXO     </th>
                    <th>  LEGAJO   </th>
                    <th>  SUELDO   </th>
                    <th>  TURNO    </th>
                    <th>  FOTO     </th>
                </tr> 
            </thead>';   	

foreach ($empleado as $emp){
    $grilla .= "<tr>
                    <td>".$emp->GetApellido()."</td>
                    <td>".$emp->GetNombre()."</td>
                    <td>".$emp->GetDni()."</td>
                    <td>".$emp->GetSexo()."</td>
                    <td>".$emp->GetLegajo()."</td>
                    <td>".$emp->GetSueldo()."</td>
                    <td>".$emp->GetTurno()."</td>
                    <td><img src='.".$emp->GetPathFoto()."' width='100px' height='100px'/></td>
                </tr>";
}

$grilla .= '</table>';

$mpdf->WriteHTML("<h3>Listado de Empleados</h3>");
$mpdf->WriteHTML("<br>");

$mpdf->WriteHTML($grilla);
$mpdf->setFooter('|http://axel.tonohost.com|');
$pass = $_SESSION["DNIEmpleado"];
$mpdf->SetProtection(array(), $pass, $pass);
$mpdf->Output();

?>