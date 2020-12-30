<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
use \Firebase\JWT\JWT;

require_once 'vendor/autoload.php';
require_once './clases/usuario.php';
require_once './clases/auto.php';
require_once './clases/mw.php';

$config['displayErrorDetails'] = true;
$config['addContentLengthHeader'] = false;
$app = new \Slim\App(["settings" => $config]);

$app->post('/usuarios[/]', \Usuario::class . ':AgregarUser')->add(\MW::class . ':UsuarioNoExiste')->add(\MW::class . '::CorreoClaveVacios')->add(\MW::class . ':CorreoClaveSeteados');
$app->get('/', \Usuario::class . ':Mostrar');

$app->post('/', \Auto::class . ':AgregarAuto')->add(\MW::class . ':AutoValido');
$app->get('/autos[/]', \Auto::class . ':Listar');

$app->group('/login', function()
{
    $this->post('/', \Usuario::class . ':JWTCorreoYClave')->add(\MW::class . '::UsuarioExiste')->add(\MW::class . '::CorreoClaveVacios')->add(\MW::class . ':CorreoClaveSeteados');
    $this->get('/', \Usuario::class . ':VerificarToken');
});

$app->delete('/', \Auto::class . ':BorrarUno')->add(\MW::class . ':TokenValido')->add(\MW::class . '::VerificarPropietario')->add(\MW::class . ':VerificarEncargado');
$app->put('/', \Auto::class . ':ModificarUno')->add(\MW::class . ':TokenValido')->add(\MW::class . '::VerificarPropietario')->add(\MW::class . ':VerificarEncargado');

$app->run();