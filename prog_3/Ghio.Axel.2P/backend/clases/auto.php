<?php
    require_once './clases/AccesoDatos.php';

    class Auto{
        public $id;
        public $marca;
        public $color;
        public $precio;
        public $modelo;

        public function TraerTodos(){
            $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
            $consulta = $objetoAccesoDato->RetornarConsulta('SELECT * FROM autos');
            $consulta->execute(); 
            return $consulta->fetchAll(PDO::FETCH_CLASS, "Auto");
        }
        public function BorrarAuto(){
            $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$consulta =$objetoAccesoDato->RetornarConsulta("DELETE FROM autos WHERE id=:id");	
			$consulta->bindValue(':id',$this->id, PDO::PARAM_INT);		
			$consulta->execute();
			return $consulta->rowCount();
        }

        //AGREGADO
        public function ModificarAuto()
        {
            $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
            $consulta =$objetoAccesoDato->RetornarConsulta("UPDATE autos SET color=:color, marca=:marca, precio=:precio, modelo=:modelo WHERE id=:id");
            $consulta->bindValue(':id',     $this->id, PDO::PARAM_INT);		
            $consulta->bindValue(':color',  $this->color, PDO::PARAM_STR);
            $consulta->bindValue(':marca',  $this->marca, PDO::PARAM_STR);
            $consulta->bindValue(':precio', $this->precio, PDO::PARAM_INT);
            $consulta->bindValue(':modelo',  $this->modelo, PDO::PARAM_STR);
            $consulta->execute();
            
            return $consulta->rowCount();
        } 
        ///////////

        public function Tabla($request, $response, $args)
        {
            $perfil = $request->getHeader('perfil');
            
            $listado = Auto::TraerTodos();
            $json = new stdClass;
            if($perfil[0] == 'propietario')
            {
                $tabla = "<table id='tableAuto' class='table table-bordered table-hover'><thead><tr class='danger'><td>Id</td><td>Marca</td><td>Color</td><td>Precio</td><td>Modelo</td><td>Acciones</td></tr></thead><tbody>";
                foreach($listado as $usu)
                {
                    $tabla.="<tr><td>$usu->id</td><td>$usu->marca</td><td>$usu->color</td><td>$usu->precio</td><td>$usu->modelo</td>";
                    $tabla.= "<td><button type='button' id='btnBorrar' class='btn-danger' onclick='Borrar($usu->id)'>Borrar</button>";
                    $tabla.= "<button type='button' id='btnModificar' class='btn-warning' onclick='Modificar($usu->id)' data-toggle='modal' data-target='#modalModificar'>Modificar</button></td></tr>";
                }
            }
            else if($perfil[0] == 'encargado')
            {
                $tabla = "<table id='tableAuto' class='table table-bordered table-hover'><thead><tr class='danger'><td>Id</td><td>Marca</td><td>Color</td><td>Precio</td><td>Modelo</td><td>Acciones</td></tr></thead><tbody>";
                foreach($listado as $usu)
                {
                    $tabla.="<tr><td>$usu->id</td><td>$usu->marca</td><td>$usu->color</td><td>$usu->precio</td><td>$usu->modelo</td>";  
                    $tabla.= "<td><button type='button' id='btnModificar' class='btn-warning' onclick='Modificar($usu->id)' data-toggle='modal' data-target='#modalModificar'>Modificar</button></td></tr>";
                }
            }
            else
            {
                $tabla = "<table id='tableAuto' class='table table-bordered table-hover'><thead><tr class='danger'><td>Id</td><td>Marca</td><td>Color</td><td>Precio</td><td>Modelo</td></tr></thead><tbody>";
                foreach($listado as $usu)
                {
                    $tabla.="<tr><td>$usu->id</td><td>$usu->marca</td><td>$usu->color</td><td>$usu->precio</td><td>$usu->modelo</td></tr>";  
                }
            }

            $tabla.="</tbody></table>";
            $json->ok = isset($tabla) ? true:false;
            $json->tabla = $tabla;

            return $response->withJson($json, 200);
        }

        public function BorrarUno($request, $response, $args) 
        {
            $id = $request->getHeader('id');
            $auto= new Auto();
            $auto->id=$id[0];
            $cantidadDeBorrados=$auto->BorrarAuto();
            $respuesta = new stdClass();
            if($cantidadDeBorrados>0){
                $respuesta->ok = true;
            }
            else{
                $respuesta->ok = false;
            }           
      
            return $response->withJson($respuesta,200);
        }

        public function ModificarUno($request, $response, $args) 
        {
            $respuesta = new stdClass();
            $id = $request->getHeader('id');
            $color = $request->getHeader('color');
            $marca = $request->getHeader('marca');
            $precio = $request->getHeader('precio');
            $modelo = $request->getHeader('modelo');

            $auto= new Auto();
            $auto->id=$id[0];
            $auto->color=$color[0];
            $auto->marca=$marca[0];
            $auto->precio=$precio[0];
            $auto->modelo=$modelo[0];

            $rowCount=$auto->ModificarAuto();
            if($rowCount > 0)
            {
                $respuesta->ok = true;
            }
            else
            {
                $respuesta->ok = false; 
            }

            return $response->withJson($respuesta,200);
        }
        /*
        public function ModificarAuto($request, $response, $args) 
        {
            $arrayDatos = $request->getParsedBody();
            $autoMod = json_decode($arrayDatos['JSON']);
            $arrayConToken = $request->getHeader('JWT');
            $token=$arrayConToken[0];
            $datos = AutentificadorJWT::ObtenerData($token);
            if($datos['0']->perfil == 'propietario' || $datos['0']->perfil == 'encargado')
            {
                $auto= new Auto();
                $auto->id=$autoMod->id;
                $auto->color=$autoMod->color;
                $auto->marca=$autoMod->marca;
                $auto->precio=$autoMod->precio;
                $auto->modelo=$autoMod->modelo;
    
                $rowCount=$auto->ModificarAutoBD();
                if($rowCount > 0)
                {
                    $newResponse = $response->withJson('Se pudo modificar', 200);  
                }
                else
                {
                    $newResponse = $response->withJson('No se pudo modificar', 418);  
                }
            }
            else
            {
                $newResponse = $response->withJson("El usuario es " . $datos['0']->perfil, 409);  
            }
            
            return $newResponse;	
        }
        */
    }
