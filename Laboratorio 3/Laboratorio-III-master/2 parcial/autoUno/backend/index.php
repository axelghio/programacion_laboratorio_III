<?php
    use \Psr\Http\Message\ServerRequestInterface as Request;
    use \Psr\Http\Message\ResponseInterface as Response;
    use \Firebase\JWT\JWT;
    require_once './vendor/autoload.php';
    require_once './clases/usuario.php';
    require_once './clases/auto.php';
    
    $config['displayErrorDetails'] = true;
    $config['addContentLengthHeader'] = false;
    
    $app = new \Slim\App(["settings" => $config]);

    $app->post('/', \Usuario::class . ':CargarUno');
    $app->get('/', \Usuario::class . ':Listado');
    $app->get('/userTable/', \Usuario::class . ':Tabla');
    $app->get('/carTable/', \Auto::class . ':Tabla');
    $app->get('/jwt/', \Usuario::class . ':VerificarToken');

    $app->delete('/borrarAuto/', \Auto::class . ':BorrarUno');

    $app->post('/userValidation/', \Usuario::class . ':Validar');
    $app->run();