<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require '../composer/vendor/autoload.php';

//NECESARIO PARA GENERAR EL JWT
use Firebase\JWT\JWT;

require_once '/clases/Usuario.php';

$config['displayErrorDetails'] = TRUE;
$config['addContentLengthHeader'] = FALSE;


$app = new \Slim\App(["settings" => $config]);

//************************************************************************************************************//

//************************************************************************************************************//
// CREAR TOKEN
//************************************************************************************************************//
$app->post("/jwt/crearToken[/]", function (Request $request, Response $response) {

    $datos = $request->getParsedBody();
    $ahora = time();
    
    //PARAMETROS DEL PAYLOAD -- https://tools.ietf.org/html/rfc7519#section-4.1 --
    //SE PUEDEN AGREGAR LOS PROPIOS, EJ. 'app'=> "API REST 2020"       
    $payload = array(
        'iat' => $ahora,            //CUANDO SE CREO EL JWT (OPCIONAL)
        'exp' => $ahora + (30),     //INDICA EL TIEMPO DE VENCIMIENTO DEL JWT (OPCIONAL)
        'data' => $datos,           //DATOS DEL JWT
        'app' => "API REST 2020"    //INFO DE LA APLICACION (PROPIO)
    );
      
    //CODIFICO A JWT (PAYLOAD, CLAVE, ALGORITMO DE CODIFICACION)
    $token = JWT::encode($payload, "miClaveSecreta", "HS256");
    
    return $response->withJson($token, 200);
});
//************************************************************************************************************//

//************************************************************************************************************//
// MIDDLEWARE
//************************************************************************************************************//
$funcionMW = function($request, $response, $next){

  $datos = $request->getParsedBody();
  $token = $datos['token'];

  if(empty($token) || $token === "") {

    $retorno = new stdClass();
    $retorno->mensaje = "El token está vacío!!!";

    return $response->withJson($retorno, 500);
  } 

  return $next($request, $response);
};
//************************************************************************************************************//

//************************************************************************************************************//
// VERIFICAR TOKEN
//************************************************************************************************************//
$app->post("/jwt/verificarToken[/]", function (Request $request, Response $response) {
  
    $datos = $request->getParsedBody();
    $token = $datos['token'];
    $retorno = new stdClass();
    $status = 200;

    try {
      //DECODIFICO EL TOKEN RECIBIDO            
      $decodificado = JWT::decode(
          $token,                    //JWT
          "miClaveSecreta",          //CLAVE USASA EN LA CREACION
          ['HS256']                  //ALGORITMO DE CODIFICACION
        );

      $retorno->mensaje = "Token OK!!!";
    } 
    catch (Exception $e) {

      $retorno->mensaje = "Token no válido!!! --> " . $e->getMessage();
      $status = 500;
    }
    
    return $response->withJson($retorno, $status);

})->add($funcionMW); 
//************************************************************************************************************//

//************************************************************************************************************//
// OBTENER PAYLOAD
//************************************************************************************************************//
$app->post("/jwt/obtenerPayLoad[/]", function (Request $request, Response $response) {
  
    $datos = $request->getParsedBody();
    $token = $datos['token'];
    $retorno = new stdClass();
    $status = 200;

    try {
      $payLoad = JWT::decode(
          $token,
          "miClaveSecreta",
          ['HS256']
        );

      $retorno = $payLoad;
    } 
    catch (Exception $e) {
      $retorno->mensaje = "Token no válido!!! --> " . $e->getMessage();
      $status = 500;
    }

    return $response->withJson($retorno, $status);
});
//************************************************************************************************************//

//************************************************************************************************************//
// OBTENER DATA
//************************************************************************************************************//
$app->post("/jwt/obtenerData[/]", function (Request $request, Response $response) {
  
      $datos = $request->getParsedBody();
      $token = $datos['token'];

      $data = JWT::decode(
          $token,
          "miClaveSecreta",
          ['HS256']
        )->data;

      return $response->withJson($data, 200);
});
//************************************************************************************************************//


$app->run();