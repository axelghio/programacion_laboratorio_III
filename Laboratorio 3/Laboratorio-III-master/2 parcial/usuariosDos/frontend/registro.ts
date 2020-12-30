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
        let formUsu = new FormData();
        formUsu.append('foto', foto);
        formUsu.append('usu', JSON.stringify(nuevo));

        let ajaxFoto = $.ajax({
            type: "POST",
            url: "./backend/",
            cache: false,
            contentType: false,
            processData : false,
            data: formUsu,
            dataType: "JSON"
           })

           ajaxFoto.done(function(response){
               if(response.ok){
                   alert('asd');
                    lista.push(nuevo);
                    localStorage.setItem("usuarios", JSON.stringify(lista));
                    window.location.href='./login.html';
               }
               else{

                    console.log("No se pudo registrar");
               }
           })
        
    }
}