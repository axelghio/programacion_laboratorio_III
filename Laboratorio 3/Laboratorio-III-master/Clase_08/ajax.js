"use strict";
exports.__esModule = true;
/// <reference path="node_modules/@types/jquery/index.d.ts" />
$(document).ready(function () {
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
    $('#loginForm').onSucces();
    {
        logueo();
    }
});
var manejadora = /** @class */ (function () {
    function manejadora() {
    }
    manejadora.prototype.Loguear = function () {
        var correo = $('#correo').val();
        var clave = $('#clave').val();
        var json = JSON.stringify("{'correo':'" + correo + "','clave':'" + clave + "'}");
        var ajax = $.ajax({
            type: "POST",
            url: "./login/",
            cache: false,
            contentType: false,
            processData: false,
            data: json,
            dataType: "JSON"
        });
        ajax.done(function (response) {
            if (response.exito) {
                alert("Se guardo la foto");
            }
            else {
                alert("No se guardo la foto");
            }
        });
    };
    return manejadora;
}());
exports.manejadora = manejadora;
