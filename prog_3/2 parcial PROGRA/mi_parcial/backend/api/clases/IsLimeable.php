<?php 

interface  ISlimeable
{
    function MostrarTodos($request, $response, $args);
    function MostrarUno($request, $response, $args);
    function Agregar($request, $response, $args);
    function Modificar($request, $response, $args);
    function Borrar($request, $response, $args);
}

interface ISlimeable2
{
    function Logear($request, $response, $args);
}