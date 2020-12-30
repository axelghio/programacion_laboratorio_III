<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require './vendor/autoload.php';
require '/clases/miClase.php';

$config['displayErrorDetails'] = true;
$config['addContentLengthHeader'] = false;


$app = new \Slim\App(["settings" => $config]);

//*********************************************************************************************//
//CONFIGURO LOS VERBOS GET, POST, PUT Y DELETE
//*********************************************************************************************//

$app->get('[/]', function (Request $request, Response $response) 
{    
  $response->getBody()->write("API => GET");
  return $response;
});
$app->post('[/]', function (Request $request, Response $response) 
{    
  $response->getBody()->write("API => POST");
  return $response;
});
$app->put('[/]', function (Request $request, Response $response) 
{    
  $response->getBody()->write("API => PUT");
  return $response;
});
$app->delete('[/]', function (Request $request, Response $response) 
{    
  $response->getBody()->write("API => DELETE");
  return $response;
});

//*********************************************************************************************//
//FUNCION MIDDLEWARE - SEGUN ESTANDARIZACION PSR7
//*********************************************************************************************//

$mwUno = function($request, $response, $next) {

  //EJECUTO ACCIONES ANTES DE INVOCAR A LA API
  $response->getBody()->write('Antes de ejecutar MiddleWare UNO...<br>');

  //INVOCO A LA API
  $response = $next($request, $response);

  //EJECUTO ACCIONES DESPUES DE INVOCAR A LA API
  $response->getBody()->write('<br>...Despues de ejecutar MiddleWare UNO');

  return $response; 
};

//*********************************************************************************************//
//01.-AGREGO MIDDLEWARE PARA TODOS LOS VERBOS
//*********************************************************************************************//

$app->add($mwUno);


//*********************************************************************************************//
//02.-AGREGO ROUTE MIDDLEWARE, SOLO PARA PUT
//*********************************************************************************************//

$app->put('/param/', function (Request $request, Response $response) {   

  $response->getBody()->write("API => PUT");
  return $response;

})->add(function ($request, $response, $next) {

  //EJECUTO ACCIONES ANTES DE INVOCAR A LA API
  $response->getBody()->write('Antes de ejecutar Middleware DOS...<br>');

  //INVOCO A LA API
  $response = $next($request, $response);

  //EJECUTO ACCIONES DESPUES DE INVOCAR A LA API
  $response->getBody()->write('<br>...Despues de ejecutar Middleware DOS');

  return $response;
});


//*********************************************************************************************//
//03.-AGREGO GROUP MIDDLEWARE
//*********************************************************************************************//

$app->group('/grupo', function () {

  //EN LA RAIZ DEL GRUPO
  $this->get('/', function (Request $request, Response $response) {
    return $response->getBody()->write("-GET- En el raíz del grupo...");
  });

  $this->post('/', function (Request $request, Response $response) {
    return $response->getBody()->write("-POST- En el raíz del grupo...");
  });
  //------------------------------------------------------
  
  $this->get('/hoy', function (Request $request, Response $response) {
    return $response->getBody()->write(date('Y-m-d'));
  });
   
  $this->get('/hora', function (Request $request, Response $response) {
    return $response->getBody()->write(date('H:i:s'));
  })->add(function($request, $response, $next) {

    //EJECUTO ACCIONES ANTES DE INVOCAR A LA API
    $response->getBody()->write('Antes de ejecutar Middleware CUATRO...<br>');

    //INVOCO A LA API
    $response = $next($request, $response);

    //EJECUTO ACCIONES DESPUES DE INVOCAR A LA API
    $response->getBody()->write('<br>...Despues de ejecutar Middleware CUATRO');

    return $response;
  });

 })->add(function ($request, $response, $next) {

  //EJECUTO ACCIONES ANTES DE INVOCAR A LA API
  $response->getBody()->write('Antes de ejecutar Middleware TRES...<br>');

  //INVOCO A LA API
  $response = $next($request, $response);

  //EJECUTO ACCIONES DESPUES DE INVOCAR A LA API
  $response->getBody()->write('<br>...Despues de ejecutar Middleware TRES');

  return $response;
});


//*********************************************************************************************//
//04.-AGREGO MAP MIDDLEWARE
//*********************************************************************************************//

$app->map(['GET', 'POST'], '/mapeado', function ($request, $response) {

  return $response->getBody()->write("<br>API => GET o POST<br>");

})->add(function($request, $response, $next){

    if($request->isGet()) 
    {
      $response->getBody()->write('<br>Entro por GET<br>');
    }
    else if($request->isPost())
    {
      $response->getBody()->write('<br>Entro por POST<br>');
    }

    $response = $next($request, $response);

    return $response;
});


//*********************************************************************************************//
//05.-AGREGO GROUP MIDDLEWARE CON POO
//*********************************************************************************************//

$app->group('/grupo/POO', function () {  

    //VERBOS EN LA RAIZ DEL GRUPO
    $this->get('/', function (Request $request, Response $response) {
      return $response->getBody()->write("<br>-GET- En el raíz del grupo...<br>");
    }); 
    $this->post('/', function (Request $request, Response $response) {
      return $response->getBody()->write("<br>-POST- En el raíz del grupo...<br>");
    });  

    //VERBOS EN RUTA
    $this->get('/hoy', function (Request $request, Response $response) {
      return $response->getBody()->write('<br>' . date('Y-m-d') . '<br>');
    }); 

    //MW A NIVEL DE RUTA
    $this->get('/hora', function (Request $request, Response $response) {

      date_default_timezone_set('America/Argentina/Buenos_Aires');      
      return $response->getBody()->write('<br>' . date('H:i:s') . '<br>');

    })->add(\MiClase::class . ":MostrarInstancia");

    //MW A NIVEL DE MAP
    $this->map(['PUT', 'DELETE'], '/map', function ($request, $response) {

      return $response->getBody()->write('<br>En verbo dentro de map.<br>');

    })->add(\MiClase::class . "::MostrarEstatico")->add(\MiClase::class . ":MostrarInstancia");
  
    //MW A NIVEL DE GRUPO
   })->add(\MiClase::class . "::MostrarEstatico");
   
   

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