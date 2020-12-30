var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Entidades;
(function (Entidades) {
    var Persona = /** @class */ (function () {
        function Persona(nombre, apellido, edad) {
            this.nombre = nombre;
            this.edad = edad;
            this.apellido = apellido;
        }
        Persona.prototype.personaToString = function () {
            return "\"nombre\" : \"" + this.nombre + "\", \"apellido\" : \"" + this.apellido + "\", \"edad\" : \"" + this.edad + "\"";
        };
        return Persona;
    }());
    Entidades.Persona = Persona;
})(Entidades || (Entidades = {}));
///<reference path="Persona.ts"/>
var Entidades;
(function (Entidades) {
    var Ciudadano = /** @class */ (function (_super) {
        __extends(Ciudadano, _super);
        function Ciudadano(dni, pais, foto, nombre, apellido, edad) {
            var _this = _super.call(this, nombre, apellido, edad) || this;
            _this.dni = dni;
            _this.pais = pais;
            _this.foto = foto;
            return _this;
        }
        Ciudadano.prototype.personaToJSON = function () {
            var datos = "{\"dni\" : \"" + this.dni + "\", \"pais\" : \"" + this.pais + "\", \"foto\" : \"" + this.foto + "\", " + _super.prototype.personaToString.call(this) + "}";
            return JSON.parse(datos);
        };
        return Ciudadano;
    }(Entidades.Persona));
    Entidades.Ciudadano = Ciudadano;
})(Entidades || (Entidades = {}));
/// <reference path="node_modules/@types/jquery/index.d.ts" />
///<reference path="Ciudadano.ts"/>
var Entidades;
(function (Entidades) {
    var Manejadora = /** @class */ (function () {
        function Manejadora() {
        }
        Manejadora.AgregarCiudadano = function () {
            var nombre = document.getElementById("txtNombre").value;
            var edad = document.getElementById("txtEdad").value;
            var apellido = document.getElementById("txtApellido").value;
            var dni = document.getElementById("txtDni").value;
            var pais = document.getElementById("cboPais").value;
            var foto = document.getElementById("foto");
            var path = document.getElementById("foto").value;
            var pathModificado = (path.split('\\'))[2];
            var ciudadano = new Entidades.Ciudadano(parseInt(dni), pais, pathModificado, nombre, apellido, parseInt(edad));
            var accion = "";
            var form = new FormData();
            form.append("foto", foto.files[0]);
            form.append("obJSON", JSON.stringify(ciudadano.personaToJSON()));
            var valorStorage = localStorage.getItem("modificar");
            var valorBtn = $("#btnCargar").val();
            if (valorStorage != "true") {
                if (valorBtn == "Agregar") {
                    accion = "agregar";
                    form.append("accion", accion);
                    var ajax = $.ajax({
                        type: "POST",
                        url: "../BACKEND/nexo.php",
                        cache: false,
                        contentType: false,
                        processData: false,
                        data: form,
                        dataType: "text"
                    });
                    ajax.done(function (respuesta) {
                        console.log(respuesta);
                        if (respuesta == "1") {
                            alert("se ha guardado el ciudadano");
                        }
                        else {
                            alert("no se ha podido guardar el ciudadano");
                        }
                    });
                    ajax.fail(function () {
                        alert("error al entregar los datos");
                    });
                }
                else {
                    accion = "modificar";
                    form.append("accion", accion);
                    var ajax = $.ajax({
                        type: "POST",
                        url: "../BACKEND/nexo.php",
                        cache: false,
                        contentType: false,
                        processData: false,
                        data: form,
                        dataType: "text"
                    });
                    ajax.done(function (respuesta) {
                        if (respuesta == "1") {
                            alert("se ha modificado el ciudadano");
                            $("#btnCargar").val("Agregar");
                            Manejadora.MostrarCiudadanos();
                        }
                        else {
                            alert("no se ha podido modificar el ciudadano");
                        }
                    });
                }
            }
            else {
                localStorage.setItem("modificar", "false");
                $("#btnCargar").val("Modificar");
            }
        };
        Manejadora.MostrarCiudadanos = function () {
            var form = new FormData();
            form.append("accion", "mostrar");
            var ajax = $.ajax({
                type: "POST",
                url: "../BACKEND/nexo.php",
                cache: false,
                contentType: false,
                processData: false,
                dataType: "text",
                data: form
            });
            ajax.done(function (respuesta) {
                $("#divTabla").html(respuesta);
            });
        };
        Manejadora.EliminarCiudadano = function (json) {
            var form = new FormData();
            form.append("accion", "eliminar");
            form.append("obJSON", JSON.stringify(json));
            var ajax = $.ajax({
                type: "POST",
                url: "../BACKEND/nexo.php",
                cache: false,
                contentType: false,
                processData: false,
                dataType: "text",
                data: form
            });
            ajax.done(function (respuesta) {
                if (respuesta == "1") {
                    alert("Se ha eliminado de forma correcta");
                    Manejadora.MostrarCiudadanos();
                }
            });
        };
        Manejadora.ModificarCiudadano = function (json) {
            $("#txtNombre").val(json.nombre);
            $("#txtEdad").val(json.edad);
            $("#txtApellido").val(json.apellido);
            $("#txtDni").val(json.dni);
            $("#txtDni").prop("disabled", true);
            $("#cboPais").val(json.pais);
            localStorage.setItem("modificar", "true");
            Manejadora.AgregarCiudadano();
        };
        Manejadora.FiltrarPorPais = function () {
            var form = new FormData();
            var pais = $("#cboPais").val();
            form.append("accion", "filtrar");
            form.append("cboPais", pais);
            console.log(pais);
            var ajax = $.ajax({
                type: "POST",
                url: "../BACKEND/nexo.php",
                cache: false,
                contentType: false,
                processData: false,
                dataType: "text",
                data: form
            });
            ajax.done(function (respuesta) {
                $("#divTabla").html(respuesta);
            });
        };
        return Manejadora;
    }());
    Entidades.Manejadora = Manejadora;
})(Entidades || (Entidades = {}));
