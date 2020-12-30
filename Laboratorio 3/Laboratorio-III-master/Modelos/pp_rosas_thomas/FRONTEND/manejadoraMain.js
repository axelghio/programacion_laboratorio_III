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
    var Producto = /** @class */ (function () {
        function Producto(marca, codigo, precio) {
            this.marca = marca;
            this.codigo = codigo;
            this.precio = precio;
        }
        Producto.prototype.ToString = function () {
            return "\"codigo\":" + this.codigo + ",\"marca\":\"" + this.marca + "\",\"precio\":\"" + this.precio + "\"";
        };
        return Producto;
    }());
    Entidades.Producto = Producto;
})(Entidades || (Entidades = {}));
///<reference path="producto.ts"/>
var Entidades;
(function (Entidades) {
    var Televisor = /** @class */ (function (_super) {
        __extends(Televisor, _super);
        function Televisor(codigo, marca, precio, tipo, paisOrigen, pathFoto) {
            var _this = _super.call(this, marca, codigo, precio) || this;
            _this.tipo = tipo;
            _this.paisOrigen = paisOrigen;
            _this.pathFoto = pathFoto;
            return _this;
        }
        Televisor.prototype.ToJSON = function () {
            var json = "{" + _super.prototype.ToString.call(this) + ",\"tipo\":\"" + this.tipo + "\",\"paisOrigen\":\"" + this.paisOrigen + "\",\"pathFoto\":\"" + this.pathFoto + "\"}";
            return JSON.parse(json);
        };
        return Televisor;
    }(Entidades.Producto));
    Entidades.Televisor = Televisor;
})(Entidades || (Entidades = {}));
///<reference path="televisor.ts"/>
var PrimerParcial;
(function (PrimerParcial) {
    var Manejadora = /** @class */ (function () {
        function Manejadora() {
        }
        Manejadora.AgregarTelevisor = function () {
            var codigo = $("#codigo").val();
            var marca = $("#marca").val();
            var precio = $("#precio").val();
            var tipo = $("#tipo").val();
            var paisOrigen = $("#pais").val();
            var foto = document.getElementById("foto");
            var path = document.getElementById("foto").value;
            var pathFoto = (path.split('\\'))[2];
            var tele = new Entidades.Televisor(codigo, marca, precio, tipo, paisOrigen, pathFoto);
            var form = new FormData();
            form.append("foto", foto.files[0]);
            form.append("cadenaJson", JSON.stringify(tele.ToJSON()));
            if (localStorage.getItem("modificar")) {
                form.append("caso", "modificar");
            }
            else {
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
            Manejadora.AdministrarSpinner(true);
            ajax.done(function (response) {
                if (localStorage.getItem("modificar")) {
                    if (response.TodoOK) {
                        Manejadora.AdministrarSpinner(false);
                        alert("Se modifico el alien");
                        $("#btn-agregar").val("Agregar");
                        Manejadora.GuardarEnLocalStorage();
                        Manejadora.MostrarTelevisores();
                        $("#codigo").prop("disabled", false);
                    }
                    else {
                        Manejadora.AdministrarSpinner(false);
                        alert("No se modifico el alien");
                        console.log("No se modifico el alien");
                        $("#btn-agregar").val("Agregar");
                        $("#codigo").prop("disabled", false);
                    }
                    localStorage.setItem("modificar", "false");
                }
                else {
                    if (response.TodoOK) {
                        Manejadora.AdministrarSpinner(false);
                        alert("Se agrego el televisor");
                        if (localStorage.getItem("refreshLocalStorage") == "true") {
                            Manejadora.GuardarEnLocalStorage();
                        }
                    }
                    else {
                        Manejadora.AdministrarSpinner(false);
                        alert("No se agrego el televisor");
                    }
                }
            });
            Manejadora.LimpiarForm();
        };
        Manejadora.MostrarTelevisores = function () {
            var form = new FormData();
            form.append("caso", "traer");
            var ajax = $.ajax({
                type: "POST",
                url: "./BACKEND/administrar.php",
                cache: false,
                contentType: false,
                processData: false,
                data: form,
                dataType: "JSON"
            });
            Manejadora.AdministrarSpinner(true);
            ajax.done(function (response) {
                var tabla = "";
                tabla += "<table border=1> <thead> <tr>";
                tabla += "<td>Codigo</td> <td>Marca</td> <td>Precio</td> <td>Tipo</td> <td>PaisOrigen</td> <td>Foto</td>";
                tabla += "</tr> </thead>";
                var lista = response;
                lista.forEach(function (tele) {
                    tabla += "<tr><td> " + tele.codigo + " </td>";
                    tabla += "<td> " + tele.marca + " </td>";
                    tabla += "<td> " + tele.precio + " </td>";
                    tabla += "<td> " + tele.tipo + " </td>";
                    tabla += "<td> " + tele.paisOrigen + " </td>";
                    tabla += "<td>";
                    var path = tele.pathFoto;
                    tabla += "<img src='./BACKEND/fotos/" + tele.pathFoto + "' height=60 width=60>";
                    tabla += "</td>";
                    tabla += "<td>";
                    tabla += "<input type='button' value='Modificar' class=\"btn btn-info\" onclick='PrimerParcial.Manejadora.ModificarTelevisor(" + JSON.stringify(tele) + ")'></br>";
                    tabla += "<input type='button' value='Eliminar' class=\"btn btn-warning\" onclick='PrimerParcial.Manejadora.EliminarTelevisor(" + JSON.stringify(tele) + ")'>";
                    tabla += "</td></tr>";
                });
                tabla += "</table>";
                Manejadora.AdministrarSpinner(false);
                $("#divTabla").html(tabla);
            });
        };
        Manejadora.GuardarEnLocalStorage = function () {
            var form = new FormData();
            form.append("caso", "traer");
            var ajax = $.ajax({
                type: "POST",
                url: "./BACKEND/administrar.php",
                cache: false,
                contentType: false,
                processData: false,
                data: form,
                dataType: "JSON"
            });
            Manejadora.AdministrarSpinner(true);
            ajax.done(function (response) {
                Manejadora.AdministrarSpinner(false);
                localStorage.setItem("televisores_local_storage", JSON.stringify(response));
            });
        };
        Manejadora.VerificarExistencia = function () {
            var codigo = $("#codigo").val();
            var listado = JSON.parse(localStorage.getItem("televisores_local_storage"));
            var flag = false;
            for (var _i = 0, listado_1 = listado; _i < listado_1.length; _i++) {
                var tele = listado_1[_i];
                if (tele.codigo == codigo) {
                    flag = true;
                    alert("El televisor ya existe");
                    console.log("El televisor ya existe");
                    break;
                }
            }
            if (!flag) {
                localStorage.setItem("refreshLocalStorage", "true");
                Manejadora.AgregarTelevisor();
            }
        };
        Manejadora.EliminarTelevisor = function (tele) {
            if (confirm("\u00BFDesea eliminar " + tele.codigo + ", " + tele.tipo + "?")) {
                var form = new FormData();
                form.append("cadenaJson", JSON.stringify(tele));
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
                Manejadora.AdministrarSpinner(true);
                ajax.done(function (response) {
                    if (response.TodoOK) {
                        Manejadora.AdministrarSpinner(false);
                        alert("Se pudo eliminar");
                        Manejadora.GuardarEnLocalStorage();
                        Manejadora.MostrarTelevisores();
                    }
                    else {
                        alert("No se pudo eliminar");
                    }
                });
            }
        };
        Manejadora.ModificarTelevisor = function (tele) {
            $("#btn-agregar").val("Modificar");
            $("#codigo").val(tele.codigo);
            $("#codigo").prop("disabled", true);
            $("#marca").val(tele.marca);
            $("#precio").val(tele.precio);
            $("#tipo").val(tele.tipo);
            $("#pais").val(tele.paisOrigen);
            $("#CboPlaneta").val(tele.planetaOrigen);
            //$("#foto").val(alien.pathFoto);
            $("#imgFoto").attr("src", "./BACKEND/fotos/" + tele.pathFoto);
            localStorage.setItem("modificar", "true");
        };
        Manejadora.FiltrarTelevisoresPorPais = function () {
            var pais = $("#pais").val();
            var form = new FormData();
            form.append("caso", "traer");
            var ajax = $.ajax({
                type: "POST",
                url: "./BACKEND/administrar.php",
                cache: false,
                contentType: false,
                processData: false,
                data: form,
                dataType: "JSON"
            });
            Manejadora.AdministrarSpinner(true);
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
                    var tele = response_1[_i];
                    if (tele.paisOrigen === pais) {
                        tabla += "<tr>";
                        tabla += "<td>";
                        tabla += tele.codigo;
                        tabla += "</td>";
                        tabla += "<td>";
                        tabla += tele.marca;
                        tabla += "</td>";
                        tabla += "<td>";
                        tabla += tele.precio;
                        tabla += "</td>";
                        tabla += "<td>";
                        tabla += tele.tipo;
                        tabla += "</td>";
                        tabla += "<td>";
                        tabla += tele.paisOrigen;
                        tabla += "</td>";
                        tabla += "<td>";
                        var path = tele.pathFoto;
                        tabla += "<img src='./BACKEND/fotos/" + tele.pathFoto + "' height=60 width=60>";
                        tabla += "</td>";
                        tabla += "<td>";
                        tabla += "<input type='button' value='Modificar' class=\"btn btn-info\" onclick='PrimerParcial.Manejadora.ModificarTelevisor(" + JSON.stringify(tele) + ")' /></br>";
                        tabla += "<input type='button' value='Eliminar' class=\"btn btn-warning\" onclick='PrimerParcial.Manejadora.EliminarTelevisor(" + JSON.stringify(tele) + ")' />";
                        tabla += "</td>";
                        tabla += "</tr>";
                    }
                }
                tabla += "</table>";
                Manejadora.AdministrarSpinner(false);
                $("#divTabla").html(tabla);
            });
            Manejadora.LimpiarForm();
        };
        Manejadora.CargarPaisesJSON = function () {
            if ($("#pais option").length == 3) {
                var form = new FormData();
                form.append("caso", "paises");
                var ajax = $.ajax({
                    type: "POST",
                    url: "./BACKEND/administrar.php",
                    cache: false,
                    contentType: false,
                    processData: false,
                    data: form,
                    dataType: "JSON"
                });
                Manejadora.AdministrarSpinner(true);
                ajax.done(function (response) {
                    for (var _i = 0, response_2 = response; _i < response_2.length; _i++) {
                        var i = response_2[_i];
                        $("#pais").append("<option>" + i.descripcion + "</option>}");
                    }
                    Manejadora.AdministrarSpinner(false);
                });
            }
            else {
                console.log("Los paises ya estan cargados");
            }
        };
        Manejadora.LimpiarForm = function () {
            $("#codigo").val("");
            $("#marca").val("");
            $("#precio").val("");
            $("#tipo").val("");
            $("#pais").val("Argentina");
            $("#foto").val("");
            $("#imgFoto").attr("src", "./BACKEND/fotos/tv_defecto.jpg");
        };
        Manejadora.AdministrarSpinner = function (flag) {
            var gif = "./BACKEND/gif-load.gif";
            var div = document.getElementById("divSpinner");
            var img = document.getElementById("imgSpinner");
            if (flag) {
                div.style.display = "block";
                div.style.top = "50%";
                div.style.left = "45%";
                img.src = gif;
            }
            else {
                div.style.display = "none";
                img.src = "";
            }
        };
        return Manejadora;
    }());
    PrimerParcial.Manejadora = Manejadora;
})(PrimerParcial || (PrimerParcial = {}));
