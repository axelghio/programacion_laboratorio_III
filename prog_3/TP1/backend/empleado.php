<?php
include_once(__DIR__ . '/persona.php');
class Empleado extends Persona
{
    protected int $_legajo;
    protected string $_pathFoto;
    protected float $_sueldo;
    protected string $_turno;

    public function __construct($apellido, $nombre, $dni, $sexo, $legajo, $sueldo, $turno) 
    {
        parent::__construct($apellido, $nombre, $dni, $sexo);
        $this->_legajo = $legajo;
        $this->_sueldo = $sueldo;
        $this->_turno = $turno;
    }

    public function GetLegajo():int
    {
        return $this->_legajo;
    }

    public function GetPathFoto():string
    {
        return $this->_pathFoto;
    }

    public function GetSueldo():float
    {
        return $this->_sueldo;
    }
    public function GetTurno():string
    {
        return $this->_turno;
    }

    public function Hablar($idioma = "Español, Inglés, Francés"):string
    {
        $cadena = "El empleado habla ";
        $cadena .= $idioma;
        return $cadena;
    }

    public function SetPathFoto(string $foto):void
    {
        $this->_pathFoto = $foto;
    }

    public function ToString():string
    {
        return parent::ToString() . "-" . $this->GetLegajo() . "-" . $this->GetSueldo() . "-" . $this->GetTurno() . "-" . $this->GetPathFoto();
    }
}
?>