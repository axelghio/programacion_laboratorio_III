<?php

class Listado
{
    public static function ObtenerAutosJson($request, $response)
    {
        $a = fopen("./archivos/autos.json","r");

        $autos_string = fread($a, filesize("./archivos/autos.json"));

        fclose($a);

        return $autos_string;
    }
}