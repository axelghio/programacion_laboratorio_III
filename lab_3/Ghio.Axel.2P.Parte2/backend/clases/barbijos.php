<?php
    require_once './clases/AccesoDatos.php';

    class Barbijo
    {
        public $id;
        public $color;
        public $tipo;
        public $precio;

        public function AgregarUno($request, $response, $args)
        {
            $colorB = $request->getHeader('color');
            $tipoB = $request->getHeader('tipo');
            $precioB = $request->getHeader('precio');
            $objDelaRespuesta= new stdclass();
            $barbijo = new Barbijo();
            $barbijo->color = $colorB[0];
            $barbijo->tipo = $tipoB[0];
            $barbijo->precio = $precioB[0];

            if($barbijo->AgregarBarbijo())
            {
                $objDelaRespuesta->ok=true;   
            }  
            else
            {
                $objDelaRespuesta->ok=false;   
            }
            return $response->withJson($objDelaRespuesta, 200);
        }

        public function AgregarBarbijo()
        {
            $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
            $consulta =$objetoAccesoDato->RetornarConsulta("INSERT INTO barbijos (color,tipo,precio) VALUES (:color,:tipo,:precio)");
            $consulta->bindValue(':color',  $this->color, PDO::PARAM_STR);
            $consulta->bindValue(':tipo', $this->tipo, PDO::PARAM_STR);
            $consulta->bindValue(':precio',  $this->precio, PDO::PARAM_STR);

            return $consulta->execute();
        }

        public static function TraerTodos()
        {
            $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
            $consulta = $objetoAccesoDato->RetornarConsulta('SELECT * FROM barbijos');
            $consulta->execute(); 
            return $consulta->fetchAll(PDO::FETCH_CLASS, "Barbijo");
        }

        public function BorrarBarbijo()
        {
            $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$consulta =$objetoAccesoDato->RetornarConsulta("DELETE FROM barbijos WHERE id=:id");	
			$consulta->bindValue(':id',$this->id, PDO::PARAM_INT);		
			$consulta->execute();
			return $consulta->rowCount();
        }

        public function ModificarBarbijo()
        {
            $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
            $consulta =$objetoAccesoDato->RetornarConsulta("UPDATE barbijos SET color=:color, tipo=:tipo, precio=:precio WHERE id=:id");
            $consulta->bindValue(':id',     $this->id, PDO::PARAM_INT);		
            $consulta->bindValue(':color',  $this->color, PDO::PARAM_STR);
            $consulta->bindValue(':tipo',  $this->marca, PDO::PARAM_STR);
            $consulta->bindValue(':precio', $this->precio, PDO::PARAM_INT);
            
            return $consulta->execute();
        }

        public function Tabla($request, $response, $args)
        {
            $perfil = $request->getHeader('perfil');
            $listado = barbijo::TraerTodos();
            $json = new stdClass;
            $json->ok = isset($listado) ? true:false;
            $json->barbijos = $listado;
            return $response->withJson($json, 200);
        }

        public function BorrarUno($request, $response, $args) 
        {
            $id = $request->getHeader('id');
            $barbijo = new barbijo();
            $barbijo->id=$id[0];
            $cantidadDeBorrados=$barbijo->BorrarBarbijo();
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
            $colorB = $request->getHeader('color');
            $tipoB = $request->getHeader('tipo');
            $precioB = $request->getHeader('precio');

            $barbijo= new Barbijo();
            $barbijo->id = $id[0];
            $barbijo->color = $colorB[0];
            $barbijo->tipo = $tipoB[0];
            $barbijo->precio = $precioB[0];

            $respuesta->auto = $barbijo->color;

            if($barbijo->ModificarBarbijo())
            {
                $respuesta->ok = true;
            }
            else
            {
                $respuesta->ok = false;
            }
            return $response->withJson($respuesta, 200);
        }

        public function TraerUnBarbijo($request, $response, $args)
        {
            $respuesta = new stdClass;
            $json = new Barbijo();
            $id = $request->getHeader('id');
            $dato = Barbijo::TraerUno($id[0]);
            if($dato->row > 0)
            {
                $miBarbijoDB = $dato->barbijo;
                $respuesta->ok = true;
                $json->id = $miBarbijoDB[0]->id;
                $json->color = $miBarbijoDB[0]->color;
                $json->tipo = $miBarbijoDB[0]->tipo;
                $json->precio = $miBarbijoDB[0]->precio;
                $respuesta->miBarbijo = $json;
            }
            else
            {
                $respuesta->ok = false;
            }
            return $response->withJson($respuesta);
        }

        public static function TraerUno($id)
        {
            $retorno = new stdClass();
            $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
            $consulta = $objetoAccesoDato->RetornarConsulta("SELECT * FROM barbijos WHERE (id='$id')");
            $consulta->execute();
            $retorno->barbijo = $consulta->fetchAll(PDO::FETCH_CLASS, "Barbijo");
            $retorno->row = $consulta->rowCount();
            return $retorno;
        }
    }
