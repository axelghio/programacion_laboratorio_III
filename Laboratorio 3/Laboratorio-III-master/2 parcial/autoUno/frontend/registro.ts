/// <reference path="../lib/jquery/index.d.ts" />

function Registrar(){
    let correo = $('#email2').val();
    let clave = $('#clave2').val();
    let form = new FormData();
    form.append('correo', correo as string);
    form.append('clave', clave as string);
    let flag = false;
    let ajaxFoto = $.ajax({
        type: "POST",
        url: "./backend/userValidation/",
        cache: false,
        contentType: false,
        processData : false,
        data: form,
        dataType: "JSON"
       });
       ajaxFoto.done(function(response){
           if(response.ok){
            flag = true;
        }
           else{
            $('#errorRegistro').html('Ya existe un usuario con ese correo');
            $('.alert').toggle();
           }
       });
    
       if(!flag){
           let formUsu = new FormData();
           let nombre = $('#nombre').val();
           let apellido = $('#apellido').val();
           let foto = $('#foto').prop('files')[0];
           let perfil = $('#perfil').val();
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
               if(response.ok){
                $("#myModal .close").click();

            }
               else{
                $('#errorRegistro').html('No se pudo registrar');
                $('.alert').toggle();
               }
           });
       }
}