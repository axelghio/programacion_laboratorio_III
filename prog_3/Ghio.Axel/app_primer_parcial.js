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
    var Ropa = /** @class */ (function () {
        function Ropa(codigo, nombre, precio) {
            this.codigo = codigo;
            this.nombre = nombre;
            this.precio = precio;
        }
        Ropa.prototype.ropaToString = function () {
            return "\"nombre\":\"" + this.nombre + "\",\"precio\":" + this.precio + ",\"codigo\":" + this.codigo;
        };
        return Ropa;
    }());
    Entidades.Ropa = Ropa;
})(Entidades || (Entidades = {}));
///<reference path="ropa.ts"/>
var Entidades;
(function (Entidades) {
    var Campera = /** @class */ (function (_super) {
        __extends(Campera, _super);
        function Campera(codigo, nombre, precio, talle, color) {
            var _this = _super.call(this, codigo, nombre, precio) || this;
            _this.talle = talle;
            _this.color = color;
            return _this;
        }
        Campera.prototype.camperaToJSON = function () {
            var json = "{\"talle\":\"" + this.talle + "\",\"color\":\"" + this.color + "\", " + _super.prototype.ropaToString.call(this) + "}";
            return JSON.parse(json);
        };
        return Campera;
    }(Entidades.Ropa));
    Entidades.Campera = Campera;
})(Entidades || (Entidades = {}));
///<reference path="campera.ts"/>
var Test;
(function (Test) {
    var Manejadora = /** @class */ (function () {
        function Manejadora() {
        }
        Manejadora.AgregarCampera = function () {
            var codigo = $("#txtCodigo").val();
            var nombre = $("#txtNombre").val();
            var precio = $("#txtPrecio").val();
            var talle = $("#txtTalle").val();
            var color = $("#cboColores").val();
            var campera = new Entidades.Campera(codigo, nombre, precio, talle, color);
            var form = new FormData();
            var flag = false;
            form.append("cadenaJson", JSON.stringify(campera.camperaToJSON()));
            var auxMod = $("#hdnIdModificacion").val();
            if (codigo == auxMod) {
                console.log("codigo = codigo");
                form.append("caso", "modificar");
                flag = true;
            }
            else {
                $("#hdnIdModificacion").val("");
                form.append("caso", "agregar");
            }
            var ajax = $.ajax({
                type: "POST",
                url: "./BACKEND/administrar.php",
                cache: false,
                contentType: false,
                processData: false,
                data: form,
                dataType: "JSON"
            });
            ajax.done(function (response) {
                if (flag) {
                    if (response.TodoOK) {
                        alert("Se modifico la campera");
                        $("#btnAgregar").val("Agregar");
                        Manejadora.MostrarCamperas();
                        $("#txtCodigo").prop("disabled", false);
                    }
                    else {
                        alert("No se modifico la campera");
                        console.log("No se modifico la campera");
                        $("#btnAgregar").val("Agregar");
                        $("#txtCodigo").prop("disabled", false);
                    }
                }
                else {
                    if (response.TodoOK) {
                        alert("Se agrego la campera");
                    }
                    else {
                        alert("No se agrego la campera");
                    }
                }
            });
            Manejadora.LimpiarForm();
        };
        Manejadora.MostrarCamperas = function () {
            var form = new FormData();
            form.append("caso", "mostrar");
            var ajax = $.ajax({
                type: "POST",
                url: "./BACKEND/administrar.php",
                cache: false,
                contentType: false,
                processData: false,
                data: form,
                dataType: "JSON"
            });
            ajax.done(function (response) {
                var tabla = "";
                tabla += "<table border=1>";
                tabla += "<thead>";
                tabla += "<tr>";
                tabla += "<td>Codigo</td>";
                tabla += "<td>Nombre</td>";
                tabla += "<td>Precio</td>";
                tabla += "<td>Talle</td>";
                tabla += "<td>Color</td>";
                tabla += "<td>Foto</td>";
                tabla += "</tr>";
                tabla += "</thead>";
                var lista = response;
                lista.forEach(function (campera) {
                    tabla += "<tr>";
                    tabla += "<td>";
                    tabla += campera.codigo;
                    tabla += "</td>";
                    tabla += "<td>";
                    tabla += campera.nombre;
                    tabla += "</td>";
                    tabla += "<td>";
                    tabla += campera.precio;
                    tabla += "</td>";
                    tabla += "<td>";
                    tabla += campera.talle;
                    tabla += "</td>";
                    tabla += "<td>";
                    tabla += campera.color;
                    tabla += "</td>";
                    tabla += "<td>";
                    tabla += "<input type='button' value='Modificar' class=\"btn btn-info\" onclick='Test.Manejadora.ModificarCampera(" + JSON.stringify(campera) + ")' /></br>";
                    tabla += "<input type='button' value='Eliminar' class=\"btn btn-info\" onclick='Test.Manejadora.EliminarCampera(" + JSON.stringify(campera) + ")' />";
                    tabla += "</td>";
                    tabla += "</tr>";
                });
                tabla += "</table>";
                $("#divTabla").html(tabla);
            });
        };
        Manejadora.EliminarCampera = function (campera) {
            if (confirm("\u00BFEliminar campera " + campera.codigo + ", " + campera.talle + "?")) {
                var form = new FormData();
                form.append("cadenaJson", JSON.stringify(campera));
                form.append("caso", "eliminar");
                var ajax = $.ajax({
                    type: "POST",
                    url: "./BACKEND/administrar.php",
                    cache: false,
                    contentType: false,
                    processData: false,
                    data: form,
                    dataType: "JSON"
                });
                ajax.done(function (response) {
                    if (response.TodoOK) {
                        alert("Se pudo eliminar");
                        Manejadora.MostrarCamperas();
                    }
                    else {
                        alert("No se pudo eliminar");
                    }
                });
            }
        };
        Manejadora.ModificarCampera = function (campera) {
            $("#btnAgregar").val("Modificar");
            $("#txtCodigo").val(campera.codigo);
            $("#txtCodigo").prop("disabled", true);
            $("#txtNombre").val(campera.nombre);
            $("#txtPrecio").val(campera.precio);
            $("#txtTalle").val(campera.talle);
            $("#cboColores").val(campera.color);
            $("#hdnIdModificacion").val(campera.codigo);
        };
        Manejadora.FiltrarCamperasPorColor = function () {
            var color = $("#cboColores").val();
            var form = new FormData();
            form.append("caso", "mostrar");
            var ajax = $.ajax({
                type: "POST",
                url: "./BACKEND/administrar.php",
                cache: false,
                contentType: false,
                processData: false,
                data: form,
                dataType: "JSON"
            });
            ajax.done(function (response) {
                var tabla = "";
                tabla += "<table border=1>";
                tabla += "<thead>";
                tabla += "<tr>";
                tabla += "<td>Codigo</td>";
                tabla += "<td>Nombre</td>";
                tabla += "<td>Precio</td>";
                tabla += "<td>Talle</td>";
                tabla += "<td>Color</td>";
                tabla += "<td>Foto</td>";
                tabla += "</tr>";
                tabla += "</thead>";
                for (var _i = 0, response_1 = response; _i < response_1.length; _i++) {
                    var campera = response_1[_i];
                    if (campera.color === color) {
                        tabla += "<tr>";
                        tabla += "<td>";
                        tabla += campera.codigo;
                        tabla += "</td>";
                        tabla += "<td>";
                        tabla += campera.nombre;
                        tabla += "</td>";
                        tabla += "<td>";
                        tabla += campera.precio;
                        tabla += "</td>";
                        tabla += "<td>";
                        tabla += campera.talle;
                        tabla += "</td>";
                        tabla += "<td>";
                        tabla += campera.color;
                        tabla += "</td>";
                        tabla += "<td><input type='button' value='Modificar' class=\"btn btn-info\" onclick='Test.Manejadora.ModificarCampera(" + JSON.stringify(campera) + ")' /></br>";
                        tabla += "<input type='button' value='Eliminar' class=\"btn btn-info\" onclick='Test.Manejadora.EliminarCampera(" + JSON.stringify(campera) + ")' /></td>";
                        tabla += "</tr>";
                    }
                }
                tabla += "</table>";
                $("#divTabla").html(tabla);
            });
            Manejadora.LimpiarForm();
        };
        Manejadora.CargarColoresJSON = function () {
            var form = new FormData();
            form.append("caso", "colores");
            var ajax = $.ajax({
                type: "POST",
                url: "./BACKEND/administrar.php",
                cache: false,
                contentType: false,
                processData: false,
                data: form,
                dataType: "JSON"
            });
            ajax.done(function (response) {
                for (var _i = 0, response_2 = response; _i < response_2.length; _i++) {
                    var i = response_2[_i];
                    $("#cboColores").append("<option>" + i.descripcion + "</option>}");
                }
            });
        };
        Manejadora.LimpiarForm = function () {
            $("#txtCodigo").val("");
            $("#txtNombre").val("");
            $("#txtPrecio").val("");
            $("#txtTalle").val("");
            $("#cboColores").val("Azul");
        };
        Manejadora.AdministrarValidaciones = function () {
            var codigo = $("#txtCodigo").val();
            var nombre = $("#txtNombre").val();
            var precio = $("#txtPrecio").val();
            var talle = $("#txtTalle").val();
            var color = $("#cboColores").val();
            if (!this.ValidarCamposVacios(codigo)) {
                console.log("codigo campo vacio");
            }
            if (!this.ValidarCamposVacios(nombre)) {
                console.log("nombre campo vacio");
            }
            if (!this.ValidarCamposVacios(precio)) {
                console.log(" precio campo vacio");
            }
            if (!this.ValidarCamposVacios(talle)) {
                console.log("talle campo vacio");
            }
            if (!this.ValidarCamposVacios(color)) {
                console.log("color campo vacio");
            }
        };
        Manejadora.ValidarCamposVacios = function (campo) {
            var retorno = false;
            if (campo.length > 0) {
                if (campo != null) {
                    retorno = true;
                }
            }
            return retorno;
        };
        Manejadora.ValidarTalles = function (talle, talles) {
            var retorno = false;
            for (var _i = 0, talles_1 = talles; _i < talles_1.length; _i++) {
                var aux = talles_1[_i];
                if (aux == talle) {
                    retorno = true;
                }
            }
            return retorno;
        };
        Manejadora.ValidarCodigo = function (codigo) {
            var retorno = false;
            if (codigo >= 523 && codigo < 1000) {
                retorno = true;
            }
            return retorno;
        };
        return Manejadora;
    }());
    Test.Manejadora = Manejadora;
})(Test || (Test = {}));
