<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Mostrar Datos</title>
</head>
<body>
<table border="1">
<thead>
    <tr>
        <td>TIPO</td>
        <td>PRECIO</td>
        <td>PAIS ORIGEN</td>
        <td>IVA</td>
        <td>FOTO</td>
    </tr>
        <?php
            require_once "clases/Televisor.php";

            $televisor = new Televisor();
            $tabla = "";
            $datos = $televisor->Traer();

            foreach($datos as $datitos) 
            {
                var_dump($datitos);
                $tabla.= "<tr><td>" . $datitos->tipo . "</td>" .
                         "<td>" . $datitos->precio . "</td>" .
                         "<td>" . $datitos->pais . "</td>".
                         "<td>" . $datitos->CalcularIVA() . "</td>";

                if($datitos->foto != null)
                {
                    $tabla .= "<td><img src=./televisores/imagenes/" . $datitos->foto . " width='50px'></td>";
                }

                $tabla .= "</tr>";
            }

            echo $tabla;
        ?>
</thead>
</table>
</body>
</html>