<?php
require_once 'autentificadora.php';

class Verificadora
{

  public function ValidarParametrosUsuario($request, $response, $next) 
  {  
      $datos = new stdClass();
  
      $datos->mensaje = "";
  
      $ArrayDeParametros = $request->getParsedBody();
  
      if ( ! isset($ArrayDeParametros["obj_json"])) 
      {      
        $datos->mensaje = "Falta parámetro obj_json!!! ";
  
        $newResponse = $response->withJson($datos, 403);
      }
      else 
      {
        $obj = json_decode(($ArrayDeParametros["obj_json"]));
  
        if (! property_exists($obj, "correo")) 
        {
          $datos->mensaje .= "Falta atibuto CORREO!!! ";
        }
        else if(empty($obj->correo))
        {
          $datos->mensaje .= "El atibuto CORREO está vacío!!! ";
        }

        if (! property_exists($obj, "clave")) 
        {
          $datos->mensaje .= "Falta atibuto CLAVE!!! ";
        }
        else if(empty($obj->clave))
        {
          $datos->mensaje .= "El atibuto CLAVE está vacío!!! ";
        }

        if ($datos->mensaje !== "") 
        {
          $newResponse = $response->withJson($datos, 403);
        }
        else
        {
          $newResponse = $next($request, $response);
        }     
      }
    
    return $newResponse;  
  }

  public function VerificarUsuario($request, $response, $next) 
  {     
    $datos = new stdClass();

    $ArrayDeParametros = $request->getParsedBody();

    $objUser = json_decode(($ArrayDeParametros["obj_json"]));

    if(Verificadora::ExisteUsuario($objUser)) 
    {
        $retorno = new stdClass();

        $datos = Usuario::ObtenerUsuario($objUser);
        
        $retorno->jwt = Autentificadora::CrearJWT($datos);

        $newResponse = $response->withJson($retorno, 200);
    }
    else
    {
        $datos->mensaje = "ERROR. Correo o clave incorrectas.";

        $newResponse = $response->withJson($datos, 403);  
    }  

    return $newResponse;  
  }
  
  private static function ExisteUsuario($objUser)
  {
      $existe = FALSE;

      $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
      $consulta = $objetoAccesoDato->RetornarConsulta("select * from mi_base.usuarios 
                                                       where correo=:correo and clave=:clave");

      $consulta->bindValue(':correo',$objUser->correo, PDO::PARAM_STR);
      $consulta->bindValue(':clave', $objUser->clave, PDO::PARAM_STR);

      $consulta->execute();	
      
      $cantidadFilas = $consulta->rowCount();

      if($cantidadFilas == 1)
      {
          $existe = TRUE;
      }
      
      return $existe;
  }

  function ObtenerDataJWT($request, $response, $next)
  {
      $token = $request->getHeader('token')[0];

      $datos = Autentificadora::ObtenerData($token);

      return $response->withJson($datos, 200);
  }

  function ChequearJWT($request, $response, $next)
  {
      $token = $request->getHeader('token')[0];
      
      $datos = Autentificadora::VerificarJWT($token);

      $status = $datos->verificado ? 200 : 403;

      if($datos->verificado)
      {
        $newResponse = $next($request, $response);
      }
      else
      {
        $newResponse = $response->withJson($datos, $status);
      }
       
      return $newResponse;
  }

  public function ValidarParametrosCDAgregar($request, $response, $next) 
  {  
      $datos = new stdClass();
  
      $datos->mensaje = "";
  
      $ArrayDeParametros = $request->getParsedBody();
  
      if ( ! isset($ArrayDeParametros["titulo"])) 
      {      
        $datos->mensaje .= "Falta parámetro TITULO!!! ";
      }
      if ( ! isset($ArrayDeParametros["cantante"])) 
      {      
        $datos->mensaje .= "Falta parámetro CANTANTE!!! ";
      }
      if ( ! isset($ArrayDeParametros["anio"])) 
      {      
        $datos->mensaje .= "Falta parámetro ANIO!!! ";
      }

      if($datos->mensaje !== "")
      {
        $newResponse = $response->withJson($datos, 403);
      }
      else 
      {
        $newResponse = $next($request, $response);
      }     
    
    return $newResponse;  
  }

  public function ValidarParametrosCDModificar($request, $response, $next) 
  {  
      $datos = new stdClass();
  
      $datos->mensaje = "";
  
      $ArrayDeParametros = $request->getParsedBody();
 
      if ( ! isset($ArrayDeParametros["cadenaJson"])) 
      {      
        $datos->mensaje .= "Falta parámetro CADENAJSON!!! ";
        $newResponse = $response->withJson($datos, 403);
      }
      else 
      {
        $obj = json_decode(($ArrayDeParametros["cadenaJson"]));

        if (! property_exists($obj, "id")) 
        {
          $datos->mensaje .= "Falta atibuto ID!!! ";
        }
        //IMPLEMENTAR: TITULO, CANTANTE Y ANIO
        
        if ($datos->mensaje !== "") 
        {
          $newResponse = $response->withJson($datos, 403);
        }
        else
        {
          $newResponse = $next($request, $response);
        } 
      }

    return $newResponse;  
  }

  public function ValidarParametrosCDBorrar($request, $response, $next) 
  {  
      $datos = new stdClass();
  
      $datos->mensaje = "";
  
      $ArrayDeParametros = $request->getParsedBody();
  
      if ( ! isset($ArrayDeParametros["id"])) 
      {      
        $datos->mensaje = "Falta parámetro ID!!! ";
      }

      if($datos->mensaje !== "")
      {
        $newResponse = $response->withJson($datos, 403);
      }
      else 
      {
        $newResponse = $next($request, $response);
      }     
    
    return $newResponse;  
  }

}