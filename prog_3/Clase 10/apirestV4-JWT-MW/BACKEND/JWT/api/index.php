<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require '../composer/vendor/autoload.php';
require '../clases/accesoDatos.php';
require '../clases/cd.php';
require '../clases/usuario.php';
require '../clases/verificadora.php';


$config['displayErrorDetails'] = true;
$config['addContentLengthHeader'] = false;


$app = new \Slim\App(["settings" => $config]);


$app->post('/login[/]', \Verificadora::class . ':VerificarUsuario')->add(\Verificadora::class . ':ValidarParametrosUsuario');

$app->get('/', \Verificadora::class . ':ObtenerDataJWT')->add(\Verificadora::class . ':ChequearJWT');


$app->group('/cd', function () {

  $this->get('/', \cd::class . ':TraerTodos');

  $this->get('/{id}', \cd::class . ':TraerUno');

  $this->post('/', \cd::class . ':AgregarUno')->add(\Verificadora::class . ':ValidarParametrosCDAgregar');

  $this->put('/', \cd::class . ':ModificarUno')->add(\Verificadora::class . ':ValidarParametrosCDModificar');

  $this->delete('/', \cd::class . ':BorrarUno')->add(\Verificadora::class . ':ValidarParametrosCDBorrar');
     
})->add(\Verificadora::class . ':ChequearJWT');

$app->run();