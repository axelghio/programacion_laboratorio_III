/// <reference path="../lib/jquery/index.d.ts" />
function Registrar() {
    var correo = $('#email2').val();
    var clave = $('#clave2').val();
    var form = new FormData();
    form.append('correo', correo);
    form.append('clave', clave);
    var flag = false;
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
        }
        else {
            $('#errorRegistro').html('Ya existe un usuario con ese correo');
            $('.alert').toggle();
        }
    });
    if (!flag) {
        var formUsu = new FormData();
        var nombre = $('#nombre').val();
        var apellido = $('#apellido').val();
        var foto = $('#foto').prop('files')[0];
        var perfil = $('#perfil').val();
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
                $("#myModal .close").click();
            }
            else {
                $('#errorRegistro').html('No se pudo registrar');
                $('.alert').toggle();
            }
        });
    }
}
