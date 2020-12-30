/// <reference path="node_modules/@types/jquery/index.d.ts" />
function comprobar() {
    var http = new XMLHttpRequest();
    http.open("POST", "http://localhost/Clase_06/login/Ingresar/", true);
    http.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    var correo = document.getElementById('correoTxt').value;
    var clave = document.getElementById("claveTxt").value;
    var usu = { "id": correo, "clave": clave };
    http.send("usuario=" + JSON.stringify(usu));
    var respuesta;
    http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
            console.log(http.responseText);
            var response = JSON.parse(http.responseText);
            if (!response.existe) {
                $("#divError").removeClass('entro');
                $("#divError").addClass('error');
                $("#divError").html('ERROR: El usuario no existe');
            }
            else {
                $("#divError").removeClass('error');
                $("#divError").addClass('entro');
                $("#divError").html('El usuario existe');
            }
            console.log(response);
        }
    };
}
function insertar() {
    var http = new XMLHttpRequest();
    http.open("POST", "http://localhost/Clase_06/login/Registrar/", true);
    http.setRequestHeader("enctype", "multipart/form-data");
    var form = new FormData();
    var nombre = document.getElementById("nombreTxt").value;
    var apellido = document.getElementById("apellidoTxt").value;
    var correo = document.getElementById('correoTxt').value;
    var clave = document.getElementById("claveTxt").value;
    var perfil = document.getElementById("perfilTxt").value;
    var foto = document.getElementById("foto");
    var usu = { "nombre": nombre, "apellido": apellido, "perfil": perfil, "correo": correo, "clave": clave };
    form.append('foto', foto.files[0]);
    form.append('usuario', JSON.stringify(usu));
    //http.send("usuario="+JSON.stringify(usu)+"&op=insertar");
    http.send(form);
    var respuesta;
    http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
            respuesta = JSON.parse(http.responseText);
            console.log(respuesta);
            if (respuesta.exito) {
                $("#divError").removeClass('error');
                $("#divError").addClass('entro');
                $("#divError").html('El usuario se registro');
            }
            else {
                $("#divError").removeClass('entro');
                $("#divError").addClass('error');
                $("#divError").html('ERROR: El usuario no se pudo registro');
            }
            console.log(respuesta);
        }
    };
}
