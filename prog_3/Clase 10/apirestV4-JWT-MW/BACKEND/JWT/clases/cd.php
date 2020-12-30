<?php
require_once "islimeable.php";

class CD implements ISlimeable
{
	public $id;
 	public $titulo;
  	public $cantante;
  	public $año;

//*********************************************************************************************//
/* IMPLEMENTO LAS FUNCIONES PARA SLIM */
//*********************************************************************************************//

	public function TraerTodos($request, $response, $args) 
	{
		$todosLosCds = CD::TraerTodoLosCds();
		$newResponse = $response->withJson($todosLosCds, 200);  
		return $newResponse;
	}

	public function TraerUno($request, $response, $args) 
	{
     	$id = $args['id'];
    	$elCd = CD::TraerUnCd($id);
     	$newResponse = $response->withJson($elCd, 200);  
    	return $newResponse;
	}
	
	public function AgregarUno($request, $response, $args) 
	{
        $ArrayDeParametros = $request->getParsedBody();

		$titulo= $ArrayDeParametros['titulo'];
        $cantante= $ArrayDeParametros['cantante'];
        $año= $ArrayDeParametros['anio'];
        
        $micd = new CD();
        $micd->titulo = $titulo;
        $micd->cantante = $cantante;
		$micd->año = $año;		

        $id_agregado = $micd->InsertarCd();
		
        $datos = new stdClass();
  
		if($id_agregado > 0)
		{
			$datos->mensaje = "CD agregado!!!";
			$datos->id_agregado = $id_agregado;
		}
		else
		{
			$datos->mensaje = "CD NO agregado!!!";
		}

      	return $response->withJson($datos, 200);
    }
	
	public function ModificarUno($request, $response, $args) 
	{
		$ArrayDeParametros = $request->getParsedBody();

		$obj = json_decode(($ArrayDeParametros["cadenaJson"]));   

	    $micd = new CD();
	    $micd->id = $obj->id;
	    $micd->titulo = $obj->titulo;
	    $micd->cantante = $obj->cantante;
	    $micd->año = $obj->anio;

		$resultado = $micd->ModificarCd();
		   
	   	$objDelaRespuesta = new stdclass();
		$objDelaRespuesta->resultado = $resultado;

		return $response->withJson($objDelaRespuesta, 200);		
	}
	
	public function BorrarUno($request, $response, $args) 
	{
     	$ArrayDeParametros = $request->getParsedBody();
     	$id = $ArrayDeParametros['id'];
		 
		$cd= new CD();
		$cd->id = $id;
		 
     	$cantidadDeBorrados = $cd->BorrarCd();

     	$objDelaRespuesta= new stdclass();
		$objDelaRespuesta->cantidad = $cantidadDeBorrados;
		
	    if($cantidadDeBorrados>0)
	    {
	    	$objDelaRespuesta->resultado = "algo borro!!!";
	    }
	    else
	    {
	    	$objDelaRespuesta->resultado="no Borro nada!!!";
		}
		
		$newResponse = $response->withJson($objDelaRespuesta, 200); 
		 
      	return $newResponse;
    }
	
//*********************************************************************************************//
/* FIN - AGREGO FUNCIONES PARA SLIM */
//*********************************************************************************************//

	public static function TraerTodoLosCds()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select id, titel as titulo, interpret as cantante, jahr as año from cds");
		$consulta->execute();			
		return $consulta->fetchAll(PDO::FETCH_CLASS, "CD");		
	}

	public static function TraerUnCd($id) 
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select id, titel as titulo, interpret as cantante, jahr as año from cds where id = $id");
		$consulta->execute();
		$cdBuscado= $consulta->fetchObject('cd');
		return $cdBuscado;		
	}

	public function InsertarCd()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into cds (titel,interpret,jahr)values(:titulo,:cantante,:anio)");
		$consulta->bindValue(':titulo',$this->titulo, PDO::PARAM_INT);
		$consulta->bindValue(':anio', $this->año, PDO::PARAM_STR);
		$consulta->bindValue(':cantante', $this->cantante, PDO::PARAM_STR);
		$consulta->execute();		
		return $objetoAccesoDato->RetornarUltimoIdInsertado();
	}

	public function ModificarCd()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("
				update cds 
				set titel=:titulo,
				interpret=:cantante,
				jahr=:anio
				WHERE id=:id");
		$consulta->bindValue(':id',$this->id, PDO::PARAM_INT);
		$consulta->bindValue(':titulo',$this->titulo, PDO::PARAM_INT);
		$consulta->bindValue(':anio', $this->año, PDO::PARAM_STR);
		$consulta->bindValue(':cantante', $this->cantante, PDO::PARAM_STR);
		return $consulta->execute();
	 }

	public function BorrarCd()
	{
	 	$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("delete from cds	WHERE id=:id");	
		$consulta->bindValue(':id',$this->id, PDO::PARAM_INT);		
		$consulta->execute();
		return $consulta->rowCount();
	}

}