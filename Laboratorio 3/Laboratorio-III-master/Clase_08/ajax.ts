/// <reference path="node_modules/@types/jquery/index.d.ts" />
$(document).ready(function() {

    $('#loginForm').bootstrapValidator({

        message: 'El valor no es válido',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            correo: {
                validators: {
                    notEmpty: {
                        message: 'El correo es requerido!!!'
                    },
                    stringLength: {
                        min: 3,
                        message: 'El mínimo de caracteres admitido es de 3!!!'
                    }
                }
            },
            clave: {
                validators: {
                    notEmpty: {
                        message: 'La contraseña es requerida!!!'
                    },
                    stringLength: {
                        min: 6,
                        max: 20,
                        message: 'Por favor, ingrese entre 6 y 20 caracteres!!!'
                    }
                }
            }
        }
    });
    $('#loginForm').onSucces(){

        logueo();
    }
});
export class manejadora{
    
    public Loguear(){
        let correo = $('#correo').val();
        let clave = $('#clave').val();
        let json = JSON.stringify(`{'correo':'${correo}','clave':'${clave}'}`);
        let ajax = $.ajax({
    
            type: "POST",
            url: "./login/",
            cache: false,
            contentType: false,
            processData : false,
            data: json,
            dataType: "JSON"
    
        })
    
        ajax.done(function(response){
                if(response.exito){
                    alert("Se guardo la foto");
                }
                else{
                    alert("No se guardo la foto");
                }
            
        });
    }
}
