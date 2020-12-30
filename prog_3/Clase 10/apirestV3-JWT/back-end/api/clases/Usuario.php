<?php
class Usuario
{
	 public static function EsValido($usuario, $clave) {
      
       return ($usuario === "user" && $clave === "123") ? true : false; 
	}
	
    public static function TraerTodos() {
      
	    $uno = new stdClass();
	    $uno->usuario = "Jose";
	    $uno->perfil = "admin";
		
		$dos = new stdClass();
	    $dos->usuario = "Maria";
		$dos->perfil = "user";
		
	    $tres = new stdClass();
	    $tres->usuario = "Pablo";
		$tres->perfil = "admin";
		
		$retorno = array($uno, $dos, $tres);
		
     	return $retorno;     
	}
	
	public static function VerificarUsuario($usuario){

		$retorno = false;
		foreach (Usuario::TraerTodos() as $value) {
			if($value->usuario == $usuario){
				$retorno = true;
			}
		}

		return $retorno;
	}
}