/// <reference path="node_modules/@types/jquery/index.d.ts" />

function comprobar(){
    var http = new XMLHttpRequest();
    http.open("POST", "http://localhost/Clase_06/login/Ingresar/", true);
    http.setRequestHeader("content-type","application/x-www-form-urlencoded");
    let correo = (<HTMLInputElement>document.getElementById('correoTxt')).value;
    let clave = (<HTMLInputElement>document.getElementById("claveTxt")).value;
    let usu = {"id": correo,"clave": clave};
    http.send("usuario="+JSON.stringify(usu));
    var respuesta;
    http.onreadystatechange = () => {
        if (http.readyState == 4 && http.status == 200) {
            console.log(http.responseText);
            let response = JSON.parse(http.responseText);
            if(!response.existe){
                $("#divError").removeClass('entro');
                $("#divError").addClass('error');
                $("#divError").html('ERROR: El usuario no existe');
            }
            else{

                $("#divError").removeClass('error');
                $("#divError").addClass('entro');
                $("#divError").html('El usuario existe');

            }
            console.log(response);
        }
    }
}
function insertar(){
    var http = new XMLHttpRequest();
    http.open("POST", "http://localhost/Clase_06/login/Registrar/", true);
    http.setRequestHeader("enctype", "multipart/form-data");
    let form : FormData = new FormData();
    let nombre = (<HTMLInputElement>document.getElementById("nombreTxt")).value;
    let apellido = (<HTMLInputElement>document.getElementById("apellidoTxt")).value;
    let correo = (<HTMLInputElement>document.getElementById('correoTxt')).value;
    let clave = (<HTMLInputElement>document.getElementById("claveTxt")).value;
    let perfil = (<HTMLInputElement>document.getElementById("perfilTxt")).value;
    let foto : any = (<HTMLInputElement>document.getElementById("foto"));

    let usu = {"nombre":nombre,"apellido":apellido, "perfil":perfil,"correo": correo,"clave": clave};
    form.append('foto', foto.files[0]);
    form.append('usuario', JSON.stringify(usu));

    //http.send("usuario="+JSON.stringify(usu)+"&op=insertar");
    http.send(form);

    var respuesta;
    http.onreadystatechange = () => {
        if (http.readyState == 4 && http.status == 200) {
            respuesta = JSON.parse(http.responseText);
            console.log(respuesta);
            if(respuesta.exito){
                $("#divError").removeClass('error');
                $("#divError").addClass('entro');
                $("#divError").html('El usuario se registro');
            }
            else{
                $("#divError").removeClass('entro');
                $("#divError").addClass('error');
                $("#divError").html('ERROR: El usuario no se pudo registro');
            }
            console.log(respuesta);
        }
    }
}

