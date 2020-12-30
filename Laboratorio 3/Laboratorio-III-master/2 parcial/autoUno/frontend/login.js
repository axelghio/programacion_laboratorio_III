/// <reference path="../lib/jquery/index.d.ts" />
$(document).ready(function () {
});
function Validar() {
    var correo = $('#email').val();
    var clave = $('#clave').val();
    var flag = false;
    var form = new FormData();
    form.append('correo', correo);
    form.append('clave', clave);
    var ajaxFoto = $.ajax({
        type: "POST",
        url: "./backend/userValidation/",
        cache: false,
        contentType: false,
        processData: false,
        data: form,
        dataType: "JSON"
    });
    ajaxFoto.done(function (response) {
        if (response.ok) {
            flag = true;
            localStorage.setItem('jwt', response.jwt);
            window.location.href = './principal.html';
        }
        else {
            $('#errorLogin').html('No se encuentra el usuario');
            $('.alert').toggle();
        }
    });
}
