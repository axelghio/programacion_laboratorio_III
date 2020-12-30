<?php
    $vec = array(
        0 => rand(1, 10),
        1 => rand(1, 10),
        2 => rand(1, 10),
        3 => rand(1, 10),
        4 => rand(1, 10)
    );
    $resultado = 0;
    
    foreach ($vec as $i => $value) {
        $resultado = $resultado + $vec[$i];
    }
    
    $resultado = $resultado / 5;
    if($resultado > 6)
    {
        echo "El ";
        echo $resultado;
        echo " es mayor a 6"; 
    }
    else if($resultado == 6)
    {
        echo "El ";
        echo $resultado;
        echo " es igual a 6"; 
    }
    else
    {
        echo "El ";
        echo $resultado;
        echo " es menor a 6";
    }
?>