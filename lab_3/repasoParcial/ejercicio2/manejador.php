<?php

if(isset($_POST["opcion"]))
{
    $path = 'archivos/' . $_POST["opcion"];
    $archivo = fopen($path, "r");
    while(!feof($archivo))
    {
        echo $archivo;
    }
}
else 
{
    echo "NO SE RECIBIO NADA";
}

?>