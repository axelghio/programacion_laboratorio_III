"use strict";
/// <reference path="../lib/jquery/index.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
function Validar() {
    var correo = $('#mailLogin').val();
    var clave = $('#claveLogin').val();
    var flag = false;
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
    ajaxLogin.fail(function () {
        alert("error en ajax");
    });
}
function limpiarLogin() {
    $('#mailLogin').val("");
    $('#claveLogin').val("");
    $('#alertLogin').hide();
    //$("#loginForm").data('bootstrapValidator').resetForm();
}
function cerrarAlert() {
    $('.alert').toggle();
}
function ModalRegistrar() {
    $('#myModal').toggle();
}
