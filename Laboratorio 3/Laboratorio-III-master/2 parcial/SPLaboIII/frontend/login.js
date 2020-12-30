/// <reference path="../lib/jquery/index.d.ts" />
function Validar() {
    var correo = $('#mailText').val();
    var clave = $('#claveText').val();
    var flag = false;
    var form = new FormData();
    form.append('correo', correo);
    form.append('clave', clave);
    var ajaxFoto = $.ajax({
        type: "POST",
        url: "./backend/login/",
        cache: false,
        contentType: false,
        processData: false,
        data: form,
        dataType: "JSON"
    });
    ajaxFoto.done(function (response) {
        if (response.ok) {
            localStorage.setItem('jwt', response.jwt);
            window.location.href = './principal.html';
        }
        else {
            $('#alertText').html('No se encontro el usuario');
            $('.alert').toggle();
        }
    });
}
function ModalRegistrar() {
    $('#myModal').toggle();
}
