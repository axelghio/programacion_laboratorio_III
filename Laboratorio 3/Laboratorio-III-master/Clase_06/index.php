<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require_once './vendor/autoload.php';
require_once './Clases/usuario.php';

$config['displayErrorDetails'] = true;
$config['addContentLengthHeader'] = false;

$app = new \Slim\App(["settings" => $config]);

$app->group('/login/',function(){
    $this->post('Ingresar[/]', function (Request $request, Response $response) {   
        $json = $request->getParsedBody();
        $json = json_decode($json['usuario']);
        $flag = Usuario::Validar($json->id, $json->clave);
        if($flag->existe){
            $retorno = $response->withJson($flag, 200);
        }
        else{

            $retorno = $response->withJson($flag, 200);
        }
        return $retorno;
    });

    $this->post('Registrar/', \Usuario::class . ':AgregarUno');
});




$app->run();