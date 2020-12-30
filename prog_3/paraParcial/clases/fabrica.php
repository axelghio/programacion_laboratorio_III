<?php
    include_once 'clases/empleado.php';
    class Fabrica
    {
        #region Datos de clase.
        private string $razonSocial;
        private array $empleados;
        private int $cantidadMaxima;

        public function __construct($razonSocial, $cantidadMaxima)
        {
            $this->cantidadMaxima = $cantidadMaxima;
            $this->empleados = array();
            $this->razonSocial = $razonSocial;
        }

        public function GetEmpleados()
        {
            return $this->empleados;
        }
        #endregion

        #region Agregar Empleado
        public function AgregarEmpleado($empleado) : bool
        {
            $retorno = false;
            if(count($this->empleados)<$this->cantidadMaxima)
            {
                if($this->ExisteEmpleado($empleado) == false)
                {
                    array_push($this->empleados, $empleado);
                    $retorno = true;
                }
                else
                {
                    echo "El empleado ya existe." . PHP_EOL;
                    $retorno = false;
                }
            }
            return $retorno;
        }
        #endregion

        #region Elimina Empleado.
        public function EliminarEmpleado($dni)
        {
            $retorno = false;
            if($dni != NULL)
            {
                for ($i=0; $i < count($this->empleados); $i++) { 
                    if($this->empleados[$i]->GetDni() == $dni)
                    {
                        unlink("fotos\\" . trim($this->empleados[$i]->GetFoto()));
                        unset($this->empleados[$i]);
                        echo "Se elimino correctamente el empleado.";
                        $retorno = true;
                        break;
                    }
                }
            }
            if($retorno == false)
            {
                echo "El dni no existe!!!";
            }
            return $retorno;
        }
        #endregion

        #region Busca si existe empleado por dni unico
        public function ExisteEmpleado(Empleado $empleado) : bool
        {
           $retorno = false;
           if($empleado != NULL)
           {
               for ($i=0; $i < count($this->empleados); $i++)
               { 
                   if($this->empleados[$i]->GetDni() == $empleado->GetDni())
                   {
                       $retorno = true;
                       break;
                   }
               }
           }
           return $retorno;
        }
        #endregion

        #region Traemos desde Archivo.
        public function TraerDeArchivo($path)
        {
            $archivo = fopen($path, "r");
            while(!feof($archivo))
            {
                $auxArch = fgets($archivo);
                $empleados = explode("-", $auxArch);
                $empleados[0] = trim($empleados[0]);
                if($empleados[0] != ""){
                    $emp = new Empleado($empleados[0], $empleados[1], (int)$empleados[2], (int)$empleados[3], (float)$empleados[4]);
                    $emp->SetFoto($empleados[5] . "-" . $empleados[6]);
                    $this->AgregarEmpleado($emp);
                }
            }
            fclose($archivo);
        }
        #endregion

        #region Guardamos en Archivo.
        public function GuardarEnArchivo($path)
        {
            $archivo = fopen($path, "w");
            foreach ($this->empleados as $item) {
                fwrite($archivo, $item->ToString() . "\r\n");
            }
            fclose($archivo);
        }
        #endregion

        #region Modificar empleado
        public function ModificarEmpleado($empleado)
        {
            $retorno = false;
            for ($i=0; $i < count($this->empleados); $i++) 
            {
                if($this->empleados[$i]->GetDni() == $empleado->GetDni() && $this->empleados[$i]->GetLegajo() == $empleado->GetLegajo())
                {
                    $retorno = true;
                    unlink("fotos\\" . trim($this->empleados[$i]->GetFoto()));
                    $this->empleados[$i]->SetFoto($this->AgregarFoto($empleado));
                    $this->empleados[$i]->SetApellido($empleado->GetApellido());
                    $this->empleados[$i]->SetNombre($empleado->GetNombre());
                    $this->empleados[$i]->SetSueldo($empleado->GetSueldo());
                    break;
                }
            }
            return $retorno;
        }
        #endregion

        #region AGREGA UNA FOTO AL EMPLEADO
        public function AgregarFoto($empleado) : string
        {
            $upload = true;
            $tipoArchivo = pathinfo($_FILES["foto"]["name"], PATHINFO_EXTENSION); 
            $name = $empleado->GetDni() . "-" . $empleado->GetApellido() . "." . $tipoArchivo;
            if($tipoArchivo == "png")
            {
                if(file_exists("fotos/" . $name) == false)
                {
                    if (move_uploaded_file($_FILES["foto"]["tmp_name"], "fotos/" . $name)) {
                        //echo "<br/>El archivo ". basename($_FILES["foto"]["name"]). " ha sido subido exitosamente.";
                    } else {
                        echo "<br/>Lamentablemente ocurri&oacute; un error y no se pudo subir el archivo.";
                    }
                }
            }
            return $name;
        }
        #endregion

        #region BUSCAR LA FOTO DE UN EMPLEADO
        public function BuscarFoto(Empleado $empleado) : string
        {
            $retorno = "";
            foreach($this->empleados as $emp)
            {
                if($emp->GetDni() == $empleado->GetDni())
                {
                    $retorno = $emp->GetFoto();
                    echo $emp->GetFoto();
                    break;
                }
            }
            return $retorno;
        }
        #endregion
    }
?>