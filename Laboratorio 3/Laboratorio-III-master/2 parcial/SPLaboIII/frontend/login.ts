/// <reference path="../lib/jquery/index.d.ts" />

function Validar(){
    let correo = $('#mailText').val();
    let clave = $('#claveText').val();
    let flag = false;
    let form = new FormData();
    form.append('correo', correo as string);
    form.append('clave', clave as string);

    let ajaxFoto = $.ajax({
        type: "POST",
        url: "./backend/login/",
        cache: false,
        contentType: false,
        processData : false,
        data: form,
        dataType: "JSON"
       });
       ajaxFoto.done(function(response){
           if(response.ok){
            localStorage.setItem('jwt', response.jwt);
                window.location.href = './principal.html';
            }
           else{
               $('#alertText').html('No se encontro el usuario');
            $('.alert').toggle();
           }
        
       });    
}

function ModalRegistrar(){
    $('#myModal').toggle();
}
