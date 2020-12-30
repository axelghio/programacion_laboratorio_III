/// <reference path="../lib/jquery/index.d.ts" />

function Registrar(){
    let nombre = $('#nombreText').val();
    let apellido = $('#apellidoText').val();
    let mail = $('#mailText').val();
    let legajo = $('#legajoText').val();
    let perfil = $('#perfilText').val();
    let foto = $("#fotoFile").prop('files')[0]
    let clave = $('#claveText').val();
    let existe = false;
    let lista = Array();
    lista =  JSON.parse(localStorage.getItem('usuarios') as string);
    for (let usu of lista) {
        if(usu.correo == mail){
            existe = true;
            $('#alertText').html('El correo ya esta registrado');
            $('.alert').toggle();
            break;
        }
    }

    if(!existe){
        let nuevo = {'correo':mail,'clave':clave,'nombre':nombre,'apellido':apellido,'legajo':legajo,'perfil':perfil,'foto':foto.name};
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
                    lista.push(nuevo);
                    localStorage.setItem("usuarios", JSON.stringify(lista));
               }
               else{

                    console.log("No se pudo registrar");
               }
           })
        window.location.href='./login.html';
    }
}