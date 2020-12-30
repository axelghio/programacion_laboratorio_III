$(document).ready(function(){
    $('#registroForm').bootstrapValidator({
        message:'El valor no es valido',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields:{
            nombre:{
                validators:{
                    stringLength:{
                        max:15,
                        message:'El nombre debe tener como maximo 15 caracteres'
                    },
                    notEmpty: {
                        message: 'La clave debe ser confirmada.'
                    },
                }
            },
            apellido:{
                validators:{
                    stringLength:{
                        max:10,
                        message:'El apellido debe tener como maximo 10 caracteres'
                    },
                    notEmpty: {
                        message: 'La clave debe ser confirmada.'
                    },
                }
            },
            mail:{
                validators:{
                    emailAddress:{
                        message:'No tiene el formato correcto'
                    },
                    notEmpty: {
                        message: 'La clave debe ser confirmada.'
                    },
                },
            },
            legajo:{
                validators:{
                    stringLength:{
                        min:3,
                        max:6,
                        message:'Debe contener entre 3 y 6 caracteres'
                    },
                    integer:{
                        message:'Debe ser un numero entero'
                    },
                    notEmpty: {
                        message: 'La clave debe ser confirmada.'
                    },
                }
            },
            foto:{
                validators:{
                    notEmpty: {
                        message: 'La clave debe ser confirmada.'
                    },
                    file: {
                        extension: 'jpeg,jpg,png',
                        type: 'image/jpeg,image/png,image/jpg',
                        message: 'El archivo seleccionado es invalido'
                    }
                }
            },
            clave:{
                validators:{
                    notEmpty: {
                        message: 'La clave debe ser confirmada.'
                    },
                    stringLength:{
                        min:4,
                        max:8,
                        message: 'Debe contener entre 4 y 8 caracteres'
                    },
                    identical: {
                        field: 'claveDuplicada',
                        message: 'La clave debe coincidir'
                    }
                }
            },
            claveDuplicada:{
                validators:{
                    notEmpty: {
                        message: 'La clave debe ser confirmada.'
                    },
                    stringLength:{
                        min:4,
                        max:8,
                        message: 'Debe contener entre 4 y 8 caracteres'
                    },
                    identical: {
                        field: 'clave',
                        message: 'La clave debe coincidir'
                    }
                }

            }
        }})
        $("#btnEnviar").off('click').click(function () {
            $('#registroForm').bootstrapValidator('revalidateField', 'nombre');
            $('#registroForm').bootstrapValidator('revalidateField', 'apellido');
            $('#registroForm').bootstrapValidator('revalidateField', 'mail');
            $('#registroForm').bootstrapValidator('revalidateField', 'legajo');
            $('#registroForm').bootstrapValidator('revalidateField', 'foto');
            $('#registroForm').bootstrapValidator('revalidateField', 'clave');
            $('#registroForm').bootstrapValidator('revalidateField', 'claveDuplicada');
        });
    })