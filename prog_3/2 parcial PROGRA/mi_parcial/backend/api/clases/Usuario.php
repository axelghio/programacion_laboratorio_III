<?php
require_once "islimeable.php";

class usuario implements ISlimeable
{
    public $id;
    public $apellido;
    public $nombre;
    public $correo;
    public $foto;
    public $perfil;
    public $clave;

    //Funciones de clase
    public function Agregar($request, $response, $args)
    {
        $parametros = $request->getParsedBody();

        $apellido = $parametros['apellido'];
        $nombre = $parametros['nombre'];
        $correo = $parametros['correo'];
        $perfil = $parametros['perfil'];
        $clave = $parametros['clave'];

        $user = new usuario();
        $user->apellido = $apellido;
        $user->nombre = $nombre;
        $user->correo = $correo;
        $user->perfil = $perfil;
        $user->clave = $clave;

        $idUser = $user->Insertar();

        //Agregado de Archivo
        $archivo = $request->getUploadedFiles();
        $destino = "./fotos/";
        $nombreAnterior = $archivo['foto']->getClientFilename();
        $extension = explode(".", $nombreAnterior);
        $extension = array_reverse($extension);

		$archivo['foto']->moveTo($destino . $idUser . $correo . "." . $extension[0]);
		
        $respuesta = new stdClass();
  
		if($idUser > 0)
		{
            $respuesta->exito = true;
            $respuesta->mensaje = "Se agrego exitosamente.";
            $respuesta->id_agregado = $idUser;
            $respuesta->status = 200;
		}
		else
		{
			$respuesta->exito = false;
            $respuesta->mensaje = "No se pudo agregar.";
            $respuesta->status = 424;
		}

      	return $response->withJson($respuesta, $respuesta->status);
    }

    public function Modificar($request, $response, $args)
    {
        $arrayParametros = $request->getParsedBody();

        $user = new usuario();
        $user->id = $arrayParametros['id'];
        $user->nombre = $arrayParametros['nombre'];
        $user->apellido = $arrayParametros['apellido'];
        $user->correo = $arrayParametros['correo'];
        $user->perfil = $arrayParametros['perfil'];
        $user->clave = $arrayParametros['clave'];

        $resultado = $user->Modifica();
        
        $objDelaRespuesta = new stdclass();
		$objDelaRespuesta->resultado = $resultado;

		return $response->withJson($objDelaRespuesta, 200);		
	}

    public function Borrar($request, $response, $args)
    {
        $id = $args['id'];
        
     	$cantidadDeBorrados = $this->Eliminar($id);

     	$objDelaRespuesta= new stdclass();
		$objDelaRespuesta->cantidad = $cantidadDeBorrados;
		
	    if($cantidadDeBorrados>0)
	    {
	    	$objDelaRespuesta->resultado = "Eliminado exitosamente!!!";
	    }
	    else
	    {
	    	$objDelaRespuesta->resultado="Error, no existe usuario a eliminar!!!";
		}
		
		$newResponse = $response->withJson($objDelaRespuesta, 200); 
		 
      	return $newResponse;
    }

    public function MostrarUno($request, $response, $args)
    {
        $id = $args['id'];
        $auxUser = usuario::TraerUno($id);
        $newResponse = $response->withJson($auxUser, 200);
        return $newResponse;
    }

    public function MostrarTodos($request, $response, $args)
    {
        $allUsers = usuario::TraerTodos();
        $newResponse = $response->withJson($allUsers, 200);
        return $newResponse;
    }

    //Funciones para SLIM
    //Agrega elemento.
    public function Insertar()
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        $consulta = $objetoAccesoDato->RetornarConsulta("INSERT into usuarios (nombre,apellido,correo,foto,perfil,clave)values(:nombre,:apellido,:correo,:foto,:perfil,:clave)");
        $consulta->bindValue(':nombre',$this->nombre, PDO::PARAM_STR);
        $consulta->bindValue(':apellido',$this->apellido, PDO::PARAM_STR);
        $consulta->bindValue(':correo',$this->correo, PDO::PARAM_STR);
        $consulta->bindValue(':foto',$this->foto, PDO::PARAM_STR);
		$consulta->bindValue(':perfil', $this->perfil, PDO::PARAM_INT);
		$consulta->bindValue(':clave', $this->clave, PDO::PARAM_STR);
		$consulta->execute();		
		return $objetoAccesoDato->RetornarUltimoIdInsertado();
    }

    //Modifica elemento.
    public function Modifica()
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("
        update usuarios
        set nombre=:nombre,
        apellido=:apellido,
        correo=:correo,
        perfil=:perfil,
        clave=:clave
        WHERE id=:id");
        $consulta->bindValue(':id',$this->id, PDO::PARAM_INT);
        $consulta->bindValue(':nombre',$this->nombre, PDO::PARAM_STR);
        $consulta->bindValue(':apellido',$this->apellido, PDO::PARAM_STR);
        $consulta->bindValue(':correo',$this->correo, PDO::PARAM_STR);
		$consulta->bindValue(':perfil', $this->perfil, PDO::PARAM_INT);
		$consulta->bindValue(':clave', $this->clave, PDO::PARAM_STR);
        return $consulta->execute();
        
    }

    //Borra elemento.
    public function Eliminar($id)
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        $consulta = $objetoAccesoDato->RetornarConsulta("delete from usuarios WHERE id=$id");		
		$consulta->execute();
		return $consulta->rowCount();
    }

    //Muestra un elemento.
    public static function TraerUno($id)
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        $consulta = $objetoAccesoDato->RetornarConsulta("select id, nombre as nombre, apellido as apellido, correo as correo, foto as foto, perfil as perfil, clave as clave from usuarios WHERE id = $id");
        $consulta->execute();
        $auxUser = $consulta->fetchObject('usuario');
        return $auxUser;
    }

    //Muestra todos los elementos.
    public static function TraerTodos()
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        $consulta = $objetoAccesoDato->RetornarConsulta("select id, nombre as nombre, apellido as apellido, correo as correo, foto as foto, perfil as perfil, clave as clave from usuarios");
        $consulta->execute();
        return $consulta->fetchAll(PDO::FETCH_CLASS, "usuario");
    }
}
?>