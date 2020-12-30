<?php

$accion = $_POST["accion"];

switch($accion)
{
    case "agregar":
        AgregarCiudadano();
        break;
    case "mostrar":
        MostrarCiudadanos();
        break;
    case "eliminar":
         EliminarCiudadano();
         break;
    case "modificar":
         ModificarCiudadano();
         break;
    case "filtrar":
         FiltrarCiudadano();
         break;
    case "paises":
         CargarPaises();
         break;
    default:
        echo "=(";
        break;
}

function AgregarCiudadano()
{
    $foto = $_FILES["foto"]["name"];
    $destino = "fotos/". $foto;

    $ciudadano =  $_POST["obJSON"];
    $file = fopen("ciudadanos.json","a");
    
    if(fwrite($file,$ciudadano . "\n") > 0 && move_uploaded_file($_FILES["foto"]["tmp_name"],$destino))
    {
        echo "1";
    }
    fclose($file);
}
function MostrarCiudadanos()
{
    $tabla = "<table border = '2'><tr><td>DNI</td><td>Apellido</td><td>Nombre</td><td>Edad</td><td>Pais</td><td>Foto</td><td>Accion</td></tr>";
    $ciudadanos = ArrayCiudadanos();
    
    foreach($ciudadanos as $element)
    {
        $obJSON = json_encode($element);
        $tabla .= "<tr>
               <td>{$element->dni}</td>
               <td>{$element->apellido}</td>
               <td>{$element->nombre}</td>
               <td>{$element->edad}</td>
               <td>{$element->pais}</td>
               <td><img src=../BACKEND/fotos/{$element->foto} width='50px'></td>
               <td><input type = 'button' value = 'Eliminar' onclick = 'Entidades.Manejadora.EliminarCiudadano({$obJSON})'><br>
               <input type = 'button' value = 'Modificar' onclick = 'Entidades.Manejadora.ModificarCiudadano({$obJSON})' id='btnModificar'></td>
        
        </tr>";
    }
    $tabla .= "</table>";
    echo $tabla;
}
function EliminarCiudadano()
{
    $obJSON = json_decode($_POST["obJSON"]);
    $ciudadanos = ArrayCiudadanos();
    $archivo = fopen("ciudadanos.json","w");
    $datos = "";

    foreach($ciudadanos as $element)
    {
        if($element->dni != $obJSON->dni)
        {
            $datos .= json_encode($element) . "\n";
        }
    }
    if(fwrite($archivo,$datos) > 0)
    {
        echo "1";
    }
}
function ModificarCiudadano()
{
    $obJSON = json_decode($_POST["obJSON"]);
    $foto = $_FILES["foto"]["name"];
    $destino = "../BACKEND/fotos/" . $foto;
    $ciudadanos = ArrayCiudadanos();
    $archivo = fopen("ciudadanos.json","w");
    $datos = "";

    foreach($ciudadanos as $element)
    {
        if($element->dni == $obJSON->dni)
        {
            $element->nombre = $obJSON->nombre;
            $element->apellido = $obJSON->apellido;
            $element->edad = $obJSON->edad;
            $element->pais = $obJSON->pais;
            $element->foto = $obJSON->foto;
            
            $datos .= json_encode($element) . "\n";
        }
        else
        {
            $datos .= json_encode($element) . "\n";
        }
    }
    if(fwrite($archivo,$datos) > 0 && move_uploaded_file($_FILES["foto"]["tmp_name"],$destino))
    {
        echo "1";
    }


}
function FiltrarCiudadano()
{
    $nac = $_POST["cboPais"];
    $tabla = "<table border = '2'><tr><td>DNI</td><td>Apellido</td><td>Nombre</td><td>Edad</td><td>Nacionalidad</td><td>Accion</td></tr>";
    $ciudadanos = ArrayCiudadanos();
    
    foreach($ciudadanos as $element)
    {
        if($element->pais == $nac)
        {
            $obJSON = json_encode($element);
            $tabla .= "<tr>
               <td>{$element->dni}</td>
               <td>{$element->apellido}</td>
               <td>{$element->nombre}</td>
               <td>{$element->edad}</td>
               <td>{$element->pais}</td>
               <td><img src=../BACKEND/fotos/{$element->foto} width='50px'></td>
               <td><input type = 'button' value = 'Eliminar' onclick = 'Entidades.Manejadora.EliminarCiudadano({$obJSON})'><br>
               <input type = 'button' value = 'Modificar' onclick = 'Entidades.Manejadora.ObtenerCiudadano({$obJSON})'></td>
        
            </tr>";
        }
    }
    $tabla .= "</table>";
    echo $tabla;
}
function ArrayCiudadanos()
{
    $archivo = fopen("ciudadanos.json","r");
    $ciudadanos = array();
    while(!feof($archivo))
    {
       
       $dato = json_decode(fgets($archivo));
       if($dato == null)
       {
           continue;
       }
       
       array_push($ciudadanos,$dato);
    }
    fclose($archivo);
    return $ciudadanos;
}
function CargarPaises()
{
    $archivo = fopen("paises.json","r");
    echo fread($archivo,filesize("paises.json"));
    fclose($archivo);
}