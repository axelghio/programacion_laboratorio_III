<?php
$a = 2;
$b = 2;
$c = 6;

if($a != $b && $b != $c && $a != $c)
{
    if($a > $b && $a < $c)
    {
        echo "A es el del medio.";
    }
    else if($a < $b && $a > $c)
    {
        echo "A es el del medio.";
    }
    else if($a > $b && $b > $c)
    {
        echo "B es el del medio.";
    }
    else if($a < $b && $b < $c)
    {
        echo "B es el del medio.";
    }
    if($c > $a && $c < $b)
    {
        echo "C es el del medio.";
    }
    else if($c < $a && $c > $b)
    {
        echo "C es el del medio.";
    }
}
else
{
    echo "No hay valor del medio";
}
?>