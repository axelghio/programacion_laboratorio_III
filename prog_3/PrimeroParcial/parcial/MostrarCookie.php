<?php
    $email = isset($_GET["email"]) ? $_GET["email"] : null;
    $auxUser;
    
    $modificado = str_replace(".", "_", $email);
    
    if(isset($_COOKIE[$modificado]))
    {
        $auxUser = $_COOKIE[$modificado];
    }
    else
    {
        $auxUser = "No se encuentra seteada la cookie";
    }
    return $auxUser;
?>