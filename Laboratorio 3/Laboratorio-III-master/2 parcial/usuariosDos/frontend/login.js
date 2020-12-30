/// <reference path="../lib/jquery/index.d.ts" />
$(document).ready(function () {
    var ajaxFoto = $.ajax({
        type: "GET",
        url: "./backend/",
        cache: false,
        contentType: false,
        processData: false,
        dataType: "JSON"
    });
    ajaxFoto.done(function (response) {
        if (response.ok) {
            localStorage.setItem("usuarios", JSON.stringify(response.listado));
        }
        else {
            console.log("No se pudo cargar");
        }
    });
    console.log(JSON.parse(localStorage.getItem('usuarios')));
});
function Validar() {
    var lista = JSON.parse(localStorage.getItem('usuarios'));
    var correo = $('#mailText').val();
    var clave = $('#claveText').val();
    var flag = false;
    if (lista != null) {
        for (var _i = 0, lista_1 = lista; _i < lista_1.length; _i++) {
            var usu = lista_1[_i];
            if (usu.correo == correo && usu.clave == clave) {
                flag = true;
                sessionStorage.setItem('login', JSON.stringify(usu));
                window.location.href = './principal.html';
            }
        }
        if (!flag) {
            $('#alertText').html('No se encuentra el usuario');
            $('.alert').toggle();
        }
    }
}
