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
		$consulta = $objetoAccesoDato->RetornarConsulta("select id, nombre, apellido, correo, foto, id_perfil from mi_base.usuarios");
		$consulta->execute();			
		return $consulta->fetchAll(PDO::FETCH_CLASS, "usuario");		
	}

	public static function ObtenerUsuario($objUser)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta = $objetoAccesoDato->RetornarConsulta("select id, nombre, apellido, correo, foto, id_perfil 
														from mi_base.usuarios where correo=:correo and clave=:clave");

		$consulta->bindValue(':correo',$objUser->correo, PDO::PARAM_STR);
		$consulta->bindValue(':clave', $objUser->clave, PDO::PARAM_STR);

		$consulta->execute();			
		return $consulta->fetchObject('usuario');
	}
}