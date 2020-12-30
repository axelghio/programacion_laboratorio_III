/// <reference path="../lib/jquery/index.d.ts" />
$(document).ready(function () {
    var jwt = localStorage.getItem('jwt');
    var ajax = $.ajax({
        type: "GET",
        url: "./backend/jwt/",
        cache: false,
        contentType: false,
        processData: false,
        headers: { 'token': jwt },
        dataType: "JSON"
    });
    ajax.done(function (response) {
        if (response.ok) {
            GenerarTablaUsuarios(response.perfil);
            GenerarTablaAutos(response.perfil);
        }
        else {
            window.location.href = './login.html';
        }
    });
});
function GenerarTablaUsuarios(perfil) {
    var ajax = $.ajax({
        type: "GET",
        url: "./backend/userTable/",
        cache: false,
        contentType: false,
        processData: false,
        headers: { 'perfil': perfil },
        dataType: "JSON"
    });
    ajax.done(function (response) {
        if (response.ok) {
            $('#miDiv').html(response.tabla);
        }
        else {
            console.log("No se pudo generar el listado");
        }
    });
}
function GenerarTablaAutos(perfil) {
    var ajax = $.ajax({
        type: "GET",
        url: "./backend/carTable/",
        cache: false,
        contentType: false,
        processData: false,
        headers: { 'perfil': perfil },
        dataType: "JSON"
    });
    ajax.done(function (response) {
        if (response.ok) {
            $('#miDiv2').html(response.tabla);
        }
        else {
            console.log("No se pudo generar el listado");
        }
    });
}
function Borrar(id) {
    if (confirm('¿Desea eliminar al auto ' + id + '?')) {
        var ajax = $.ajax({
            type: "delete",
            url: "./backend/borrarAuto/",
            cache: false,
            contentType: false,
            processData: false,
            headers: { 'id': id.toString() },
            dataType: "JSON"
        });
        ajax.done(function (response) {
            if (response.ok) {
                GenerarTablaAutos();
            }
            else {
                $("#errorEliminacion").html('No se elimino');
                $('.alert').toggle();
            }
        });
    }
    else {
        $("#errorEliminacion").html('No se elimino');
        $('.alert').toggle();
    }
}
