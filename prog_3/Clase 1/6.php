<?php
$operador = "*";
$op1 = 10;
$op2 = 5;

switch ($operador) {
    case '+':
        {
            echo "El resultado de la suma es: ";
            echo $op1 + $op2;
        }
        break;
        case '-':
            {
                echo "El resultado de la resta es: ";
                echo $op1 - $op2;
            }
            break;
        case '/':
            {
                echo "El resultado de la division es: ";
                echo $op1 / $op2;
            }
            break;
        case '*':
            {
                echo "El resultado de la multiplicacion es: ";
                echo $op1 * $op2;
            }
            break;
    default:
        echo "Operador invalido.";
        break;
}
?>