<?php
class Materia{
    public string $nombre;
    public int $cuatrimetre;
    public array $materias;
    public int $id;

    public function __construct($nombre, int $cuatrimetre)
    {

        $this->nombre = $nombre;
        $this->cuatrimetre = $cuatrimetre;
        $this->materias = array();
    }

    public function AgregarID()
    {
        $this->TraerArchivo();
        if(count($this->materias)==0)
        {
            $this->id = 0;
        }
        else
        {
            $this->id = $this->materias[count($this->materias) -1]->id + 1;
        }
    }

    public function ToString() : string
    {
        return $this->id . "-" . $this->nombre . "-" . $this->cuatrimetre;
    }

    #region Guardamos en Archivo.
    public function GuardarEnArchivo()
    {
        $archivo = fopen("archivo/materias.txt", "a");
        fwrite($archivo, $this->ToString() . "\r\n");
        fclose($archivo);
    }
    #endregion

    public function AgregarUser($materia)
    {
        array_push($this->materias, $materia);
    }

    public function TraerArchivo()
    {
        $archivo = fopen("archivo/materias.txt", "r");
            while(!feof($archivo))
            {
                $auxArch = fgets($archivo);
                $aux = explode("-", $auxArch);
                for($i = 0; $i < sizeof($aux); $i++)
                {
                    $aux[$i] = trim($aux[$i]);
                }
                if($aux[0] != ""){
                    $auxMateria = new Materia($aux[0], ((int)$aux[1]));
                    $this->AgregarUser($auxMateria);
                }
            }
        fclose($archivo);
    }

    public function BuscarUltimoID() : int
    {
        $this->TraerArchivo();
        return $cant = count($this->materias);
    }

    
}
?>