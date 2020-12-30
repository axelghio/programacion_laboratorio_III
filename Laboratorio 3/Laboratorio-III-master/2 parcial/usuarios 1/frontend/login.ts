/// <reference path="../lib/jquery/index.d.ts" />

$(document).ready(function(){
    if (localStorage.getItem('usuarios') == null) {
        let arrUsuarios = [{
            "correo": "alviggi1@gmail.com",
            "clave": "1234",
            "nombre": "Augusto",
            "apellido": "Alviggi",
            "legajo": "001",
            "perfil": "invitado",
            "foto": "001.jpg"
        },
        {
            "correo": "fatori2@gmail.com",
            "clave": "4567",
            "nombre": "Nicolas",
            "apellido": "Fatori",
            "legajo": "002",
            "perfil": "admin",
            "foto": "002.jpg"
        },
        {
            "correo": "segado3@gmail.com",
            "clave": "78910",
            "nombre": "Emilio",
            "apellido": "Segado",
            "legajo": "003",
            "perfil": "superadmin",
            "foto": "003.jpg"
        },
        {
            "correo": "user4@gmail.com",
            "clave": "14710",
            "nombre": "User",
            "apellido": "Cuatro",
            "legajo": "004",
            "perfil": "invitado",
            "foto": "004.jpg"
        },
        {
            "correo": "user5@gmail.com",
            "clave": "36912",
            "nombre": "User",
            "apellido": "Cinco",
            "legajo": "005",
            "perfil": "admin",
            "foto": "005.png"
        }];

        localStorage.setItem('usuarios', JSON.stringify(arrUsuarios));
    }
    else {
        console.log("Los usuarios están cargados");
    }

    console.log(JSON.parse(<string>localStorage.getItem('usuarios')));
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


