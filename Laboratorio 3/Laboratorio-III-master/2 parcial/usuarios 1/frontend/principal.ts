/// <reference path="../lib/jquery/index.d.ts" />

$(document).ready(function(){
    $('#listadoDiv').html(GenerarTabla());
    CambiarAspecto();
});

function GenerarTabla():string{
    let listado = JSON.parse(localStorage.getItem('usuarios') as string);
    let login = JSON.parse(sessionStorage.getItem('login') as string);
    let tabla = "<table id='tableUsers' class='table table-bordered table-hover'><thead><tr class='info'><td>Correo</td><td>Nombre</td><td>Apellido</td><td>Perfil</td><td>Legajo</td><td>Foto</td></tr></thead><tbody>";
    for (let usu of listado) {
        tabla+=`<tr><td>${usu.correo}</td><td>${usu.nombre}</td><td>${usu.apellido}</td><td>${usu.perfil}</td><td>${usu.legajo}</td>`
        tabla+=`<td><img class='fotoUser' src='./backend/fotos/${usu.foto}' height=50px width=50px></td>`;
        if(login.perfil == 'admin'){
            tabla+= `<td><button type='button' id='btnBorrar' class='btn-danger' onclick='Borrar("`+usu.correo+`")' data-toggle="modal" data-target="#confirmarEliminar">Borrar</button></td></tr>`;
        }
        else if(login.perfil == 'invitado'){
            $('#controles').prop('hidden', false);
        }
        else if(login.perfil == 'superadmin'){
            tabla+= `<td><button type='button' id='btnBorrar' class='btn-danger' onclick='Borrar("`+usu.correo+`")' data-toggle="modal" data-target="#confirmarEliminar">Borrar</button></br>`;
            tabla+= `<button type='button' id='btnModif' class='btn-warning' onclick='Modificar("`+usu.correo+`")'  data-toggle="modal" data-target="#modificacion">Modificar</button></td></tr>`;
           
        }
    }
    tabla+="</tbody></table>";

    return tabla;
}

function Borrar(correo:string){
    $('#confirmarTexto').html(`¿Desea eliminar a ${correo}?`);
    $('#modal-btn-si').click(function(){
        let nuevo = new Array();
        let listado = JSON.parse(localStorage.getItem('usuarios') as string);
        for (let usu of listado) {
            if(usu.correo != correo){
                nuevo.push(usu);
            }
        }
        localStorage.setItem('usuarios', JSON.stringify(nuevo));
        $('#listadoDiv').html(GenerarTabla());
    })
}

function Imagenes(){
    let fondo = $('#colorFondo').val();
    let fuente = $('#colorFuente').val();
    let marco = $('#marcoImagen').val();
    let usuario = JSON.parse(sessionStorage.getItem('login') as string);
    $('.fotoUser').removeClass(`img-`);
    $('.fotoUser').removeClass(`img-rounded`);
    $('.fotoUser').removeClass(`img-thumbnail`);
    $('.fotoUser').removeClass(`img-circle`);

    localStorage.setItem(`tablaConfig.${usuario.correo}`, `{"fondo":"${fondo}","fuente":"${fuente}","marco":"${marco}"}`);
    CambiarAspecto();
}

function CambiarAspecto(){
    let usuario = JSON.parse(sessionStorage.getItem('login') as string);

    if(localStorage.getItem(`tablaConfig.${usuario.correo}`) != null){
        let config = JSON.parse(localStorage.getItem(`tablaConfig.${usuario.correo}`) as string);
        $('#tableUsers').css({ 'background-color': config.fondo, 'color': config.fuente});

        $('#colorFondo').val(config.fondo);
        $('#colorFuente').val(config.fuente);
        $('#marcoImagen').val(config.marco);

        $('.fotoUser').addClass(`img-${config.marco}`)
    }
}

function Modificar(correo:string){
    $('#btnEnviar').click(function(){
        let nombre = $('#nombreText').val();
        let apellido = $('#apellidoText').val();
        let legajo = $('#legajoText').val();
        let perfil = $('#perfilText').val();
        let foto = $("#fotoFile").prop('files')[0]
        let clave = $('#claveText').val();
        let lista = Array();
        lista =  JSON.parse(localStorage.getItem('usuarios') as string);
        let nuevaLista = Array();
        for (let usu of lista) {
            if(usu.correo != correo){
                nuevaLista.push(usu);
            }
        }

        let nuevo = {'correo':correo,'clave':clave,'nombre':nombre,'apellido':apellido,'legajo':legajo,'perfil':perfil,'foto':foto.name};
        let formFoto = new FormData();
        formFoto.append('foto', foto);
        let ajaxFoto = $.ajax({
            type: "POST",
            url: "./backend/guardarImagen.php",
            cache: false,
            contentType: false,
            processData : false,
            data: formFoto,
            dataType: "JSON"
           })

           ajaxFoto.done(function(response){
               if(response.ok){
                    nuevaLista.push(nuevo);
                    localStorage.setItem("usuarios", JSON.stringify(nuevaLista));
                    window.location.href = './principal.html';
               }
               else{

                    console.log("No se pudo registrar");
               }
           })
    });
}