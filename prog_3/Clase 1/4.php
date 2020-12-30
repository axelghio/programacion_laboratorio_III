<?php
    $contador = 1;
    $resultado = 0;
    while($resultado<= 1000)
    {
        $resultado = $resultado + $contador;
        if($resultado > 1000)
        {
            $resultado = $resultado - $contador;
            echo "Se sumaron: ";
            echo $contador;
            echo " numeros.";
        break;
        }
        $contador++;
        echo "El resultado es: ";
        echo $resultado;
        echo "<br/>";
    }

?>