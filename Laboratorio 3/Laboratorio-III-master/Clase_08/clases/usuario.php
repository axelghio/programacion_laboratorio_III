<?php
require_once './clases/AutentificadorJWT.php';
    class Usuario{
        public $id;
        public $nombre;
        public $perfil;
        public $correo;
        public $clave;

        public function ObtenerCorreoYClave($request, $response, $args){
            $datos = $request->getParsedBody();
            $usu = new Usuario();
            $usu->correo = $datos['correo'];
            $usu->clave = $datos['clave'];
            $retorno = new stdClass();
            $retorno->exito = false;
            try{
                $token = AutentificadorJWT::CrearToken($usu);
                $retorno->exito = true;
                $retorno->token = $token;
            }
            catch(Exception $e){
               $retorno->mensaje = $e->getMessage(); 
            }
            $newresponse = $response->withJson($retorno, 200);
            return $newresponse;
        }
    }