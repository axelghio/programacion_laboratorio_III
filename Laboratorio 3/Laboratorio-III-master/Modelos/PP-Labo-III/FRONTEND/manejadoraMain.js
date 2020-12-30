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
    var Mascota = /** @class */ (function () {
        function Mascota(tamaño, edad, precio) {
            this.tamaño = tamaño;
            this.edad = edad;
            this.precio = precio;
        }
        Mascota.prototype.ToString = function () {
            return "\"tamanio\":\"" + this.tamaño + "\",\"edad\":\"" + this.edad + "\",\"precio\":\"" + this.precio + "\"";
        };
        return Mascota;
    }());
    Entidades.Mascota = Mascota;
})(Entidades || (Entidades = {}));
///<reference path="mascota.ts"/>
var Entidades;
(function (Entidades) {
    var Perro = /** @class */ (function (_super) {
        __extends(Perro, _super);
        function Perro(tamaño, edad, precio, nombre, raza, path) {
            var _this = _super.call(this, tamaño, edad, precio) || this;
            _this.nombre = nombre;
            _this.raza = raza;
            _this.pathFoto = path;
            return _this;
        }
        Perro.prototype.ToJSON = function () {
            var obj = "{\"nombre\":\"" + this.nombre + "\",\"raza\":\"" + this.raza + "\",\"pathFoto\":\"" + this.pathFoto + "\"," + _super.prototype.ToString.call(this) + "}";
            return JSON.parse(obj);
        };
        return Perro;
    }(Entidades.Mascota));
    Entidades.Perro = Perro;
})(Entidades || (Entidades = {}));
/// <reference path="node_modules/@types/jquery/index.d.ts" />
///<reference path="perro.ts"/>
var PrimerParcial;
(function (PrimerParcial) {
    var Manejadora = /** @class */ (function () {
        function Manejadora() {
        }
        Manejadora.AgregarPerroJSON = function () {
            if (Manejadora.AdministrarValidaciones()) {
                var tamaño = document.getElementById("tamaño").value;
                var edad = document.getElementById("edad").value;
                var precio = document.getElementById("precio").value;
                var nombre = document.getElementById("nombre").value;
                var raza = document.getElementById("raza").value;
                var foto = document.getElementById("foto");
                var path = document.getElementById("foto").value;
                var pathFoto = (path.split('\\'))[2];
                var perro = new Entidades.Perro(tamaño, parseInt(edad), parseFloat(precio), nombre, raza, pathFoto);
                var xhr = new XMLHttpRequest();
                var form = new FormData();
                form.append("foto", foto.files[0]);
                form.append("cadenaJson", JSON.stringify(perro.ToJSON()));
                var ajax = $.ajax({
                    type: "POST",
                    url: "./BACKEND/agregar_json.php",
                    cache: false,
                    contentType: false,
                    processData: false,
                    data: form,
                    dataType: "JSON"
                });
                ajax.done(function (response) {
                    if (response.Ok) {
                        alert("Se guardo la foto");
                    }
                    else {
                        alert("No se guardo la foto");
                    }
                });
            }
            else {
                alert("Hay campos vacios");
            }
        };
        Manejadora.MostrarPerrosJSON = function () {
            var ajax = $.ajax({
                type: "POST",
                url: "./BACKEND/traer_json.php",
                cache: false,
                contentType: false,
                processData: false,
                dataType: "JSON"
            });
            ajax.done(function (response) {
                var tabla = "";
                tabla += "<table border=1>";
                tabla += "<thead>";
                tabla += "<tr>";
                tabla += "<td>Tamaño</td>";
                tabla += "<td>Edad</td>";
                tabla += "<td>Precio</td>";
                tabla += "<td>Nombre</td>";
                tabla += "<td>Raza</td>";
                tabla += "<td>Foto</td>";
                tabla += "</tr>";
                tabla += "</thead>";
                var lista = response;
                lista.forEach(function (perro) {
                    tabla += "<tr>";
                    tabla += "<td>";
                    tabla += perro.tamanio;
                    tabla += "</td>";
                    tabla += "<td>";
                    tabla += perro.edad;
                    tabla += "</td>";
                    tabla += "<td>";
                    tabla += perro.precio;
                    tabla += "</td>";
                    tabla += "<td>";
                    tabla += perro.nombre;
                    tabla += "</td>";
                    tabla += "<td>";
                    tabla += perro.raza;
                    tabla += "</td>";
                    tabla += "<td>";
                    var img = new Image();
                    var path = perro.pathFoto;
                    img.src = "./BACKEND/fotos/" + path;
                    tabla += "<img src='./BACKEND/fotos/" + perro.pathFoto + "' height=100 width=100 ></img>";
                    tabla += "</td>";
                    tabla += "</tr>";
                });
                tabla += "</table>";
                $("#divTabla").html(tabla);
            });
        };
        Manejadora.AgregarPerroEnBaseDatos = function () {
            if (Manejadora.AdministrarValidaciones()) {
                var tamaño = document.getElementById("tamaño").value;
                var edad = document.getElementById("edad").value;
                var precio = document.getElementById("precio").value;
                var nombre = document.getElementById("nombre").value;
                var raza = document.getElementById("raza").value;
                var foto = document.getElementById("foto");
                var path = document.getElementById("foto").value;
                var pathFoto = (path.split('\\'))[2];
                var perro = new Entidades.Perro(tamaño, parseInt(edad), parseFloat(precio), nombre, raza, pathFoto);
                var form = new FormData();
                form.append("foto", foto.files[0]);
                form.append("cadenaJson", JSON.stringify(perro.ToJSON()));
                var backend = "./BACKEND/agregar_bd.php";
                if (localStorage.getItem("modificar")) {
                    backend = "./BACKEND/modificar_bd.php";
                }
                var ajax = $.ajax({
                    type: "POST",
                    url: backend,
                    cache: false,
                    contentType: false,
                    processData: false,
                    data: form,
                    dataType: "JSON"
                });
                ajax.done(function (response) {
                    if (localStorage.getItem("modificar")) {
                        if (response.Ok) {
                            alert("Se modifico el perro");
                            document.getElementById("btnAgregarBd").value = "Agregar en BD";
                            Manejadora.MostrarPerrosBaseDatos();
                            $("#precio").prop("disabled", false);
                        }
                        else {
                            alert("No se modifico el perro");
                            console.log("No se modifico el perro");
                            document.getElementById("btnAgregarBd").value = "Agregar en BD";
                            $("#precio").prop("disabled", false);
                        }
                    }
                    else {
                        if (response.Ok) {
                            alert("Se guardo la foto");
                        }
                        else {
                            alert("No se guardo la foto");
                        }
                    }
                });
                localStorage.removeItem("modificar");
            }
            else {
                alert("Hay errores en los campos");
            }
        };
        Manejadora.VerificarExistencia = function () {
            var edad = document.getElementById("edad").value;
            var raza = document.getElementById("raza").value;
            var ajax = $.ajax({
                type: "POST",
                url: "./BACKEND/traer_bd.php",
                cache: false,
                contentType: false,
                processData: false,
                dataType: "JSON"
            });
            ajax.done(function (response) {
                var lista = response;
                var flag = false;
                lista.forEach(function (perrito) {
                    if (perrito.edad == edad && perrito.raza == raza) {
                        flag = true;
                        alert("Ya existe ese perro");
                        console.log("Ya existe ese perro");
                        return;
                    }
                });
                if (!flag) {
                    Manejadora.AgregarPerroEnBaseDatos();
                    alert("Se agrego correctamente");
                }
            });
        };
        Manejadora.MostrarPerrosBaseDatos = function () {
            var ajax = $.ajax({
                type: "POST",
                url: "./BACKEND/traer_bd.php",
                cache: false,
                contentType: false,
                processData: false,
                dataType: "JSON"
            });
            new Manejadora().AdministrarSpinner(true);
            ajax.done(function (response) {
                var tabla = "";
                tabla += "<table border=1>";
                tabla += "<thead>";
                tabla += "<tr>";
                //if($("#chxNombre").prop("checked"))
                tabla += "<td>Tamaño</td>";
                tabla += "<td>Edad</td>";
                tabla += "<td>Precio</td>";
                tabla += "<td>Nombre</td>";
                tabla += "<td>Raza</td>";
                tabla += "<td>Foto</td>";
                tabla += "</tr>";
                tabla += "</thead>";
                var lista = response;
                lista.forEach(function (perro) {
                    tabla += "<tr>";
                    tabla += "<td>";
                    tabla += perro.tamanio;
                    tabla += "</td>";
                    tabla += "<td>";
                    tabla += perro.edad;
                    tabla += "</td>";
                    tabla += "<td>";
                    tabla += perro.precio;
                    tabla += "</td>";
                    tabla += "<td>";
                    tabla += perro.nombre;
                    tabla += "</td>";
                    tabla += "<td>";
                    tabla += perro.raza;
                    tabla += "</td>";
                    tabla += "<td>";
                    var pathFinal = "./BACKEND/fotos/" + perro.pathFoto;
                    if (perro.pathFoto.indexOf("MODIFICADA") != -1) {
                        pathFinal = "./BACKEND/fotos_modificadas/" + perro.pathFoto;
                    }
                    tabla += "<img src='" + pathFinal + "' height=100 width=100 ></img>";
                    tabla += "</td>";
                    tabla += "<td>";
                    tabla += "<input type='button' value='Modificar' class='btn btn-warning' onclick='new PrimerParcial.Manejadora().ModificarPerro(" + JSON.stringify(perro) + ")' /></br>";
                    tabla += "<input type='button' value='Eliminar' class='btn btn-warning' onclick='new PrimerParcial.Manejadora().EliminarPerro(" + JSON.stringify(perro) + ")' />";
                    tabla += "</td>";
                    tabla += "</tr>";
                });
                tabla += "</table>";
                $("#divTabla").html(tabla);
                new Manejadora().AdministrarSpinner(false);
            });
        };
        Manejadora.prototype.EliminarPerro = function (perro) {
            var form = new FormData();
            form.append("cadenaJson", JSON.stringify(perro));
            var ajax = $.ajax({
                type: "POST",
                url: "./BACKEND/traer_bd.php",
                cache: false,
                contentType: false,
                processData: false,
                dataType: "JSON"
            });
            ajax.done(function (response) {
                for (var _i = 0, response_1 = response; _i < response_1.length; _i++) {
                    var perrito = response_1[_i];
                    if (perrito.nombre == perro.nombre && perrito.raza == perro.raza) {
                        if (confirm("\u00BFSeguro desea eliminar a " + perro.nombre + " " + perro.raza + "?")) {
                            var eliminar = $.ajax({
                                type: "POST",
                                url: "./BACKEND/eliminar_bd.php",
                                cache: false,
                                contentType: false,
                                processData: false,
                                data: form,
                                dataType: "JSON"
                            });
                            eliminar.done(function (rsp) {
                                if (!rsp.Ok) {
                                    alert("Se ha eliminado el perro");
                                    PrimerParcial.Manejadora.MostrarPerrosBaseDatos();
                                }
                                else {
                                    alert("No se ha eliminado el perro");
                                }
                            });
                        }
                        break;
                    }
                }
            });
        };
        Manejadora.prototype.ModificarPerro = function (perro) {
            document.getElementById("btnAgregarBd").value = "ModificarBd";
            $("#precio").prop("disabled", true);
            $("#raza").val(perro.raza);
            $("#nombre").val(perro.nombre);
            $("#precio").val(perro.precio);
            $("#edad").val(perro.edad);
            $("#tamaño").val(perro.tamanio);
            //$("#foto").val(perro.pathFoto);
            localStorage.setItem("modificar", "true");
        };
        Manejadora.prototype.ObtenerPerrosPorTamaño = function () {
            var ajax = $.ajax({
                type: "POST",
                url: "./BACKEND/traer_bd.php",
                cache: false,
                contentType: false,
                processData: false,
                dataType: "JSON"
            });
            ajax.done(function (response) {
                var chico = 0;
                var mediano = 0;
                var grande = 0;
                for (var _i = 0, response_2 = response; _i < response_2.length; _i++) {
                    var perrito = response_2[_i];
                    perrito.tamanio.toLowerCase();
                    if (perrito.tamanio == "chico") {
                        chico++;
                    }
                    else if (perrito.tamanio == "mediano") {
                        mediano++;
                    }
                    else if (perrito.tamanio == "grande") {
                        grande++;
                    }
                }
                var max = chico;
                var min = chico;
                var maxTamaño = "chico";
                var minTamaño = "chico";
                if (mediano > max) {
                    max = mediano;
                    maxTamaño = "mediano";
                }
                else if (mediano == max) {
                    maxTamaño += ", mediano";
                }
                if (grande > max) {
                    max = grande;
                    maxTamaño = "grande";
                }
                else if (grande == max) {
                    maxTamaño += ", grande";
                }
                if (mediano < min) {
                    min = mediano;
                    minTamaño = "mediano";
                }
                else if (mediano == min) {
                    minTamaño += ", mediano";
                }
                if (grande < min) {
                    min = grande;
                    minTamaño = "grande";
                }
                else if (grande == min) {
                    minTamaño += ", grande";
                }
                console.log("La mayor cantidad es " + maxTamaño + " con " + max + " perros.");
                console.log("La menor cantidad es " + minTamaño + " con " + min + " perros.");
            });
        };
        Manejadora.prototype.FiltrarPerrosPorRaza = function () {
            var raza = $("#raza").val();
            var ajax = $.ajax({
                type: "POST",
                url: "./BACKEND/traer_bd.php",
                cache: false,
                contentType: false,
                processData: false,
                dataType: "JSON"
            });
            ajax.done(function (response) {
                var tabla = "<table border=1>" +
                    "<thead><tr><td>Tamaño</td><td>Edad</td><td>Precio</td><td>Nombre</td><td>Raza</td><td>Foto</td></tr></thead>";
                for (var _i = 0, response_3 = response; _i < response_3.length; _i++) {
                    var perro = response_3[_i];
                    if (perro.raza == raza) {
                        tabla += "<tr><td>" + perro.tamanio + "</td>";
                        tabla += "<td>" + perro.edad + "</td>";
                        tabla += "<td>" + perro.precio + "</td>";
                        tabla += "<td>" + perro.nombre + "</td>";
                        tabla += "<td>" + perro.raza + "</td>";
                        tabla += "<td>";
                        var pathFinal = "./BACKEND/fotos/" + perro.pathFoto;
                        if (perro.pathFoto.indexOf("MODIFICADA") != -1) {
                            pathFinal = "./BACKEND/fotos_modificadas/" + perro.pathFoto;
                        }
                        tabla += "<img src='" + pathFinal + "' height=100 width=100 ></img>";
                        tabla += "</td>";
                        tabla += "<td>";
                        tabla += "<input type='button' value='Modificar' class='btn btn-warning' onclick='new PrimerParcial.Manejadora().ModificarPerro(" + JSON.stringify(perro) + ")' /></br>";
                        tabla += "<input type='button' value='Eliminar' class='btn btn-warning' onclick='new PrimerParcial.Manejadora().EliminarPerro(" + JSON.stringify(perro) + ")' />";
                        tabla += "</td></tr>";
                    }
                }
                tabla += "</table>";
                $("#divTabla").html(tabla);
            });
        };
        Manejadora.prototype.CargarRazasJSON = function () {
            var ajax = $.ajax({
                type: "POST",
                url: "./BACKEND/cargar_raza.php",
                cache: false,
                contentType: false,
                processData: false,
                dataType: "JSON"
            });
            new Manejadora().AdministrarSpinner(true);
            ajax.done(function (response) {
                var cboRaza = document.getElementById('raza');
                for (var _i = 0, response_4 = response; _i < response_4.length; _i++) {
                    var i = response_4[_i];
                    cboRaza.innerHTML += "<option>" + i.descripcion + "</option>";
                }
            });
        };
        Manejadora.prototype.AdministrarSpinner = function (flag) {
            setTimeout(function () {
                if (!flag) {
                    document.getElementById('imgSpinner').setAttribute('src', '');
                }
            }, 1000);
            if (flag)
                document.getElementById('imgSpinner').setAttribute('src', './BACKEND/gif-load.gif');
        };
        Manejadora.AdministrarValidaciones = function () {
            var todoOk = false;
            var todosLosCamposCompletos = true;
            var numeroValido = false;
            var tipoValido = false;
            var ids = ["tamaño", "edad", "precio", "nombre", "raza"];
            var tipos = ["salchicha", "chihuahua", "pitbull", "caniche", "ovejero", "Salchicha", "Perro", "Ovejero", "Boxer", "Caniche toy", "Chihuahua"];
            for (var index = 0; index < ids.length; index++) {
                if (this.ValidarCamposVacios(ids[index])) {
                    document.getElementById(ids[index]).nextElementSibling.style.display = "none";
                }
                else {
                    todosLosCamposCompletos = false;
                    document.getElementById(ids[index]).nextElementSibling.style.display = "inline";
                }
            }
            numeroValido = this.ValidarEdad(parseInt(document.getElementById("edad").value));
            tipoValido = this.ValidarRaza(document.getElementById("raza").value, tipos);
            if (!numeroValido) {
                document.getElementById("edad").nextElementSibling.style.display = "inline";
            }
            if (!tipoValido) {
                document.getElementById("raza").nextElementSibling.style.display = "inline";
            }
            if (todosLosCamposCompletos && numeroValido && tipoValido) {
                todoOk = true;
            }
            return todoOk;
        };
        Manejadora.ValidarCamposVacios = function (aux) {
            var flag = false;
            if ($("#" + aux).val() != "") {
                flag = true;
            }
            return flag;
        };
        Manejadora.ValidarRaza = function (valor, permitidos) {
            var flag = false;
            for (var _i = 0, permitidos_1 = permitidos; _i < permitidos_1.length; _i++) {
                var raza = permitidos_1[_i];
                if (valor === raza) {
                    flag = true;
                    break;
                }
            }
            return flag;
        };
        Manejadora.ValidarEdad = function (edad) {
            var flag = false;
            if (edad >= 0 && edad < 18) {
                flag = true;
            }
            return flag;
        };
        return Manejadora;
    }());
    PrimerParcial.Manejadora = Manejadora;
})(PrimerParcial || (PrimerParcial = {}));
