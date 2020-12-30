/// <reference path="../lib/jquery/index.d.ts" />

$(document).ready(function(){

})

function Validar(){
    let correo = $('#email').val();
    let clave = $('#clave').val();
    let flag = false;
    let form = new FormData();
    form.append('correo', correo as string);
    form.append('clave', clave as string);

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
               localStorage.setItem('jwt', response.jwt);
                window.location.href = './principal.html';
            }
           else{
            $('#errorLogin').html('No se encuentra el usuario');
            $('.alert').toggle();
           }
        
       });

       
}
