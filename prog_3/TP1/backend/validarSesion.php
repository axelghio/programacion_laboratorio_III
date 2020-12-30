<?php
session_start();
if(empty($_SESSION["DNIEmpleado"]))
{
    header('Location: ../login.html');
}
?>
