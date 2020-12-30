<?php
    $archivo = fopen("./elementos_json/autos.json", "r");

    if($archivo != null){
        $auto = fread($archivo, filesize("./elementos_json/autos.json"));
    }
    
    fclose($archivo);

    echo($auto);