/// <reference path="../node_modules/@types/jquery/index.d.ts" />

function Usuario(){
    let jwt = localStorage.getItem('jwt');
    let ajax = $.ajax
    ({
        type: "GET",
        url: "./backend/jwt/",
        cache: false,
        contentType: false,
        processData : false,
        headers: {'token':jwt},
        dataType: "JSON"
    });
    ajax.done(function(response)
    {
        if(response.ok)
        {
            GenerarTablaUsuarios(response.perfil);
        }
        else
        {
            window.location.href = './login.html';
        }
    });
    ajax.fail(function(response)
    {
        console.log("Error en: ");
        console.log(response);
    });
}

function Barbijos(){
    let jwt = localStorage.getItem('jwt');
    let ajax = $.ajax
    ({
        type: "GET",
        url: "./backend/jwt/",
        cache: false,
        contentType: false,
        processData : false,
        headers: {'token':jwt},
        dataType: "JSON"
    });
    ajax.done(function(response)
    {
        if(response.ok)
        {
            GenerarTablaBarbijos(response.perfil);
        }
        else
        {
            window.location.href = './login.html';
        }
    });
    ajax.fail(function(response)
    {
        console.log("Error en: ");
        console.log(response);
    });
}

function GenerarTablaUsuarios(perfil?:string)
{
    let ajax = $.ajax
    ({
        type: "GET",
        url: "./backend/userTable/",
        cache: false,
        contentType: false,
        processData : false,
        headers:{'perfil':perfil},
        dataType: "JSON"
    });
    ajax.done(function(response)
    {
        if(response.ok)
        {
            $('#modificar-barbijos').hide("fast");
            let tabla =  
                "<table class='table table-hover' id='tablaUsuariosEsconder'><tr><th>Correo</th><th>Nombre</th><th>Apellido</th><th>Perfil</th><th>Foto</th></tr>";
                for (const user of response.usuarios) 
                {
                    tabla += "<tr><td>" +
                user.correo + "</td><td>" +
                user.nombre + "</td><td>" +
                user.apellido + "</td><td>" +
                user.perfil + "</td><td>" +
                "<img src='backend" + user.foto + "' class='float-left' title='imagen a la izquierda' width='50px' height='50px'></td>";
            }
            tabla += "</tr></table>";
            $('#TablaUsuario').html(tabla);
        }
        else
        {
            console.log("No se pudo generar el listado");
        }
    });
    ajax.fail(function(response)
    {
        console.log("Error en: ");
        console.log(response);
    });
}

function GenerarTablaBarbijos(perfil?:string)
{
    let ajax = $.ajax({
        type: "GET",
        url: "./backend/barbijos/",
        cache: false,
        contentType: false,
        processData : false,
        headers:{'perfil':perfil},
        dataType: "JSON"
    });
    ajax.done(function(response){
        if(response.ok)
        {
            $('#modificar-barbijos').hide("fast");
            $('#tablaSoloEmpleados').remove();
            $('#register-barbijos').hide("fast");
            let tabla =  
                "<table class='table table-hover' id='tablaBarbijosEsconder'><tr><th>Color</th><th>Tipo</th><th>Precio</th><th>Acciones</th></tr>";
            for (const barbijo of response.barbijos)
            {
                tabla += "<tr><td>" +
                barbijo.color + "</td><td>" +
                barbijo.tipo + "</td><td>" +
                barbijo.precio + "</td><td>" +
                "<button type='button' id='btnBorrar' class='btn-danger' onclick='Borrar("+ barbijo.id +")'>Borrar</button>" +
                "<button type='button' id='btnModificar' class='btn-warning' onclick='Modificar("+ barbijo.id +")' data-toggle='modal' data-target='#myModalModificar'>Modificar</button></td>";
            }
            tabla += "</tr></table>";
            $('#TablaBarbijos').html(tabla);
        }
        else
        {
            console.log("No se pudo generar el listado");
        }
    });
    ajax.fail(function(response)
    {
        console.log("Error en: ");
        console.log(response);
    });
}

//Funcion que elimina un barbijo segun su ID.
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
            if(confirm('eliminar al barbijo con ID: '+ id +'?'))
            {
                let ajax = $.ajax({
                    type: "delete",
                    url: "./backend/borrarBarbijo/",
                    cache: false,
                    contentType: false,
                    processData : false,
                    headers:{'id': id.toString()},
                    dataType: "JSON"
                });
                ajax.done(function(response){
                    if(response.ok)
                    {
                        Barbijos();
                    }
                    else
                    {
                        $("#errorEliminacion").html('No se elimino');
                        $('.alert').toggle();
                    }
                });
                ajax.fail(function(response)
                {
                    console.log("Error en: ");
                    console.log(response);
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

//Esta funcion nos habilita en la pantalla un form para realizar un alta.
function AltaBarbijo()
{
    let jwt = localStorage.getItem('jwt');
    let ajax = $.ajax
    ({
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
            $('#tablaBarbijosEsconder').remove();
            $('#register-barbijos').show("fast");
        }
        else
        {
            window.location.href = './login.html';
        }
    });
    ajax.fail(function(response)
    {
        console.log("Error en: ");
        console.log(response);
    });
}

//Esta funcion si esta todo correcto nos guarda en la base de datos el nuevo auto registrado.
function RegistrarBarbijo()
{
    let jwt = localStorage.getItem('jwt');
    let ajax = $.ajax
    ({
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
            let color;
            let tipo;
            let precio;
            color = $('#colorBarbijo').val();
            tipo = $('#tipoBarbijo').val();
            precio = $('#precioBarbijo').val();
            let ajax = $.ajax
            ({
                type: "PUT",
                url: "./backend/agregarBarbijo/",
                cache: false,
                contentType: false,
                processData: false,
                headers: {'color':color?.toString(), 'tipo':tipo?.toString(), 'precio':precio?.toString()},
                dataType: "JSON"
            })
            ajax.done(function(response)
            {
                if(response.ok)
                {
                    Barbijos();
                }
            });
            ajax.fail(function(response)
            {
                console.log("Error en: ");
                console.log(response);
            });
        }
        else
        {
            window.location.href = './login.html';
        }
    });
    ajax.fail(function(response)
    {
        console.log("Error en: ");
        console.log(response);
    });
}

function Modificar(id:number)
{
    let jwt = localStorage.getItem('jwt');
    let ajax = $.ajax
    ({
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
            let ajax = $.ajax({
                type: "GET",
                url: "./backend/traerUnBarbijo/",
                cache: false,
                contentType: false,
                processData : false,
                headers:{'id': id.toString()},
                dataType: "JSON"
            });
            ajax.done(function(response){
                if(response.ok)
                {
                    $('#tablaUsuariosEsconder').hide("fast");
                    let barbijo = response.miBarbijo;
                    
                    $('#modColorBarbijo').val(barbijo.color);
                    $('#modTipoBarbijo').val(barbijo.tipo);
                    $('#modPrecioBarbijo').val(barbijo.precio);

                    //$('#tablaBarbijosEsconder').remove();
                    $('#modificar-barbijos').show("fast");

                    $('#btnModCargar').click(function(){
                        GuardarBarbijo(barbijo.id);
                    });
                }
                else
                {
                    $("#errorEliminacion").html('No se encontro el Barbijo');
                    $('.alert').toggle();
                }
            });
            ajax.fail(function(response)
            {
                console.log("Error en: ");
                console.log(response);
            });
        }
        else
        {
            window.location.href = './login.html';
        }
    });
}

//Funcion que va a guardar el auto modificado
function GuardarBarbijo(myid:any)
{
    let id = myid;
    let color = $('#modColorBarbijo').val();
    let tipo = $('#modTipoBarbijo').val();
    let precio = $('#modPrecioBarbijo').val();
    let ajax = $.ajax({
        type: "PUT",
        url: "./backend/modificarBarbijo/",
        cache: false,
        contentType: false,
        processData: false,
        headers: {'id':id?.toString(), 'color':color?.toString(), 'tipo':tipo?.toString(), 'precio':precio?.toString()},
        dataType: "JSON"
    })
    ajax.done(function(response)
    {
        //console.log(response);
        if(response.ok)
        {
            Barbijos();
        }
    });
    ajax.fail(function(response)
    {
        console.log("Error en: ");
        console.log(response);
    });
}