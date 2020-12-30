<?php
require_once "islimeable.php";

class usuario implements ISlimeable
{
    public $id;
    public $apellido;
    public $nombre;
    public $correo;
    public $foto;
    public $id_perfil;
    public $clave;


    //Funciones de clase
    public function Agregar($request, $response, $args)
    {
        $parametros = $request->getParsedBody();

        $apellido = $parametros['apellido'];
        $nombre = $parametros['nombre'];
        $correo = $parametros['correo'];
        $foto = $parametros['foto'];
        $id_perfil = $parametros['id_perfil'];
        $clave = $parametros['clave'];

        $user = new usuario();
        $user->apellido = $apellido;
        $user->nombre = $nombre;
        $user->correo = $correo;
        $user->foto = $foto;
        $user->id_perfil = $id_perfil;
        $user->clave = $clave;

        $idUser = $user->Insertar();

        //Agregado de Archivo
        $archivo = $request->getUploadedFiles();
        $destino = "./fotos/";
        //var_dump($archivos);
        //var_dump($archivos['foto']);
        $nombreAnterior = $archivo['foto']->getClientFilename();
        $extension = explode(".", $nombreAnterior);
        //var_dump($nombreAnterior);
        $extension = array_reverse($extension);

		$archivo['foto']->moveTo($destino . $idUser . $correo . "." . $extension[0]);
		
        $response->getBody()->write("Agregado exitosamente!");

      	return $response;
    }

    public function Modificar($request, $response, $args)
    {
        
    }

    public function Borrar($request, $response, $args)
    {
        
    }

    public function MostrarUno($request, $response, $args)
    {
        
    }

    public function MostrarTodos($request, $response, $args)
    {
        
    }


    //Funciones para SLIM
    //Agrega elemento.
    public function Insertar()
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        $consulta =$objetoAccesoDato->RetornarConsulta("INSERT into usuarios (nombre,apellido,correo,foto,id_perfil,clave)values(:nombre,:apellido,:correo,:foto,:id_perfil,:clave)");
        $consulta->bindValue(':nombre',$this->nombre, PDO::PARAM_STR);
        $consulta->bindValue(':apellido',$this->apellido, PDO::PARAM_STR);
        $consulta->bindValue(':correo',$this->correo, PDO::PARAM_STR);
        $consulta->bindValue(':foto',$this->foto, PDO::PARAM_STR);
		$consulta->bindValue(':id_perfil', $this->id_perfil, PDO::PARAM_INT);
		$consulta->bindValue(':clave', $this->clave, PDO::PARAM_STR);
		$consulta->execute();		
		return $objetoAccesoDato->RetornarUltimoIdInsertado();
    }

    //Modifica elemento.
    public function Modifica()
    {

    }

    //Borra elemento.
    public function Eliminar()
    {

    }

    //Muestra un elemento.
    public static function TraerUno()
    {

    }

    //Muestra todos los elementos.
    public static function TraerTodos()
    {
        
    }
}
?>