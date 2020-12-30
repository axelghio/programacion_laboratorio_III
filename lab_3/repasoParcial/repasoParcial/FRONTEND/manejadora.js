"use strict";
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
            var pais = $("#pais").val();
            var foto = document.getElementById("foto");
            var path = document.getElementById("foto").value;
            var pathFoto = (path.split('\\'))[2];
            var televisor = new Entidades.Televisor(codigo, marca, precio, tipo, pais, pathFoto);
            var form = new FormData();
            form.append("foto", foto.files[0]);
            form.append("cadenaJson", JSON.stringify(televisor.ToJson()));
            form.append("caso", "agregar");
            var ajax = $.ajax({
                type: "POST",
                url: "./BACKEND/administrar.php",
                cache: false,
                contentType: false,
                processData: false,
                data: form,
                dataType: "JSON"
            });
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
            ajax.done(function (response) {
                var tabla = "";
                tabla += "<table border=1> <thead> <tr>";
                tabla += "<td>Codigo</td> <td>Marca</td> <td>Precio</td> <td>Tipo</td> <td>PaisOrigen</td> <td>Foto</td> <td>Acciones</td>";
                tabla += "</tr> </thead>";
                var lista = response;
                lista.forEach(function (tele) {
                    tabla += "<tr><td> " + tele.codigo + " </td>";
                    tabla += "<td> " + tele.marca + " </td>";
                    tabla += "<td> " + tele.precio + " </td>";
                    tabla += "<td> " + tele.tipo + " </td>";
                    tabla += "<td> " + tele.paisOrigen + " </td>";
                    var path = tele.pathFoto;
                    tabla += "<td><img src='./BACKEND/fotos/" + tele.pathFoto + "' height=60 width=60></td>";
                    tabla += "<td><input type='button' value='Modificar' class=\"btn btn-info\" onclick='PrimerParcial.Manejadora.ModificarTelevisor(" + JSON.stringify(tele) + ")'></br>";
                    tabla += "<input type='button' value='Eliminar' class=\"btn btn-warning\" onclick='PrimerParcial.Manejadora.EliminarTelevisor(" + JSON.stringify(tele) + ")'></td></tr>";
                });
                tabla += "</table>";
                $("#divTabla").html(tabla);
            });
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
        };
        Manejadora.EliminarTelevisor = function (tv) {
            if (confirm("\u00BFDesea eliminar " + tv.codigo + ", " + tv.tipo + "?")) {
                var form = new FormData();
                form.append("cadenaJson", JSON.stringify(tv));
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
                        Manejadora.MostrarTelevisores();
                    }
                    else {
                        alert("No se pudo eliminar");
                    }
                });
            }
        };
        return Manejadora;
    }());
    PrimerParcial.Manejadora = Manejadora;
})(PrimerParcial || (PrimerParcial = {}));
//# sourceMappingURL=manejadora.js.map