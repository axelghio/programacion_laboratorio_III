<?php

class Usuario
{
    public $id;
    public $nombre;
    public $apellido;
    public $correo;
    public $foto;
    public $id_perfil;
    public $clave;

    public function TraerTodos($request, $response, $next) 
	{
		$todosLosUsuarios = Usuario::ObtenerTodos();
		$newResponse = $response->withJson($todosLosUsuarios, 200);  
		return $newResponse;
	}
    
	private static function ObtenerTodos()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta = $objetoAccesoDato->RetornarConsulta("select * from usuarios");
		$consulta->execute();			
		return $consulta->fetchAll(PDO::FETCH_CLASS, "usuario");		
	}
}