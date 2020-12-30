<?php
/*echo "hola mundo";    //el echo solo muestra string.
$algo = "hola mundo";
$nombre = "Soy Axel";
echo "<br>";
echo $algo . "<br>" . $nombre;*/


#arrays
/*
echo "<br><br><br>CREAMOS ARRAY<br>";
$vec = array(1,2,3,5, "aaa");
$vec[5] = 44;
var_dump($vec); //para mostrar array objectos se usa el var_dump
//no deberiamos hacer esto.
*/

$vec = array();
array_push($vec,54);    //toma el array con la cantidad de elementos y le agrega al ultimo el valor.
array_push($vec, 8);
array_push($vec, -2);
var_dump($vec);
echo "<br><br><br>MOSTRAMOS ARRAY<br>";


#foreach
foreach ($vec as $item) {
    echo "<br>" . $item . "<br>";
}

#array asociativo
$otro = array("hola"=> 5, "chau" => 12);
var_dump($otro);
?>