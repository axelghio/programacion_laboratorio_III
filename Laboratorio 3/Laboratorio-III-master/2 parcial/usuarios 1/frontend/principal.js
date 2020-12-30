/// <reference path="../lib/jquery/index.d.ts" />
$(document).ready(function () {
    $('#listadoDiv').html(GenerarTabla());
    CambiarAspecto();
});
function GenerarTabla() {
    var listado = JSON.parse(localStorage.getItem('usuarios'));
    var login = JSON.parse(sessionStorage.getItem('login'));
    var tabla = "<table id='tableUsers' class='table table-bordered table-hover'><thead><tr class='info'><td>Correo</td><td>Nombre</td><td>Apellido</td><td>Perfil</td><td>Legajo</td><td>Foto</td></tr></thead><tbody>";
    for (var _i = 0, listado_1 = listado; _i < listado_1.length; _i++) {
        var usu = listado_1[_i];
        tabla += "<tr><td>" + usu.correo + "</td><td>" + usu.nombre + "</td><td>" + usu.apellido + "</td><td>" + usu.perfil + "</td><td>" + usu.legajo + "</td>";
        tabla += "<td><img class='fotoUser' src='./backend/fotos/" + usu.foto + "' height=50px width=50px></td>";
        if (login.perfil == 'admin') {
            tabla += "<td><button type='button' id='btnBorrar' class='btn-danger' onclick='Borrar(\"" + usu.correo + "\")' data-toggle=\"modal\" data-target=\"#confirmarEliminar\">Borrar</button></td></tr>";
        }
        else if (login.perfil == 'invitado') {
            $('#controles').prop('hidden', false);
        }
        else if (login.perfil == 'superadmin') {
            tabla += "<td><button type='button' id='btnBorrar' class='btn-danger' onclick='Borrar(\"" + usu.correo + "\")' data-toggle=\"modal\" data-target=\"#confirmarEliminar\">Borrar</button></br>";
            tabla += "<button type='button' id='btnModif' class='btn-warning' onclick='Modificar(\"" + usu.correo + "\")'  data-toggle=\"modal\" data-target=\"#modificacion\">Modificar</button></td></tr>";
        }
    }
    tabla += "</tbody></table>";
    return tabla;
}
function Borrar(correo) {
    $('#confirmarTexto').html("\u00BFDesea eliminar a " + correo + "?");
    $('#modal-btn-si').click(function () {
        var nuevo = new Array();
        var listado = JSON.parse(localStorage.getItem('usuarios'));
        for (var _i = 0, listado_2 = listado; _i < listado_2.length; _i++) {
            var usu = listado_2[_i];
            if (usu.correo != correo) {
                nuevo.push(usu);
            }
        }
        localStorage.setItem('usuarios', JSON.stringify(nuevo));
        $('#listadoDiv').html(GenerarTabla());
    });
}
function Imagenes() {
    var fondo = $('#colorFondo').val();
    var fuente = $('#colorFuente').val();
    var marco = $('#marcoImagen').val();
    var usuario = JSON.parse(sessionStorage.getItem('login'));
    $('.fotoUser').removeClass("img-");
    $('.fotoUser').removeClass("img-rounded");
    $('.fotoUser').removeClass("img-thumbnail");
    $('.fotoUser').removeClass("img-circle");
    localStorage.setItem("tablaConfig." + usuario.correo, "{\"fondo\":\"" + fondo + "\",\"fuente\":\"" + fuente + "\",\"marco\":\"" + marco + "\"}");
    CambiarAspecto();
}
function CambiarAspecto() {
    var usuario = JSON.parse(sessionStorage.getItem('login'));
    if (localStorage.getItem("tablaConfig." + usuario.correo) != null) {
        var config = JSON.parse(localStorage.getItem("tablaConfig." + usuario.correo));
        $('#tableUsers').css({ 'background-color': config.fondo, 'color': config.fuente });
        $('#colorFondo').val(config.fondo);
        $('#colorFuente').val(config.fuente);
        $('#marcoImagen').val(config.marco);
        $('.fotoUser').addClass("img-" + config.marco);
    }
}
function Modificar(correo) {
    $('#btnEnviar').click(function () {
        var nombre = $('#nombreText').val();
        var apellido = $('#apellidoText').val();
        var legajo = $('#legajoText').val();
        var perfil = $('#perfilText').val();
        var foto = $("#fotoFile").prop('files')[0];
        var clave = $('#claveText').val();
        var lista = Array();
        lista = JSON.parse(localStorage.getItem('usuarios'));
        var nuevaLista = Array();
        for (var _i = 0, lista_1 = lista; _i < lista_1.length; _i++) {
            var usu = lista_1[_i];
            if (usu.correo != correo) {
                nuevaLista.push(usu);
            }
        }
        var nuevo = { 'correo': correo, 'clave': clave, 'nombre': nombre, 'apellido': apellido, 'legajo': legajo, 'perfil': perfil, 'foto': foto.name };
        var formFoto = new FormData();
        formFoto.append('foto', foto);
        var ajaxFoto = $.ajax({
            type: "POST",
            url: "./backend/guardarImagen.php",
            cache: false,
            contentType: false,
            processData: false,
            data: formFoto,
            dataType: "JSON"
        });
        ajaxFoto.done(function (response) {
            if (response.ok) {
                nuevaLista.push(nuevo);
                localStorage.setItem("usuarios", JSON.stringify(nuevaLista));
                window.location.href = './principal.html';
            }
            else {
                console.log("No se pudo registrar");
            }
        });
    });
}
