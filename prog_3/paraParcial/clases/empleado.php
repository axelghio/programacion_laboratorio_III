<?php
    include_once 'clases/persona.php';
    class Empleado extends Persona{
        private int $legajo;
        private float $sueldo;
        private string $foto;

        public function __construct($apellido, $nombre, $dni, $legajo, $sueldo)
        {
            parent::__construct($apellido, $nombre, $dni);
            $this->legajo = $legajo;
            $this->sueldo = $sueldo;
        }

        public function GetLegajo()
        {
            return $this->legajo;
        }

        public function GetSueldo()
        {
            return $this->sueldo;
        }

        public function GetFoto()
        {
            return $this->foto;   
        }

        public function SetLegajo($legajo)
        {
            $this->legajo = $legajo;
        }

        public function SetSueldo($sueldo)
        {
            $this->sueldo = $sueldo;
        }

        public function SetFoto($foto)
        {
            $this->foto = $foto;
        }

        public function ToString()
        {
            return parent::ToString() . "-" . $this->GetLegajo() . "-" . $this->GetSueldo() . "-" . $this->GetFoto();
        }
    }
?>