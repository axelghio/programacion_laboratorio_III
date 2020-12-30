/// <reference path="../lib/jquery/index.d.ts" />

import { ajax } from "jquery";

function Validar()
{ 
    let correo = $('#mailLogin').val();
    let clave = $('#claveLogin').val();
    let flag = false;
    let form = new FormData();
    form.append('correo', correo as string);
    form.append('clave', clave as string);
    
    let ajaxLogin = $.ajax({
        type: "POST",
        url: "./backend/login/",
        cache: false,
        contentType: false,
        processData : false,
        data: form,
        dataType: "JSON"
    });
    ajaxLogin.done(function(response){
        if(response.ok)
        {
            localStorage.setItem('jwt', response.jwt);
            window.location.href = './principal.html';
        }
        else
        {
            $('#alertText').html('No se encontro el usuario');
            $('#alertLogin').show();
        }
    });   
    ajaxLogin.fail(function(){
        alert("error en ajax");
    });
}

function limpiarLogin()
{
    $('#mailLogin').val("");
    $('#claveLogin').val("");
    $('#alertLogin').hide();
}

function cerrarAlert()
{
    $('.alert').toggle();
}

function ModalRegistrar(){
    $('#myModal').toggle();
}