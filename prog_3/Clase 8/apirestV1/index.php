<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require_once './vendor/autoload.php';
require_once './clases/AccesoDatos.php';
require_once './clases/cd.php';

$config['displayErrorDetails'] = true;
$config['addContentLengthHeader'] = false;

/*
¡La primera línea (9) es la más importante! En el modo de desarrollo sirve para obtener 
información sobre los errores que se verán en la salida de la consola.

La segunda línea (10) le permite al servidor web establecer (o no) el encabezado Content-Length, 
lo que hace que Slim se comporte de manera más predecible.
*/

//*********************************************************************************************//
//INICIALIZO EL APIREST
//*********************************************************************************************//
$app = new \Slim\App(["settings" => $config]);

//*********************************************************************************************//
//01.- CONFIGURO LOS VERBOS GET, POST, PUT Y DELETE
//*********************************************************************************************//

$app->get('[/]', function (Request $request, Response $response) {    
    $response->getBody()->write("GET => Bienvenido!!! a SlimFramework");
    return $response;

});

$app->post('[/]', function (Request $request, Response $response) {   
    $response->getBody()->write("POST => Bienvenido!!! a SlimFramework");
    return $response;

});

$app->put('[/]', function (Request $request, Response $response) {  
    $response->getBody()->write("PUT => Bienvenido!!! a SlimFramework");
    return $response;

});

$app->delete('[/]', function (Request $request, Response $response) {  
    $response->getBody()->write("DELETE => Bienvenido!!! a SlimFramework");
    return $response;

});

//*********************************************************************************************//
//02.- RUTEOS
//*********************************************************************************************//

$app->get('/ruteo/', function (Request $request, Response $response) {    
    $response->getBody()->write("Ruteo, sin params");
    return $response;

});
//firma correcta para el standard -> (request, response, args) => response
$app->get('/ruteo/{param}', function (Request $request, Response $response, $args) {
    $response->getBody()->write("Ruteo, con params -> " . $args["param"]);
    return $response;

});

$app->get('/ruteoOpcional[/]', function (Request $request, Response $response) {    
    $response->getBody()->write("Ruteo, sin params y / opcional");
    return $response;

});

$app->get('/ruteoOpcional/sub[/{param}]', function (Request $request, Response $response, $args) {    
    $response->getBody()->write("Ruteo, con params opcional -> " . $args["param"]);
    return $response;

});

//*********************************************************************************************//
//03.- VARIOS PARAMETROS
//*********************************************************************************************//

$app->get('/ruteoOpcional/parametros/{param1}/{param2}', function (Request $request, Response $response, $args) {    
    $response->getBody()->write("Ruteo, con parametros -> " . $args["param1"]  . "-" . $args["param2"]);
    return $response;

});

//*********************************************************************************************//
//04.- ATENDER TODOS LOS VERBOS DE HTTP -> ANY
//*********************************************************************************************//

$app->any('/cualquiera/[{id}]', function ($request, $response, $args) {
    
    var_dump($request->getMethod());
    
    $id = $args['id'];
    $response->getBody()->write("Cualquier verbo de HTTP. Parametro: {$id} - ");
    return $response;
});

//*********************************************************************************************//
//04.- ATENDER ALGUNOS VERBOS DE HTTP -> MAP
//*********************************************************************************************//

$app->map(['GET', 'POST'], '/mapeado', function ($request, $response, $args) {

    var_dump($request->getMethod());
    $response->getBody()->write("Solo POST y GET - ");
});

//*********************************************************************************************//
//04.- AGRUPACION DE VERBOS POR RUTA -> GROUP
//*********************************************************************************************//

$app->group('/saludo', function () {

    $this->get('/', function ($request, $response, $args) {
        $response->getBody()->write("HOLA, Bienvenido a la apirest... ingresá tu nombre");
    });

    $this->get('/{nombre}', function ($request, $response, $args) {
        $nombre = $args['nombre'];
        $response->getBody()->write("HOLA, Bienvenido <h1>{$nombre}</h1> a la apirest");
    });
 
     $this->post('/', function ($request, $response, $args) {      
        $response->getBody()->write("HOLA, Bienvenido a la apirest por POST");
    });
     
});

//*********************************************************************************************//
//05.- AGRUPACION DE RUTAS Y MAPEO
//*********************************************************************************************//

$app->group('/usuario/{id:[0-9]+}', function () {

    $this->map(['POST', 'DELETE'], '', function ($request, $response, $args) {
        $response->getBody()->write("Accedo al usuario por ID (con POST o DELETE) ");
    });

    $this->get('/nombre', function ($request, $response, $args) {
        $response->getBody()->write("Accedo al usuario por ID y retorno el nombre (con GET) ");
    });

});

//*********************************************************************************************//
//06.- PARAMETROS Y RETORNOS (JSON)
//*********************************************************************************************//

$app->get('/datos/', function (Request $request, Response $response) {     
    //CREO RETORNO (ARRAY)
    $datos = array('nombre' => 'rogelio','apellido' => 'agua', 'edad' => 40);
                                    //DATA  - STATUS
    $newResponse = $response->withJson($datos, 200);  

    return $newResponse;
});

$app->post('/datos/', function (Request $request, Response $response) {   
    //OBTENGO LOS PARAMETROS 
    $ArrayDeParametros = $request->getParsedBody();
    //CREO RETORNO (OBJETO)
    $objeto= new stdclass();
    $objeto->nombre = $ArrayDeParametros['nombre'];
    $objeto->apellido = $ArrayDeParametros['apellido'];
    $objeto->edad = $ArrayDeParametros['edad'];
                                    //DATA  -  STATUS
    $newResponse = $response->withJson($objeto, 200); 

    return $newResponse;
});

$app->put('/datos/', function (Request $request, Response $response) { 
    //OBTENGO LOS PARAMETROS   
    $ArrayDeParametros = $request->getParsedBody();
    //'DECODEO' A OBJETO
    $obj = json_decode(($ArrayDeParametros["cadenaJson"]));
    var_dump($obj);

    return $response;
});

//*********************************************************************************************//
/*07.- POO Y SLIM*/
//*********************************************************************************************//

//*********************************************************************************************//
/*LLAMADA A METODOS DE INSTANCIA DE UNA CLASE*/
//*********************************************************************************************//
$app->group('/cd', function () {   

    $this->get('/', \CD::class . ':TraerTodos');
    $this->get('/{id}', \CD::class . ':TraerUno');
    $this->post('/', \CD::class . ':AgregarUno');
    $this->put('/', \CD::class . ':ModificarUno');
    $this->delete('/', \CD::class . ':BorrarUno');

});


$app->run();