<?php

if(isset($_POST["opcion"]))
{
    $numero = $_POST["opcion"];
    $numero = $numero - 1;
    $contador = 0;
    while($numero > 0)
    {
        if($numero % 2 == 1)
        {
            $contador++;
        }
        $numero--;
    }
    echo $contador;
}
else 
{
    echo "NO SE RECIBIO NADA";
}

?>