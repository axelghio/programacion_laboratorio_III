"use strict";
/// <reference path="../node_modules/@types/jquery/index.d.ts" />
function Registrar() {
    var correo = $('#mailRegistro').val();
    var form = new FormData();
    form.append('correo', correo);
    var flag = false;
    var ajaxRegistro = $.ajax({
        type: "POST",
        url: "./backend/userValidation/",
        cache: false,
        contentType: false,
        processData: false,
        data: form,
        dataType: "JSON"
    });
    ajaxRegistro.done(function (response) {
        if (response.ok == false) {
            var formUsu = new FormData();
            var nombre = $('#nombre').val();
            var clave = $('#claveRegistro').val();
            var apellido = $('#apellido').val();
            var perfil = $('#perfil').val();
            var foto = $("#foto").prop('files')[0];
            var nuevo = { 'correo': correo, 'clave': clave, 'nombre': nombre, 'apellido': apellido, 'perfil': perfil, 'foto': foto.name };
            formUsu.append('usu', JSON.stringify(nuevo));
            formUsu.append('foto', foto);
            var ajax = $.ajax({
                type: "POST",
                url: "./backend/",
                cache: false,
                contentType: false,
                processData: false,
                data: formUsu,
                dataType: "JSON"
            });
            ajax.done(function (response) {
                if (response.ok) {
                    window.location.href = './login.html';
                }
                else {
                    $('#errorRegistro').html('No se pudo registrar');
                    $('#errorRegistro').show();
                }
            });
        }
        else {
            $('#errorRegistro').html('No se pudo registrar 2');
            $('#errorRegistro').show();
        }
    });
}
