<?php
    $vec = $arrayName = array(
        0 => 1,
        1 => 3,
        2 => 5,
        3 => 7, 
        4 => 9,
        5 => 11,
        6 => 13,
        7 => 15,
        8 => 17,
        9 => 19,
    );

    echo "CON UN FOR";
    echo "<br/>";
    #Utilizando FOR
    for ($i=0; $i < 10; $i++) { 
        echo $vec[$i];
        echo "<br/>";
    }
    
    
    /*
    echo "CON UN WHILE";
    echo "<br/>";
    #Utilizando WHILE.
    $i = 0;
    while ($i < 10) {
        echo $vec[$i];
        echo "<br/>";
        $i++;
    }
    */
    
    /*
    #Utilizando FOREACH
    echo "CON UN FOREACH";
    echo "<br/>";
    foreach ($vec as $i => $value) {
        echo $vec[$i];
        echo "<br/>";
    }
    */
?>