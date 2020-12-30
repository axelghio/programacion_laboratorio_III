<?php
require_once '../composer/vendor/autoload.php';

use Firebase\JWT\JWT;

class Autentificadora
{
    private static $secret_key = 'ClaveSuperSecreta@';
    private static $encrypt = ['HS256'];
    private static $aud = NULL;
    
    public static function CrearJWT($data)
    {
        $time = time();
        
        $token = array(
        	'iat'=>$time,
            'exp' => $time + (60*10),
            'aud' => self::Aud(),
            'data' => $data,
            'app'=> "API REST CD 2020"
        );

        return JWT::encode($token, self::$secret_key);
    }
    
    public static function VerificarJWT($token)
    {
        $datos = new stdClass();
        $datos->verificado = FALSE;
        $datos->mensaje = "";

        try 
        {
            if( ! isset($token))
            {
                $datos->mensaje = "Token vacío!!!";
            }
            else
            {          
                $decode = JWT::decode(
                    $token,
                    self::$secret_key,
                    self::$encrypt
                );

                if($decode->aud !== self::Aud())
                {
                    throw new Exception("Usuario inválido!!!");
                }
                else
                {
                    $datos->verificado = TRUE;
                    $datos->mensaje = "Token OK!!!";
                } 
            }          

        } 
        catch (Exception $e) 
        {
            $datos->mensaje = "Token inválido!!! - " . $e->getMessage();
        }
    
        return $datos;
    }
    
    public static function ObtenerData($token)
    {
        return JWT::decode(
            $token,
            self::$secret_key,
            self::$encrypt
        );
    }
    
    private static function Aud()
    {
        $aud = '';
        
        if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
            $aud = $_SERVER['HTTP_CLIENT_IP'];
        } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
            $aud = $_SERVER['HTTP_X_FORWARDED_FOR'];
        } else {
            $aud = $_SERVER['REMOTE_ADDR'];
        }
        
        $aud .= @$_SERVER['HTTP_USER_AGENT'];
        $aud .= gethostname();
        
        return sha1($aud);
    }
}