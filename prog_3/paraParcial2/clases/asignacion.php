<?php
    class Asignacion
    {
        public int $legajo;
        public int $id;
        public string $turno;
        public array $asignaciones;

        public function __construct($legajo, $id, $turno)
        {
            $this->legajo = $legajo;
            $this->id = $id;
            $this->turno = $turno;
            $this->asignaciones = array();
        }

        public function ToString()
        {
            return $this->legajo . "-" . $this->id . "-" . $this->turno;
        }

        public function TraerArchivo()
        {
            $archivo = fopen("archivo/materias-profesores.txt", "r");
                while(!feof($archivo))
                {
                    $auxArch = fgets($archivo);
                    $aux = explode("-", $auxArch);
                    for($i = 0; $i < sizeof($aux); $i++)
                    {
                        $aux[$i] = trim($aux[$i]);
                    }
                    if($aux[0] != ""){
                        $auxAsigna = new Profesor($aux[0], $aux[1]);
                        $this->AgregarAsignacion($auxAsigna);
                    }
                }
            fclose($archivo);
        }

        public function AgregarAsignacion($asignacion)
        {
            array_push($this->asignaciones, $asignacion);
        }

        #region Guardamos en Archivo.
        public function GuardarEnArchivo()
        {
            $archivo = fopen("archivo/materias-profesores.txt", "a");
            fwrite($archivo, $this->ToString() . "\r\n");
            fclose($archivo);
        }
        #endregion

        public function esUnico() : bool
        {
            $retorno = true;
            $this->TraerArchivo();
            foreach($this->asignaciones as $asignacion)
            {
                if($asignacion->id == $this->id && $asignacion->legajo == $this->legajo)
                {
                    $retorno = false;
                    break;
                }
            }
            return $retorno;
        }
    }
?>