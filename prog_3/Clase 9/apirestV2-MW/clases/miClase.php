<?php

class MiClase
{

    public function MostrarInstancia($request, $response, $next)
    {
        $response->getBody()->write('<br>Desde método de instancia (antes del verbo)<br>');
        
        $newResponse =  $next($request, $response);
        
        $response->getBody()->write('<br>Desde método de instancia (después del verbo)<br>');
        
        return $newResponse;
    }
    
    public static function MostrarEstatico($request, $response, $next)
    {
        $response->getBody()->write('<br>Desde método estático<br>');

        return $next($request, $response);
    }
}