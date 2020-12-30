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
            return "\"nombre\":\"" + this.nombre + "\",\"precio\":\"" + this.precio + "\",\"codigo\":\"" + this.codigo + "\"";
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
        function Campera(codigo, nombre, precio, talle, color, path) {
            var _this = _super.call(this, codigo, nombre, precio) || this;
            _this.talle = talle;
            _this.color = color;
            _this.foto = path;
            return _this;
        }
        Campera.prototype.camperaToJSON = function () {
            var json = "{\"talle\":\"" + this.talle + "\",\"color\":\"" + this.color + "\", \"path\":\"" + this.foto + "\"," + _super.prototype.ropaToString.call(this) + "}";
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
            //#region Obtener datos
            var codigo = $("#txtCodigo").val();
            var nombre = $("#txtNombre").val();
            var precio = $("#txtPrecio").val();
            var talle = $("#txtTalle").val();
            var color = $("#cboColor").val();
            var foto = document.getElementById("idFoto");
            var path = document.getElementById("idFoto").value;
            var pathFoto = (path.split('\\'))[2];
            //#endregion
            var campera = new Entidades.Campera(codigo, nombre, precio, talle, color, pathFoto);
            var form = new FormData();
            form.append("cadenaJson", JSON.stringify(campera.camperaToJSON()));
            if (localStorage.getItem("modificar") == "true") {
                form.append("caso", "modificar");
            }
            else {
                form.append("caso", "agregar");
            }
            //#region Subir Foto
            var formFoto = new FormData();
            formFoto.append("codigo", pathFoto);
            formFoto.append("caso", "subirFoto");
            formFoto.append("foto", foto.files[0]);
            var ajaxFoto = $.ajax({
                type: "POST",
                url: "./BACKEND/administrar.php",
                cache: false,
                contentType: false,
                processData: false,
                data: formFoto,
                dataType: "JSON"
            });
            ajaxFoto.done(function (response) {
                if (response.Ok) {
                    alert("Se guardo la foto");
                }
                else {
                    alert("No se pudo guardar la foto");
                }
            });
            //#endregion
            //#region ajax agregar
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
                if (localStorage.getItem("modificar") == "true") {
                    if (response.TodoOK) {
                        alert("Se modifico la campera");
                        $("#btnAgregar").val("Agregar");
                        Manejadora.MostrarCamperas();
                        $("#txtCodigo").prop("disabled", false);
                        localStorage.setItem("modificar", "false");
                    }
                    else {
                        alert("No se modifico la campera");
                        console.log("No se modifico la campera");
                        $("#btnAgregar").val("Agregar");
                        $("#txtCodigo").prop("disabled", false);
                        localStorage.setItem("modificar", "false");
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
            //#endregion
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
                    var path = campera.path;
                    tabla += "<img src='./BACKEND/fotos/" + path + "' width=70>";
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
            if (confirm("\u00BFDesea eliminar " + campera.codigo + ", " + campera.talle + "?")) {
                var form = new FormData();
                form.append("cadenaJson", JSON.stringify(campera));
                form.append("caso", "eliminar");
                var formFoto = new FormData();
                formFoto.append("caso", "eliminarFoto");
                formFoto.append("codigo", campera.path);
                var ajaxFoto = $.ajax({
                    type: "POST",
                    url: "./BACKEND/administrar.php",
                    cache: false,
                    contentType: false,
                    processData: false,
                    data: formFoto,
                    dataType: "JSON"
                });
                ajaxFoto.done(function (resp) {
                    if (resp.Ok) {
                        alert("Se movio la foto");
                    }
                    else {
                        alert("No se movio la foto");
                    }
                });
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
            $("#cboColor").val(campera.color);
            //$("#foto").val(campera.pathFoto);
            //$("#imgFoto").attr("src", `./BACKEND/fotos/${campera.pathFoto}`);
            var path = $("#foto").val();
            console.log(path);
            if (path == null) {
                var form = new FormData();
                form.append("caso", "modificarFoto");
                form.append("codigo", campera.path);
                var ajaxFoto = $.ajax({
                    type: "POST",
                    url: "./BACKEND/administrar.php",
                    cache: false,
                    contentType: false,
                    processData: false,
                    data: form,
                    dataType: "JSON"
                });
                ajaxFoto.done(function (response) {
                    if (response.Ok) {
                        alert("Se movio la foto");
                    }
                    else {
                        alert("No se pudo mover la foto");
                    }
                });
            }
            localStorage.setItem("modificar", "true");
        };
        Manejadora.FiltrarCamperasPorColor = function () {
            var color = $("#cboColor").val();
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
                        tabla += "<td>";
                        var img = new Image();
                        var path = campera.foto;
                        img.src = "./BACKEND/fotos/" + path;
                        tabla += "<img src='./BACKEND/fotos/" + campera.foto + "' height=60 width=60 ></img>";
                        tabla += "</td>";
                        tabla += "<td>";
                        tabla += "<input type='button' value='Modificar' class=\"btn btn-info\" onclick='Test.Manejadora.ModificarCampera(" + JSON.stringify(campera) + ")' /></br>";
                        tabla += "<input type='button' value='Eliminar' class=\"btn btn-info\" onclick='Test.Manejadora.EliminarCampera(" + JSON.stringify(campera) + ")' />";
                        tabla += "</td>";
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
                    $("#cboColor").append("<option>" + i.descripcion + "</option>}");
                }
            });
        };
        Manejadora.LimpiarForm = function () {
            $("#txtCodigo").val("");
            $("#txtNombre").val("");
            $("#txtPrecio").val("");
            $("#txtTalle").val("");
            $("#cboColor").val("Azul");
        };
        return Manejadora;
    }());
    Test.Manejadora = Manejadora;
})(Test || (Test = {}));
