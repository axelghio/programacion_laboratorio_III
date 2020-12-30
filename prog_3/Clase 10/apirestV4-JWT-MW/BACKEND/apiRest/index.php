<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require './vendor/autoload.php';
require '/clases/listado.php';

$config['displayErrorDetails'] = true;
$config['addContentLengthHeader'] = false;


$app = new \Slim\App(["settings" => $config]);

$app->get('/', function (Request $request, Response $response) 
{
    $datos = new stdclass();

    $datos->mensaje = "API => GET";

    $newResponse = $response->withJson($datos, 200);  

    return $newResponse;
});

$app->post('/', function (Request $request, Response $response) 
{
    $datos = new stdclass();

    $datos->mensaje = "API => POST";

    $newResponse = $response->withJson($datos, 200);  

    return $newResponse;
});

$app->put('/', function (Request $request, Response $response) 
{
    $datos = new stdclass();

    $datos->mensaje = "API => PUT";

    $newResponse = $response->withJson($datos, 200);  

    return $newResponse;
});

$app->delete('/', function (Request $request, Response $response) 
{
    $datos = new stdclass();

    $datos->mensaje = "API => DELETE";

    $newResponse = $response->withJson($datos, 200);  

    return $newResponse;
});

//*********************************************************************************************//

$app->group('/listado', function () {
  
  $this->get('[/]', \Listado::class . '::ObtenerAutosJson'); 

});

//*********************************************************************************************//


//*********************************************************************************************//
//HABILITO CORS PARA TODOS LOS VERBOS
//*********************************************************************************************//

$app->add(function ($request, $response, $next) {
  $response = $next($request, $response);
  return $response
          ->withHeader('Access-Control-Allow-Origin', 'http://localhost')
          ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
          ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});


$app->run();