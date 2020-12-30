/// <reference path="../lib/jquery/index.d.ts" />

function Registrar()
{  
    let data = $("#registroForm").data('bootstrapValidator');
    console.log("Campos invalidos en registro = " + data.$invalidFields.length);
    if(data.$invalidFields.length == 0)
    {
        let correo = $('#mailRegistro').val();
        let form = new FormData();
        form.append('correo', correo as string);
        let flag = false;
        console.log(correo);
        let ajaxRegistro = $.ajax({
            type: "POST",
            url: "./backend/userValidation/",
            cache: false,
            contentType: false,
            processData : false,
            data: form,
            dataType: "JSON"
        });
        ajaxRegistro.done(function(response){
            if(response.ok == false)
            {
                let formUsu = new FormData();
                let nombre = $('#nombre').val();
                let clave = $('#claveRegistro').val();
                let apellido = $('#apellido').val();
                let perfil = $('#perfil').val();
                let foto = $("#foto").prop('files')[0]
                let nuevo = {'correo':correo,'clave':clave,'nombre':nombre,'apellido':apellido,'perfil':perfil,'foto':foto.name};
                formUsu.append('usu', JSON.stringify(nuevo));
                formUsu.append('foto', foto);

                let ajax = $.ajax({
                    type: "POST",
                    url: "./backend/",
                    cache: false,
                    contentType: false,
                    processData : false,
                    data: formUsu,
                    dataType: "JSON"
                });
                ajax.done(function(response){
                    if(response.ok)
                    {    
                        window.location.href='./login.html';
                    }
                    else
                    {
                        $('#errorRegistro').html('No se pudo registrar');
                        $('#errorRegistro').show();
                    }
                });
            }
            else
            {
                $('#errorRegistro').html('No se pudo registrar 2');
                $('#errorRegistro').show();
            }
        });
    } 
}