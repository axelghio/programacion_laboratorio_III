<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link type="text/css" rel="stylesheet" href="./Clases/estilo.css" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <script src = http://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js></script>
    <script src="ajax.js"></script>
    <title>Login</title>
</head>
<body>
    <div id='divError'></div>
    <p>Legajo</p>
    <input type="text" name="correoTxt" id="correoTxt" placeholder="Ingrese su correo">
   <p>Clave</p>
    <input type="password" name="claveTxt" id="claveTxt" placeholder="Ingrese su clave">
    <br>
    <input type="button" value="Aceptar" onclick="comprobar()">
    <input type="button" value="Cancelar">
    <br>
    <a  href="./registro.php" >Registrarse</a>
    
</body>
</html>