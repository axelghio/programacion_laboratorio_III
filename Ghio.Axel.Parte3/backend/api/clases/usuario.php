<?php
require_once 'clases/AccesoDatos.php';
require_once 'clases/jwt.php';

class Usuario
{
    public $correo;
    public $clave;
    public $nombre;
    public $apellido;
    public $perfil;
    public $foto;

    public function AgregarUser($request, $response, $args)
    {
        $objRespuesta= new stdclass();
    
        $ArrayDeParametros = $request->getParsedBody();
        $datos = json_decode($ArrayDeParametros['JSON']);

        $user = new Usuario();
        $path = Usuario::AgregarFoto($request);
        $user->nombre=$datos->nombre;
        $user->apellido=$datos->apellido;
        $user->correo=$datos->correo;
        $user->clave=$datos->clave;
        $user->perfil=$datos->perfil;
        $user->foto=$path;

        if($user->InsertarUsuario())
        {
            $objRespuesta->exito = true;
            $objRespuesta->mensaje="Se guardo el usuario.";   
            $newResponse = $response->withJson($objRespuesta, 200);
        }  
        else
        {
            $objRespuesta->exito = false;
            $objRespuesta->mensaje="Se no guardo el usuario.";   
            $newResponse = $response->withJson($objRespuesta, 418);
        }
        return $newResponse;
    }

    public function InsertarUsuario()
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("INSERT INTO usuarios (correo,clave,nombre,apellido,perfil,foto) VALUES (:correo,:clave,:nombre,:apellido,:perfil,:foto)");
        $consulta->bindValue(':correo',  $this->correo, PDO::PARAM_STR);
        $consulta->bindValue(':clave',  $this->clave, PDO::PARAM_STR);
        $consulta->bindValue(':nombre', $this->nombre, PDO::PARAM_STR);
        $consulta->bindValue(':apellido',  $this->apellido, PDO::PARAM_STR);
        $consulta->bindValue(':perfil',  $this->perfil, PDO::PARAM_STR);
        $consulta->bindValue(':apellido',  $this->apellido, PDO::PARAM_STR);
        $consulta->bindValue(':foto', $this->foto);
        return $consulta->execute();
    }

    public static function AgregarFoto($request)
    {
        $archivos = $request->getUploadedFiles();
        $destino="./fotos/";
        $nombreAnterior=$archivos['foto']->getClientFilename();
        $extension= explode(".", $nombreAnterior)  ;
        $extension=array_reverse($extension);
        $path = $destino.date('h-m-s').".".$extension[0];
        $archivos['foto']->moveTo($path);
        return $path;
    }

    public function Mostrar($request, $response, $args)
    {
        $retorno = new stdClass();
        $listado = Usuario::TraerTodosLosUsuarios();
        $tabla = '';
        $tabla.= "<table border=1> <thead> <tr>";
        $tabla.= "<td>Nombre <td>Apellido <td>Correo <td>Perfil <td>Foto";
        foreach($listado as $user)
        {
            $tabla.= "<tr><td> $user->nombre ";
            $tabla.= "<td> $user->apellido";
            $tabla.= "<td> $user->correo ";
            $tabla.= "<td> $user->perfil";
            $tabla.="<td>";
            $tabla.="<img src='" . $user->foto . "' height=60 width=60>";
        }
        if($tabla != null)
        {
            $retorno->exito = true;
            $retorno->mensaje = 'Se cargo el listado';
            $retorno->tabla = $tabla;
            $newResponse = $response->withJson($retorno, 200);
            
        }
        else
        {
            $retorno->exito = false;
            $retorno->mensaje = 'No se cargo el listado';
            $response->withJson($retorno, 424);
        }
        return $newResponse;
    }

    public static function TraerUnUsuario($consulta = "SELECT * FROM usuarios")
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta($consulta);
        $consulta->execute();			
        return $consulta->fetchAll(PDO::FETCH_CLASS, "Usuario");		
    }

    public static function TraerTodosLosUsuarios()
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM usuarios");
        $consulta->execute();			
        return $consulta->fetchAll(PDO::FETCH_CLASS, "Usuario");		
    }

    public function JWTCorreoYClave($request, $response, $args)
    {
        $datos =$objDelaRespuesta= new stdclass();
    
        $ArrayDeParametros = $request->getParsedBody();
        $datos= json_decode($ArrayDeParametros['JSON']);

        $user = Usuario::TraerUnUsuario("SELECT * FROM usuarios WHERE correo='$datos->correo' AND clave='$datos->clave'");
        
        if($user != null)
        {
            $token = VerificarJWT::CrearToken($user);
            $objDelaRespuesta->exito = true;
            $objDelaRespuesta->jwt = $token;
            $newresponse = $response->withJson($objDelaRespuesta, 200);  
        }
        else
        {
            $objDelaRespuesta->exito = false;
            $objDelaRespuesta->jwt = null;
            $newresponse = $response->withJson($objDelaRespuesta, 403);  
        }
        return $newresponse;
    }

    public function VerificarToken($request, $response, $args)
    {
        $arrayConToken = $request->getHeader('JWT');
        $token=$arrayConToken[0];	
                
        try 
        {
            VerificarJWT::VerificarToken($token);
            $newresponse = $response->withJson("El token es valido", 200);  
        } 
        catch (Exception $e) 
        {
            $newresponse = $response->withJson("El token no es valido: ".$e->getMessage(), 403);           
        }
        return $newresponse;
    } 
}