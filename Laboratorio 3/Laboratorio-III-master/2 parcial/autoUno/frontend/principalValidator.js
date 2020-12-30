$(document).ready(function() {
    $('#modificarForm').bootstrapValidator({

        message: 'El valor no es válido',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            marca: {
                validators: {
                    notEmpty: {
                        message: "*Campo vacio!, por favor complete el campo marca",
                    },
                    stringLength:{
                        max : 30,
                        message : "Por favor, ingrese una marca de 30 caracteres como m&aacute;ximo"
                    }
                    
                    
                }
            },
            color: {
                validators: {
                    notEmpty: {
                       message : "*Campo vacio!, por favor complete el campo color",
                       
                       
                    },
                    stringLength: {
                        max: 15,
                        message: 'Por favor, ingrese un color de 15 caracteres como m&aacute;ximo'
                    }
                }
            },
            precio:{
                validators:{
                  numeric: {
                     message: "El precio de be ser un numero",
                     decimalSeparator: '.'
                    
                 },
                 lessThan: {
                    value: 600000,
                    inclusive: true,
                    message: 'El precio debe ser menor o igual a 600000'
                 },
                 greaterThan: {
                    value: 40000,
                    inclusive: false,
                    message: 'El precio debe ser mayor o igual a 40000'
                 }
              } 
            },
            modelo:{
                validators: {
                    notEmpty: {
                       message : "*Campo vacio!, por favor complete el campo modelo",
                       
                       
                    },
                    stringLength: {
                        max: 30,
                        message: 'Por favor, ingrese un color de 30 caracteres como m&aacute;ximo'
                    }
                } 
            }
            
        }
    
    });
});
