<?php
    use \Psr\Http\Message\ServerRequestInterface as Request;
    use \Psr\Http\Message\ResponseInterface as Response;
    use Firebase\JWT\JWT;
    require_once './vendor/autoload.php';
    require_once './clases/usuario.php';
    $config['displayErrorDetails'] = true;
    $config['addContentLengthHeader'] = false;
    
    $app = new \Slim\App(["settings" => $config]);

    $app->group('/login/', function(){
        $this->post('[/]', \Usuario::class . ':ObtenerCorreoYClave');
    });

    $app->run();