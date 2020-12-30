<?php
    abstract class Persona
    {
        private string $apellido;
        private string $nombre;
        private int $dni;

        function __construct($apellido, $nombre, $dni)
        {
            $this->apellido = $apellido;
            $this->nombre = $nombre;
            $this->dni = $dni;
        }

        public function GetApellido()
        {
            return $this->apellido;
        }

        public function GetNombre()
        {
            return $this->nombre;
        }

        public function GetDni()
        {
            return $this->dni;
        }

        public function SetApellido($apellido)
        {
            $this->apellido = $apellido;
        }

        public function SetNombre($nombre)
        {
            $this->nombre = $nombre;
        }

        public function SetDni($dni)
        {
            $this->dni = $dni;
        }

        public function ToString()
        {
            return $this->GetApellido() . "-" . $this->GetNombre() . "-" . $this->GetDNI();
        }
    }
?>