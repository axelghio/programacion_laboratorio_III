"use strict";
/// <reference path="../node_modules/@types/jquery/index.d.ts" />
function Usuario() {
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
        }
        else {
            window.location.href = './login.html';
        }
    });
    ajax.fail(function (response) {
        console.log("Error en: ");
        console.log(response);
    });
}
function Barbijos() {
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
            GenerarTablaBarbijos(response.perfil);
        }
        else {
            window.location.href = './login.html';
        }
    });
    ajax.fail(function (response) {
        console.log("Error en: ");
        console.log(response);
    });
}
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
            $('#modificar-barbijos').hide("fast");
            var tabla = "<table class='table table-hover' id='tablaUsuariosEsconder'><tr><th>Correo</th><th>Nombre</th><th>Apellido</th><th>Perfil</th><th>Foto</th></tr>";
            for (var _i = 0, _a = response.usuarios; _i < _a.length; _i++) {
                var user = _a[_i];
                tabla += "<tr><td>" +
                    user.correo + "</td><td>" +
                    user.nombre + "</td><td>" +
                    user.apellido + "</td><td>" +
                    user.perfil + "</td><td>" +
                    "<img src='backend" + user.foto + "' class='float-left' title='imagen a la izquierda' width='50px' height='50px'></td>";
            }
            tabla += "</tr></table>";
            $('#TablaUsuario').html(tabla);
        }
        else {
            console.log("No se pudo generar el listado");
        }
    });
    ajax.fail(function (response) {
        console.log("Error en: ");
        console.log(response);
    });
}
function GenerarTablaBarbijos(perfil) {
    var ajax = $.ajax({
        type: "GET",
        url: "./backend/barbijos/",
        cache: false,
        contentType: false,
        processData: false,
        headers: { 'perfil': perfil },
        dataType: "JSON"
    });
    ajax.done(function (response) {
        if (response.ok) {
            $('#modificar-barbijos').hide("fast");
            $('#tablaSoloEmpleados').remove();
            $('#register-barbijos').hide("fast");
            var tabla = "<table class='table table-hover' id='tablaBarbijosEsconder'><tr><th>Color</th><th>Tipo</th><th>Precio</th><th>Acciones</th></tr>";
            for (var _i = 0, _a = response.barbijos; _i < _a.length; _i++) {
                var barbijo = _a[_i];
                tabla += "<tr><td>" +
                    barbijo.color + "</td><td>" +
                    barbijo.tipo + "</td><td>" +
                    barbijo.precio + "</td><td>" +
                    "<button type='button' id='btnBorrar' class='btn-danger' onclick='Borrar(" + barbijo.id + ")'>Borrar</button>" +
                    "<button type='button' id='btnModificar' class='btn-warning' onclick='Modificar(" + barbijo.id + ")' data-toggle='modal' data-target='#myModalModificar'>Modificar</button></td>";
            }
            tabla += "</tr></table>";
            $('#TablaBarbijos').html(tabla);
        }
        else {
            console.log("No se pudo generar el listado");
        }
    });
    ajax.fail(function (response) {
        console.log("Error en: ");
        console.log(response);
    });
}
//Funcion que elimina un barbijo segun su ID.
function Borrar(id) {
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
            if (confirm('eliminar al barbijo con ID: ' + id + '?')) {
                var ajax_1 = $.ajax({
                    type: "delete",
                    url: "./backend/borrarBarbijo/",
                    cache: false,
                    contentType: false,
                    processData: false,
                    headers: { 'id': id.toString() },
                    dataType: "JSON"
                });
                ajax_1.done(function (response) {
                    if (response.ok) {
                        Barbijos();
                    }
                    else {
                        $("#errorEliminacion").html('No se elimino');
                        $('.alert').toggle();
                    }
                });
                ajax_1.fail(function (response) {
                    console.log("Error en: ");
                    console.log(response);
                });
            }
            else {
                $("#errorEliminacion").html('No se elimino');
                $('.alert').toggle();
            }
        }
        else {
            window.location.href = './login.html';
        }
    });
}
//Esta funcion nos habilita en la pantalla un form para realizar un alta.
function AltaBarbijo() {
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
            $('#tablaBarbijosEsconder').remove();
            $('#register-barbijos').show("fast");
        }
        else {
            window.location.href = './login.html';
        }
    });
    ajax.fail(function (response) {
        console.log("Error en: ");
        console.log(response);
    });
}
//Esta funcion si esta todo correcto nos guarda en la base de datos el nuevo auto registrado.
function RegistrarBarbijo() {
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
            var color = void 0;
            var tipo = void 0;
            var precio = void 0;
            color = $('#colorBarbijo').val();
            tipo = $('#tipoBarbijo').val();
            precio = $('#precioBarbijo').val();
            var ajax_2 = $.ajax({
                type: "PUT",
                url: "./backend/agregarBarbijo/",
                cache: false,
                contentType: false,
                processData: false,
                headers: { 'color': color === null || color === void 0 ? void 0 : color.toString(), 'tipo': tipo === null || tipo === void 0 ? void 0 : tipo.toString(), 'precio': precio === null || precio === void 0 ? void 0 : precio.toString() },
                dataType: "JSON"
            });
            ajax_2.done(function (response) {
                if (response.ok) {
                    Barbijos();
                }
            });
            ajax_2.fail(function (response) {
                console.log("Error en: ");
                console.log(response);
            });
        }
        else {
            window.location.href = './login.html';
        }
    });
    ajax.fail(function (response) {
        console.log("Error en: ");
        console.log(response);
    });
}
function Modificar(id) {
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
            var ajax_3 = $.ajax({
                type: "GET",
                url: "./backend/traerUnBarbijo/",
                cache: false,
                contentType: false,
                processData: false,
                headers: { 'id': id.toString() },
                dataType: "JSON"
            });
            ajax_3.done(function (response) {
                if (response.ok) {
                    $('#tablaUsuariosEsconder').hide("fast");
                    var barbijo_1 = response.miBarbijo;
                    $('#modColorBarbijo').val(barbijo_1.color);
                    $('#modTipoBarbijo').val(barbijo_1.tipo);
                    $('#modPrecioBarbijo').val(barbijo_1.precio);
                    //$('#tablaBarbijosEsconder').remove();
                    $('#modificar-barbijos').show("fast");
                    $('#btnModCargar').click(function () {
                        GuardarBarbijo(barbijo_1.id);
                    });
                }
                else {
                    $("#errorEliminacion").html('No se encontro el Barbijo');
                    $('.alert').toggle();
                }
            });
            ajax_3.fail(function (response) {
                console.log("Error en: ");
                console.log(response);
            });
        }
        else {
            window.location.href = './login.html';
        }
    });
}
//Funcion que va a guardar el auto modificado
function GuardarBarbijo(myid) {
    var id = myid;
    var color = $('#modColorBarbijo').val();
    var tipo = $('#modTipoBarbijo').val();
    var precio = $('#modPrecioBarbijo').val();
    var ajax = $.ajax({
        type: "PUT",
        url: "./backend/modificarBarbijo/",
        cache: false,
        contentType: false,
        processData: false,
        headers: { 'id': id === null || id === void 0 ? void 0 : id.toString(), 'color': color === null || color === void 0 ? void 0 : color.toString(), 'tipo': tipo === null || tipo === void 0 ? void 0 : tipo.toString(), 'precio': precio === null || precio === void 0 ? void 0 : precio.toString() },
        dataType: "JSON"
    });
    ajax.done(function (response) {
        //console.log(response);
        if (response.ok) {
            Barbijos();
        }
    });
    ajax.fail(function (response) {
        console.log("Error en: ");
        console.log(response);
    });
}
