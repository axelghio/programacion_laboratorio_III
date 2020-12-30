<?php
class Profesor{
    public string $nombre;
    public int $legajo;
    public string $foto;
    public array $profesores;

    public function __construct($nombre, $legajo)
    {
        $this->nombre = $nombre;
        $this->legajo = $legajo;
        $this->profesores = array();      
    }

    public function ToString() : string
    {
        return $this->nombre . "-" . $this->legajo . "-" . $this->foto;
    }

    public function SetFoto($foto)
    {
        $this->foto = $foto;
    }

    #region Guardamos en Archivo.
    public function GuardarEnArchivo()
    {
        $archivo = fopen("archivo/profesores.txt", "a");
        fwrite($archivo, $this->ToString() . "\r\n");
        fclose($archivo);
    }
    #endregion

    public function AgregarProfesor($profesor)
    {
        array_push($this->profesores, $profesor);
    }

    public function TraerArchivo()
    {
        $archivo = fopen("archivo/profesores.txt", "r");
            while(!feof($archivo))
            {
                $auxArch = fgets($archivo);
                $aux = explode("-", $auxArch);
                for($i = 0; $i < sizeof($aux); $i++)
                {
                    $aux[$i] = trim($aux[$i]);
                }
                if($aux[0] != ""){
                    $auxProf = new Profesor($aux[0], $aux[1]);
                    $this->AgregarProfesor($auxProf);
                }
            }
        fclose($archivo);
    }

    public function Existe() : bool
    {
        $retorno = false;
        $this->TraerArchivo();
        foreach ($this->profesores as $profe) 
        {
            if($profe->legajo == $this->legajo)
            {
                $retorno = true;
                break;
            }
        }
        return $retorno;
    }

    #region AGREGA UNA FOTO AL EMPLEADO
    public function AgregarFoto($profesor) : string
    {
        $upload = true;
        $tipoArchivo = pathinfo($_FILES["foto"]["name"], PATHINFO_EXTENSION); 
        $name = $profesor->nombre . "-" . $profesor->legajo . "." . $tipoArchivo;
        if($tipoArchivo == "png")
        {
            if(file_exists("fotos/" . $name) == false)
            {
                if (move_uploaded_file($_FILES["foto"]["tmp_name"], "imagenes/" . $name)) {
                    //echo "<br/>El archivo ". basename($_FILES["foto"]["name"]). " ha sido subido exitosamente.";
                } else {
                    echo "<br/>Lamentablemente ocurri&oacute; un error y no se pudo subir el archivo.";
                }
            }
        }
        return $name;
    }
    #endregion
}
?>