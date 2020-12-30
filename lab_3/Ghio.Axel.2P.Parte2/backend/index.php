<?php
    use \Psr\Http\Message\ServerRequestInterface as Request;
    use \Psr\Http\Message\ResponseInterface as Response;
    use \Firebase\JWT\JWT;
    require_once './vendor/autoload.php';
    require_once './clases/usuario.php';
    require_once './clases/barbijos.php';

    
    $config['displayErrorDetails'] = true;
    $config['addContentLengthHeader'] = false;
    
    $app = new \Slim\App(["settings" => $config]);

    $app->post('/', \Usuario::class . ':CargarUno');
    $app->get('/', \Usuario::class . ':Listado');
    $app->post('/userValidation/', \Usuario::class . ':Validar');
    $app->post('/login/', \Usuario::class . ':Login');
    $app->get('/userTable/', \Usuario::class . ':Tabla');
    $app->get('/barbijos/', \Barbijo::class . ':Tabla');
    $app->get('/jwt/', \Usuario::class . ':VerificarToken');
    $app->delete('/borrarBarbijo/', \Barbijo::class . ':BorrarUno');
    $app->put('/modificarBarbijo/', \Barbijo::class . ':ModificarUno');
    $app->put('/agregarBarbijo/', \Barbijo::class . ':AgregarUno');
    $app->get('/traerUnBarbijo/', \Barbijo::class . ':TraerUnBarbijo');
    $app->run();