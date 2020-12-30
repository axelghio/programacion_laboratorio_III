<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require '../composer/vendor/autoload.php';

//NECESARIO PARA GENERAR EL JWT
use Firebase\JWT\JWT;

require_once '/clases/Usuario.php';
require_once '/clases/Auto.php';

$config['displayErrorDetails'] = TRUE;
$config['addContentLengthHeader'] = FALSE;


$app = new \Slim\App(["settings" => $config]);

$app->post('/usuarios', \usuario::class . ':Agregar');
$app->get('/', \usuario::class . ':TraerTodos');
$app->post('/', \auto::class . ':Agregar');
$app->get('/autos', \auto::class . ':TraerTodos');
$app->group('/login', function ()
{
  $this->post('/', \usuario::class . ':VerificarUsuario');
  $this->get('/', \usuario::class . ':VerificarJWT');
});

$app->delete('/', \Auto::class . ':BorrarUno')->add(\MW::class . ':TokenValido')->add(\MW::class . '::VerificarPropietario')->add(\MW::class . ':VerificarEncargado');
$app->put('/', \Auto::class . ':ModificarUno')->add(\MW::class . ':TokenValido')->add(\MW::class . '::VerificarPropietario')->add(\MW::class . ':VerificarEncargado');

$app->run();