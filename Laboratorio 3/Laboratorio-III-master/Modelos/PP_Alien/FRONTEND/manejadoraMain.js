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
    var Ente = /** @class */ (function () {
        function Ente(cuadrante, edad, altura) {
            this.cuadrante = cuadrante;
            this.edad = edad;
            this.altura = altura;
        }
        Ente.prototype.ToString = function () {
            return "\"cuadrante\":\"" + this.cuadrante + "\",\"edad\":\"" + this.edad + "\",\"altura\":\"" + this.altura + "\"";
        };
        return Ente;
    }());
    Entidades.Ente = Ente;
})(Entidades || (Entidades = {}));
///<reference path="ente.ts"/>
var Entidades;
(function (Entidades) {
    var Alien = /** @class */ (function (_super) {
        __extends(Alien, _super);
        function Alien(cuadrante, edad, altura, raza, planetaOrigen, pathFoto) {
            var _this = _super.call(this, cuadrante, edad, altura) || this;
            _this.raza = raza;
            _this.planetaOrigen = planetaOrigen;
            _this.pathFoto = pathFoto;
            return _this;
        }
        Alien.prototype.ToJSON = function () {
            var json = "{" + _super.prototype.ToString.call(this) + ",\"raza\":\"" + this.raza + "\",\"planetaOrigen\":\"" + this.planetaOrigen + "\",\"pathFoto\":\"" + this.pathFoto + "\"}";
            return JSON.parse(json);
        };
        return Alien;
    }(Entidades.Ente));
    Entidades.Alien = Alien;
})(Entidades || (Entidades = {}));
/// <reference path="node_modules/@types/jquery/index.d.ts" />
///<reference path="alien.ts"/>
var RecuperatorioPrimerParcial;
(function (RecuperatorioPrimerParcial) {
    var Manejadora = /** @class */ (function () {
        function Manejadora() {
        }
        Manejadora.AgregarAlien = function (refreshLocalStorage) {
            if (refreshLocalStorage === void 0) { refreshLocalStorage = false; }
            var cuadrante = $("#cuadrante").val();
            var edad = $("#edad").val();
            var altura = $("#altura").val();
            var raza = $("#raza").val();
            var planetaOrigen = $("#cboPlaneta").val();
            var foto = document.getElementById("foto");
            var path = document.getElementById("foto").value;
            var pathFoto = (path.split('\\'))[2];
            var alien = new Entidades.Alien(cuadrante, parseInt(edad), parseFloat(altura), raza, planetaOrigen, pathFoto);
            var form = new FormData();
            form.append("foto", foto.files[0]);
            form.append("cadenaJson", JSON.stringify(alien.ToJSON()));
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
            ajax.done(function (response) {
                if (localStorage.getItem("modificar")) {
                    if (response.TodoOK) {
                        alert("Se modifico el alien");
                        $("#btn-agregar").val("Agregar");
                        Manejadora.GuardarEnLocalStorage();
                        Manejadora.MostrarAliens();
                        $("#cuadrante").prop("disabled", false);
                    }
                    else {
                        alert("No se modifico el alien");
                        console.log("No se modifico el alien");
                        $("#btn-agregar").val("Agregar");
                        $("#cuadrante").prop("disabled", false);
                    }
                    localStorage.setItem("modificar", "false");
                }
                else {
                    if (response.TodoOK) {
                        alert("Se guardo la foto");
                        if (refreshLocalStorage) {
                            Manejadora.GuardarEnLocalStorage();
                        }
                    }
                    else {
                        alert("No se guardo la foto");
                    }
                }
            });
        };
        Manejadora.MostrarAliens = function () {
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
            ajax.done(function (response) {
                var tabla = "";
                tabla += "<table border=1>";
                tabla += "<thead>";
                tabla += "<tr>";
                tabla += "<td>Cuadrante</td>";
                tabla += "<td>Edad</td>";
                tabla += "<td>Altura</td>";
                tabla += "<td>Raza</td>";
                tabla += "<td>PlanetaOrigen</td>";
                tabla += "<td>Foto</td>";
                tabla += "</tr>";
                tabla += "</thead>";
                var lista = response;
                lista.forEach(function (alien) {
                    tabla += "<tr>";
                    tabla += "<td>";
                    tabla += alien.cuadrante;
                    tabla += "</td>";
                    tabla += "<td>";
                    tabla += alien.edad;
                    tabla += "</td>";
                    tabla += "<td>";
                    tabla += alien.altura;
                    tabla += "</td>";
                    tabla += "<td>";
                    tabla += alien.raza;
                    tabla += "</td>";
                    tabla += "<td>";
                    tabla += alien.planetaOrigen;
                    tabla += "</td>";
                    tabla += "<td>";
                    var img = new Image();
                    var path = alien.pathFoto;
                    img.src = "./BACKEND/fotos/" + path;
                    tabla += "<img src='./BACKEND/fotos/" + alien.pathFoto + "' height=60 width=60 ></img>";
                    tabla += "</td>";
                    tabla += "<td>";
                    tabla += "<input type='button' value='Modificar' class=\"btn btn-info\" onclick='new RecuperatorioPrimerParcial.Manejadora().ModificarAlien(" + JSON.stringify(alien) + ")' /></br>";
                    tabla += "<input type='button' value='Eliminar' class=\"btn btn-info\" onclick='new RecuperatorioPrimerParcial.Manejadora().EliminarAlien(" + JSON.stringify(alien) + ")' />";
                    tabla += "</td>";
                    tabla += "</tr>";
                });
                tabla += "</table>";
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
            ajax.done(function (response) {
                localStorage.setItem("aliens_local_storage", JSON.stringify(response));
            });
        };
        Manejadora.VerificarExistencia = function () {
            var cuadrante = $("#cuadrante").val();
            var raza = $("#raza").val();
            var listado = JSON.parse(localStorage.getItem("aliens_local_storage"));
            var flag = false;
            for (var _i = 0, listado_1 = listado; _i < listado_1.length; _i++) {
                var alien = listado_1[_i];
                if (alien.cuadrante == cuadrante && alien.raza == raza) {
                    flag = true;
                    alert("El alien ya existe");
                    console.log("El alien ya existe");
                    break;
                }
            }
            if (!flag) {
                Manejadora.AgregarAlien(true);
            }
        };
        Manejadora.ObtenerAliensPorCuadrante = function () {
            var aliens = JSON.parse(localStorage.getItem("aliens_local_storage"));
            var contadores = [];
            for (var _i = 0, aliens_1 = aliens; _i < aliens_1.length; _i++) {
                var datos = aliens_1[_i];
                if (contadores[datos.cuadrante] === undefined) {
                    contadores.push(datos.cuadrante);
                    contadores[datos.cuadrante] = 0;
                }
                contadores[datos.cuadrante]++;
            }
            var max = undefined;
            var min = undefined;
            for (var _a = 0, contadores_1 = contadores; _a < contadores_1.length; _a++) {
                var datos = contadores_1[_a];
                if (max === undefined && min === undefined) {
                    max = contadores[datos];
                    min = contadores[datos];
                }
                break;
            }
            console.log(max);
            console.log(min);
            var maxStr = "El/Los cuadrantes con " + max + " aliens es/son: ";
            var minStr = "El/Los cuadrantes con " + min + " aliens es/son: ";
            for (var _b = 0, contadores_2 = contadores; _b < contadores_2.length; _b++) {
                var planeta = contadores_2[_b];
                if (contadores[planeta] > max) {
                    max = contadores[planeta];
                }
                else if (contadores[planeta] < min) {
                    min = contadores[planeta];
                }
            }
            for (var _c = 0, contadores_3 = contadores; _c < contadores_3.length; _c++) {
                var planetas = contadores_3[_c];
                if (contadores[planetas] == max) {
                    maxStr += planetas + "\n";
                }
                if (contadores[planetas] == min) {
                    minStr += planetas + "\n";
                }
            }
            console.log(maxStr);
            console.log(minStr);
        };
        Manejadora.prototype.EliminarAlien = function (alien) {
            if (confirm("\u00BFDesea eliminar " + alien.cuadrante + ", " + alien.raza + "?")) {
                var form = new FormData();
                form.append("cadenaJson", JSON.stringify(alien));
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
                        Manejadora.GuardarEnLocalStorage();
                        Manejadora.MostrarAliens();
                    }
                    else {
                        alert("No se pudo eliminar");
                    }
                });
            }
        };
        Manejadora.prototype.ModificarAlien = function (alien) {
            $("#btn-agregar").val("Modificar");
            $("#cuadrante").val(alien.cuadrante);
            $("#cuadrante").prop("disabled", true);
            $("#raza").val(alien.raza);
            $("#edad").val(alien.edad);
            $("#altura").val(alien.altura);
            $("#CboPlaneta").val(alien.planetaOrigen);
            //$("#foto").val(alien.pathFoto);
            $("#imgFoto").attr("src", "./BACKEND/fotos/" + alien.pathFoto);
            localStorage.setItem("modificar", "true");
        };
        return Manejadora;
    }());
    RecuperatorioPrimerParcial.Manejadora = Manejadora;
})(RecuperatorioPrimerParcial || (RecuperatorioPrimerParcial = {}));
