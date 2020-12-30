<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link type="text/css" rel="stylesheet" href="./Clases/estilo.css" />
    <script src = http://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js></script>
    <script src="ajax.js"></script>
    <title>Registro</title>
</head>
<body>
<div id='divError'></div>
<p>Nombre</p>
    <input type="text" name="nombreTxt" id="nombreTxt">
<p>Apellido</p>
    <input type="text" name="apellidoTxt" id="apellidoTxt">
<p>Correo</p>
    <input type="text" name="correoTxt" id="correoTxt">
<p>Clave</p>
    <input type="password" name="claveTxt" id="claveTxt">
<p>Perfil</p>
    <input type="text" name="perfilTxt" id="perfilTxt">
<input type="file" name="foto" id="foto">
<br>
<input type="button" value="Aceptar" onclick="insertar()">
<input type="button" value="Cancelar" onclick="location.href='./login.php'">
</body>
</html>