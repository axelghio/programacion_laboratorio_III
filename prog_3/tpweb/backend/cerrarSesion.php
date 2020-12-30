<?php
    if(empty($_SESSION["DNIEmpleado"]))
    {
        session_unset();
        session_destroy();
        header("refresh:1;url=../login.html");
    }
?>