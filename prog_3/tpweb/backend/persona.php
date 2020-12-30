<?php
abstract class Persona
{
    private $_apellido;
    private $_dni;
    private $_nombre;
    private $_sexo;

    public function __construct($apellido, $nombre, $dni, $sexo)
    {
        $this->_apellido = $apellido;
        $this->_nombre = $nombre;
        $this->_dni = $dni;
        $this->_sexo = $sexo;
    }

    public function GetApellido():string
    {
        return $this->_apellido;
    }
    public function GetNombre():string
    {
        return $this->_nombre;
    }
    public function GetDni():int
    {
        return $this->_dni;
    }
    public function GetSexo():string
    {
        return $this->_sexo;
    }
    
    abstract public function Hablar($idioma):string;

    public function ToString():string
    {
        return $this->GetApellido() . "-" . $this->GetNombre() . "-" . $this->GetDni() . "-" . $this->GetSexo();
    }
}
?>