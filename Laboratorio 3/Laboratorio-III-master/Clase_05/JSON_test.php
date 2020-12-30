<?php
    $prod = json_decode( $_POST["producto"]);
    //var_dump($_POST);
    $prod->precio = 250;

    var_dump(json_encode($prod));