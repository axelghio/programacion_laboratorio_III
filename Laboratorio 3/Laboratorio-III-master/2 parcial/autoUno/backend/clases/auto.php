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

        public function Tabla($request, $response, $args){
            $perfil = $request->getHeader('perfil');
            $listado = Auto::TraerTodos();
            $json = new stdClass;
            $tabla = "<table id='tableAuto' class='table table-bordered table-hover'><thead><tr class='danger'><td>Id</td><td>Marca</td><td>Color</td><td>Precio</td><td>Modelo</td></tr></thead><tbody>";
            foreach($listado as $usu){
                $tabla.="<tr><td>$usu->id</td><td>$usu->marca</td><td>$usu->color</td><td>$usu->precio</td><td>$usu->modelo</td>";
                if($perfil[0] == 'propietario'){
                    $tabla.= "<td><button type='button' id='btnBorrar' class='btn-danger' onclick='Borrar($usu->id)'>Borrar</button></td></tr>";
                }
            }

            $tabla.="</tbody></table>";
            $json->ok = isset($tabla) ? true:false;
            $json->tabla = $tabla;

            return $response->withJson($json, 200);
        }

        public function BorrarUno($request, $response, $args) {
            $id = $request->getHeader('id');
            $auto= new Auto();
            $auto->id=$id[0];
            $cantidadDeBorrados=$auto->BorrarAuto();
            $respuesta = new stdClass();
            if($cantidadDeBorrados>0){
                $respuesta->ok = true;;  
            }
            else{
                $respuesta->ok = false;;  
            }           
      
            return $response->withJson($respuesta,200);
        }

        
    }
