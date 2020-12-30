"use strict";
/// <reference path="../node_modules/@types/jquery/index.d.ts" />
//import { ajax } from "jquery";
function Validar() {
    var correo = $('#mailLogin').val();
    var clave = $('#claveLogin').val();
    var form = new FormData();
    form.append('correo', correo);
    form.append('clave', clave);
    var ajaxLogin = $.ajax({
        type: "POST",
        url: "./backend/login/",
        cache: false,
        contentType: false,
        processData: false,
        data: form,
        dataType: "JSON"
    });
    ajaxLogin.done(function (response) {
        if (response.ok) {
            localStorage.setItem('jwt', response.jwt);
            window.location.href = './principal.html';
        }
        else {
            $('#alertText').html('No se encontro el usuario');
            $('#alertLogin').show();
        }
    });
    ajaxLogin.fail(function (response) {
        alert("error en ajax:");
        console.log(response);
    });
}
