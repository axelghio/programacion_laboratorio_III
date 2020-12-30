/// <reference path="../lib/jquery/index.d.ts" />

$(document).ready(function(){
    let ajaxFoto = $.ajax({
        type: "GET",
        url: "./backend/",
        cache: false,
        contentType: false,
        processData : false,
        dataType: "JSON"
       });
       ajaxFoto.done(function(response){
           if(response.ok){
                localStorage.setItem("usuarios", JSON.stringify(response.listado));
           }
           else{

                console.log("No se pudo cargar");
           }
       });

    console.log(JSON.parse(localStorage.getItem('usuarios') as string));
});

function Validar(){
    let lista = JSON.parse(localStorage.getItem('usuarios') as string) ;
    let correo = $('#mailText').val();
    let clave = $('#claveText').val();
    let flag = false;
    if(lista != null){
        for (let usu of lista) {
            if(usu.correo == correo && usu.clave == clave){
                flag = true;
                sessionStorage.setItem('login', JSON.stringify(usu));
                window.location.href = './principal.html';
            }
        }

        if(!flag){
            $('#alertText').html('No se encuentra el usuario');
            $('.alert').toggle();
        }
    }
}