/// <reference path="../lib/jquery/index.d.ts" />

$(document).ready(function(){
    let jwt = localStorage.getItem('jwt');
    let ajax = $.ajax({
        type: "GET",
        url: "./backend/jwt/",
        cache: false,
        contentType: false,
        processData : false,
        headers: {'token':jwt},
        dataType: "JSON"
       });
       ajax.done(function(response){
           if(response.ok){
            GenerarTablaUsuarios(response.perfil);
            GenerarTablaAutos(response.perfil);
            }
            else{
                window.location.href = './login.html';
            }
       });
     
})

function GenerarTablaUsuarios(perfil?:string){
    let ajax = $.ajax({
        type: "GET",
        url: "./backend/userTable/",
        cache: false,
        contentType: false,
        processData : false,
        headers:{'perfil':perfil},
        dataType: "JSON"
       });
       ajax.done(function(response){
           if(response.ok){
               $('#miDiv').html(response.tabla);
            }
           else{
                console.log("No se pudo generar el listado");
           }
       });
}
function GenerarTablaAutos(perfil?:string){
    let ajax = $.ajax({
        type: "GET",
        url: "./backend/carTable/",
        cache: false,
        contentType: false,
        processData : false,
        headers:{'perfil':perfil},
        dataType: "JSON"
       });
       ajax.done(function(response){
           if(response.ok){
               $('#miDiv2').html(response.tabla);
            }
           else{
                console.log("No se pudo generar el listado");
           }
       });
}

function Borrar(id:number){
   if(confirm('¿Desea eliminar al auto '+id+'?')){
    let ajax = $.ajax({
        type: "delete",
        url: "./backend/borrarAuto/",
        cache: false,
        contentType: false,
        processData : false,
        headers:{'id': id.toString()},
        dataType: "JSON"
       });
       ajax.done(function(response){
           if(response.ok){
              window.location.href = './principal.html';
            }
           else{
             $("#errorEliminacion").html('No se elimino');
             $('.alert').toggle();
           }
       });
    }
    else{
        $("#errorEliminacion").html('No se elimino');
        $('.alert').toggle();
    }
}