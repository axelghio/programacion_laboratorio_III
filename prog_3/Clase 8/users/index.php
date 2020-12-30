<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require_once './vendor/autoload.php';
require_once './backend/AccesoDatos.php';
require_once './backend/usuarios.php';

$config['displayErrorDetails'] = true;
$config['addContentLengthHeader'] = false;

$app = new \Slim\App(["settings" => $config]);

$app->get('[/]', function (Request $request, Response $response) {    
    $response->getBody()->write("GET => Bienvenido!!! a SlimFramework");
    return $response;

});

$app->group('/user', function () 
{
    $this->post('/', \usuario::class . ':Agregar');
    //$this->put('/', \usuario::class . ':ModificarUno');
    //$this->delete('/', \usuario::class . ':BorrarUno');
    //$this->get('/', \usuario::class . ':TraerTodos');
    //$this->get('/{id}', \usuario::class . ':TraerUno');
});

$app->run();