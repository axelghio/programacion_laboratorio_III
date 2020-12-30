<?php

$vec = array(5);
$promedio = 0;

for ($i=0; $i < 4; $i++) { 
    array_push($vec,rand(0, 10));
}

foreach ($vec as  $item) {
    $promedio = $promedio + $item;
}

$promedio = $promedio/5;

if($promedio > 6)
    echo "<br>Promedio mayor a 6<br>";
else if($promedio == 6)
    echo "<br>promedio igual a 6<br>";
else
    echo "<br>promedio menor a 6<br>";
?>