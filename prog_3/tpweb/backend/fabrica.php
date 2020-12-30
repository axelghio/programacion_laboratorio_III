<?php
include_once("interfaces.php");
include_once("empleado.php");
class Fabrica implements IArchivo
{
    private $_cantidadMaxima;
    private $_empleados;
    private $_razonSocial;

    public function __construct($razonSocial)
    {
        $this->_cantidadMaxima = 7;
        $this->_empleados = array();
        $this->_razonSocial = $razonSocial;
    }

    public function AgregarEmpleado(Empleado $empleado):bool
    {
        $retorno = false;
        if($empleado != NULL)
        {
            if(sizeof($this->_empleados) < $this->_cantidadMaxima)
            {
                array_push($this->_empleados, $empleado);
                $this->EliminarEmpleadoRepetidos();
                $retorno = true;
            }
        }
        return $retorno;
    }

    public function CalcularSueldos():float
    {
        $total = 0;
        foreach ($this->_empleados as $item ) 
        {
            $total = $total + $item->GetSueldo();
        }
        return $total;
    }

    public function EliminarEmpleado(Empleado $emp):bool
    {
        $retorno = false;
        for ($i=0; $i < count($this->_empleados); $i++) { 
            if($this->_empleados[$i] == $emp)
            {
                //Borrar Archivo.
                $path = $emp->GetPathFoto();
                $path = trim($path);
                $modificado = substr($path, 8, strlen($path));
                $link ="../fotos/".$modificado;
                unlink($link);

                unset($this->_empleados[$i]);
                $this->EliminarEmpleadoRepetidos();
                $retorno = true;
                break;
            }
        }
        return $retorno;
    }

    private function EliminarEmpleadoRepetidos()
    {
        $this->_empleados = array_unique($this->_empleados, SORT_REGULAR);
    }

    public function ToString():string
    {
        $retorno = "Empleados: <br/>";
        $retorno = "Razon Social : " . $this->_razonSocial . "<br/>";
        $retorno = $retorno . "Total Sueldos : " . $this->CalcularSueldos() . "<br/>";
        foreach ($this->_empleados as $item) 
        {
            if($item != null)
            {
                $retorno = $retorno . $item->ToString() . "<br/>";
            }
        }
        return $retorno;
    }

    public function GetEmpleados():array
    {
        return $this->_empleados;
    }

    //LEVANTAR ARCHIVOS
    public function TraerDeArchivo($nombreArchivo):void
    {
        $archivo = fopen($_SERVER["DOCUMENT_ROOT"] . '/archivos/' . $nombreArchivo, "r");
        while(!feof($archivo))
        {
            $auxArch = fgets($archivo);
            $empleados = explode("-", $auxArch);
            $empleados[0] = trim($empleados[0]);
            if($empleados[0] != ""){
                $emp = new Empleado($empleados[0], $empleados[1], $empleados[2], $empleados[3], $empleados[4], $empleados[5], $empleados[6]);
                $emp->SetPathFoto($empleados[7]."-".$empleados[8]);
                $this->AgregarEmpleado($emp);
            }
        }
        fclose($archivo);
    }

    //GUARDAR ARCHIVO
    public function GuardarEnArchivo($nombreArchivo):void
    {
        $archivo = fopen($_SERVER["DOCUMENT_ROOT"] . '/archivos/' . $nombreArchivo, "w");
        foreach ($this->_empleados as $item) {
            fwrite($archivo, $item->ToString() . "\r\n");
        }
        fclose($archivo);
    }
}
?>