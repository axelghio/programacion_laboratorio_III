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
            if(response.ok)
            {
                GenerarTablaUsuarios(response.perfil);
                GenerarTablaAutos(response.perfil);
            }
            else
            {
                window.location.href = './login.html';
            }
       });
     
})

function GenerarTablaUsuarios(perfil?:string)
{
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
        if(response.ok)
        {
            $('#miDiv').html(response.tabla);
        }
        else
        {
            console.log("No se pudo generar el listado");
        }
    });
}

function GenerarTablaAutos(perfil?:string)
{
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
        if(response.ok)
        {
            $('#miDiv2').html(response.tabla);
        }
        else
        {
            console.log("No se pudo generar el listado");
        }
    });
}

function Borrar(id:number)
{
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
        if(response.ok)
        {
            if(confirm('¿Desea eliminar al auto '+id+'?'))
            {
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
                    if(response.ok)
                    {
                        window.location.href = './principal.html';
                    }
                    else
                    {
                        $("#errorEliminacion").html('No se elimino');
                        $('.alert').toggle();
                    }
                });
            }
            else
            {
                $("#errorEliminacion").html('No se elimino');
                $('.alert').toggle();
            }
        }
        else
        {
            window.location.href = './login.html';
        }
    });
}

function Modificar(id:number)
{
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
        if(response.ok)
        {
            $('#idAuto').val(id);
        }
        else
        {
            window.location.href = './login.html';
        }
    })
}

function modificarAuto()
{
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
        if(response.ok)
        {
            let id = $('#idAuto').val();
            let marca = $('#marca').val();
            let color = $('#color').val();
            let precio = $('#precio').val();
            let modelo = $('#modelo').val();
            alert(marca);
            
            let ajax = $.ajax({
                type: "put",
                url: "./backend/modificarAuto/",
                cache: false,
                contentType: false,
                processData : false,
                headers:{'id': id.toString(), 'marca': marca.toString(), 'color': color.toString(), 'precio': precio.toString(), 'modelo': modelo.toString()},
                dataType: "JSON"
            });
            ajax.done(function(response){
                if(response.ok)
                {
                    window.location.href = './principal.html';
                }
                else
                {
                    $("#errorEliminacion").html('No se elimino');
                    $('.alert').toggle();
                }
            });
        }
        else
        {
            window.location.href = './login.html';
        }})
}
//modificarAuto