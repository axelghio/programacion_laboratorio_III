$(document).ready(function(){
    $("#loginForm").bootstrapValidator({
        message: 'El valor no es válido',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields:{
            mail:{
                validators:{
                    notEmpty:{
                        message:'El email es requerido'
                    },
                    emailAddress:{
                        message:'El formato no es valido'
                    }
                }
            },
            clave:{
                validators:{
                    notEmpty:{
                        message:'La clave es requerida'
                    },
                    stringLength:{
                        min:4,
                        max:8,
                        message:'La clave debe contener entre 4 y 8 caracteres'
                    }
                }
            }
        }
    })
});

$("#btnEnviar").click(function () {
    $('#loginForm').bootstrapValidator('revalidateField', 'mail');
    $('#loginForm').bootstrapValidator('revalidateField', 'clave');
});