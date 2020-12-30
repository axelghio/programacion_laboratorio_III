<?php
class MW
{
    public function CorreoClaveSeteados($request, $response, $next)
    {
        $objDelaRespuesta= new stdclass();
        $ArrayDeParametros = $request->getParsedBody();
        $datos = json_decode($ArrayDeParametros['JSON']);
        if(isset($datos->correo) == true && isset($datos->clave) == true)
        {
            $newresponse = $next($request, $response);
        }
        else
        {
            $newresponse = $response->withJson("El correo o clave no estan seteados" , 403);
        }
        return $newresponse;
    }

    public static function CorreoClaveVacios($request, $response, $next)
    {
        $objDelaRespuesta= new stdclass();
        $ArrayDeParametros = $request->getParsedBody();
        $datos = json_decode($ArrayDeParametros['JSON']);
        if($datos->correo != "" && $datos->clave != "")
        {
            $newresponse = $next($request, $response);
        }
        else
        {
            $newresponse = $response->withJson("El correo o clave vacios" , 409);
        }
        return $newresponse;
    }

    public static function UsuarioExiste($request, $response, $next)
    {
        $ArrayDeParametros = $request->getParsedBody();
        $datos = json_decode($ArrayDeParametros['JSON']);
        $usu = Usuario::TraerUnUsuario("SELECT * FROM usuarios WHERE correo='$datos->correo' AND clave='$datos->clave'");
        if($usu != null)
        {
            $newresponse = $next($request, $response);
        }
        else
        {
            $newresponse = $response->withJson("El usuario no existe en la base de datos" , 403);
        }
        return $newresponse;
    }

    public static function UsuarioNoExiste($request, $response, $next)
    {
        $ArrayDeParametros = $request->getParsedBody();
        $datos = json_decode($ArrayDeParametros['JSON']);
        $usu = Usuario::TraerUnUsuario("SELECT * FROM usuarios WHERE correo='$datos->correo' AND clave='$datos->clave'");
        if($usu == null)
        {
            $newresponse = $next($request, $response);
        }
        else
        {
            $newresponse = $response->withJson("El usuario existe" , 403);
        }
        return $newresponse;
    }

    public function AutoValido($request, $response, $next)
    {
        $ArrayDeParametros = $request->getParsedBody();
        $datos = json_decode($ArrayDeParametros['JSON']);
        if($datos->precio != '' && $datos->color != '')
        {
            if($datos->precio >= 50000 && $datos->precio <= 600000 && $datos->color != 'azul')
            {
                $newresponse = $next($request, $response);
            }
            else
            {
                $newresponse = $response->withJson("El color o el precio no son validos" , 409); 
            }
        }
        else
        {
            $newresponse = $response->withJson("El color o el precio no son validos" , 409);
        }
        return $newresponse;
    }

    public function TokenValido($request, $response, $next)
    {
        $arrayConToken = $request->getHeader('JWT');
        $token=$arrayConToken[0];
        $flag = false;
        try 
        {
            VerificarJWT::VerificarToken($token);
            $flag = true;
        } 
        catch (Exception $e) 
        {
            $newresponse = $response->withJson("El token no es valido: " . $e->getMessage(), 403);
        }

        if($flag)
        {
            $newresponse = $next($request, $response);
        }
        return $newresponse;
    }

    public static function VerificarPropietario($request, $response, $next)
    {
        $arrayConToken = $request->getHeader('JWT');
        $token=$arrayConToken[0];
        $datos = VerificarJWT::ObtenerData($token);
        
        if($datos[0]->perfil == 'propietario')
        {
            $newresponse = $next($request, $response);
        }
        else
        {
            $newresponse = $response->withJson('No es propietario', 409);
        }
        return $newresponse;
    }

    public function VerificarEncargado($request, $response, $next)
    {
        $arrayConToken = $request->getHeader('JWT');
        $token=$arrayConToken[0];
        $datos = VerificarJWT::ObtenerData($token);
        
        if($datos[0]->perfil == 'propietario' || $datos[0]->perfil == 'encargado')
        {
            $newresponse = $next($request, $response);
        }
        else
        {
            $newresponse = $response->withJson('No es encargado, tampoco propietario', 409);
        }
        return $newresponse;
    }
}