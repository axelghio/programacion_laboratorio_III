"use strict";
///<reference path="enumerados.ts"/>
///<reference path="personaje.ts"/>
///<reference path="heroe.ts"/>
$(function () {
    cargarTipos();
    mostrarHeroes();
    $('#cmbFiltro').change(function () {
        filtrarHeroes(0);
    });
    //agregar al evento change de los 4 checkbox, el manejador "mapearCampos"
    $('#chkId').change(mapearCampos);
    $('#chkName').change(mapearCampos);
    $('#chkEdad').change(mapearCampos);
    $('#chkPoder').change(mapearCampos);
});
function agregarHeroe() {
    var id = Number($('#txtId').val());
    var tipo = Number($('#selectTipo').val());
    //crear heroe(nuevoHeroe) en base a los datos del DOM
    var nuevoHeroe = new Clases.Heroe(String($('#txtNombre').val()), Number($('#txtEdad').val()), id, tipo, String($('#txtPoder').val()));
    var HeroesString = localStorage.getItem("Heroes");
    var HeroesJSON = HeroesString == null ? [] : JSON.parse(HeroesString);
    console.log(nuevoHeroe.toJSON());
    //agregar el nuevo heroe a HeroesJSON
    HeroesJSON.push(JSON.parse(nuevoHeroe.toJSON()));
    //guardar HeroesJSON en localStorage con el nombre "Heroes"
    localStorage.setItem("Heroes", JSON.stringify(HeroesJSON));
    alert("Heroe guardado!!!");
    mostrarHeroes();
    limpiarCampos();
}
function limpiarCampos() {
    $('#txtNombre').val("");
    $('#txtId').val("");
    $('#txtEdad').val("");
    $('#txtPoder').val("");
    $('#selectTipo').val(0);
    $('#txtId').focus();
}
function mostrarHeroes() {
    var HeroesString = localStorage.getItem("Heroes");
    var HeroesJSON = HeroesString == null ? [] : JSON.parse(HeroesString);
    var tabla = "<table class='table'><thead><tr><th>Id</th><th>Nombre</th><th>Edad</th><th>Tipo</th><th>Poder</th></tr>";
    for (var i = 0; i < HeroesJSON.length; i++) {
        tabla += "<tr><td>" + HeroesJSON[i].id + "</td><td>" + HeroesJSON[i].nombre + "</td><td>" + HeroesJSON[i].edad + "</td><td>" + Clases.tipoHeroe[HeroesJSON[i].tipo] + "</td><td>" + HeroesJSON[i].poder_principal + "</td>" +
            "<td><input type=button value=Eliminar onclick=eliminar(" + i + ")>" + "<input type=button value=Modificar onclick=modificar(" + i + ")></td></tr>";
    }
    tabla += "</table>";
    $('#divTabla').html(tabla);
}
function eliminar(id) {
    var heroes = JSON.parse(localStorage.getItem("Heroes"));
    heroes.splice(id, 1);
    localStorage.setItem("Heroes", JSON.stringify(heroes));
    mostrarHeroes();
}
function modificar(id) {
    //obtengo el array de mascotas.
    var heroe = JSON.parse(localStorage.getItem("Heroes"));
    console.log(heroe);
    //referencia al boton agregar mascotas.
    var btn = $("#btnModificar");
    //hago que aparescan los datos en los inputs.
    $("#txtNombre").val(heroe[id].nombre);
    $("#txtEdad").val(heroe[id].edad);
    $("#txtPoder").val(heroe[id].poder_principal);
    //$("#selectTipo").val(<number>mascota[id].tipo);
    $("#selectTipo").val(Clases.tipoHeroe[heroe[id].tipo]);
    $("#txtId").val(heroe[id].id);
    //cambio el atributo value con el parametro modificar.
    btn.attr("value", "modificar");
    btn.off("click", agregarHeroe);
    var mod;
    btn.on("click", mod = function () {
        heroe[id].nombre = $("#txtNombre").val();
        heroe[id].edad = $("#txtEdad").val();
        heroe[id].patas = $("#txtPoder").val();
        // mascota[id].tipo = <number>$("#selectTipo").val();
        heroe[id].tipo = Clases.tipoHeroe[$("#selectTipo").val()];
        heroe[id].id = $("#txtId").val();
        localStorage.setItem("Heroes", JSON.stringify(heroe));
        mostrarHeroes();
        btn.attr("value", "Agregar");
        btn.off("click", mod);
        btn.on("click", agregarHeroe);
        limpiarCampos();
    });
}
function cargarTipos() {
    for (var i = 0; i < Object.keys(Clases.tipoHeroe).length / 2; i++) {
        $("#cmbFiltro").append('<option value="' + i + '">' + Clases.tipoHeroe[i] + '</option>');
    }
    for (var i = 0; i < Object.keys(Clases.tipoHeroe).length / 2; i++) {
        $("#selectTipo").append('<option value="' + i + '">' + Clases.tipoHeroe[i] + '</option>');
    }
}
function filtrarHeroes(tipo) {
    var heroesFiltrados;
    var HeroesString = localStorage.getItem("Heroes");
    var HeroesJSON = HeroesString == null ? [] : JSON.parse(HeroesString);
    //en "heroesFiltrados", aplicar el filtro por tipo.
    //AYUDA. Usar el siguiente codigo: Clases.tipoHeroe[Heroe.tipo] === Clases.tipoHeroe[tipo]
    heroesFiltrados = HeroesJSON.filter(function (heroe) {
        return Clases.tipoHeroe[heroe.tipo] === Clases.tipoHeroe[tipo];
    });
    mostrarHeroesPorTipo(heroesFiltrados);
}
function cleanStorage() {
    localStorage.clear();
    alert("LocalStorage Limpio");
}
function mostrarHeroesPorTipo(lista) {
    //en caso de disponer de tiempo. arreglar la linea de abajo para que responda a los checkbox
    var tabla = "<table class='table'><thead><tr><th>Id</th><th>Nombre</th><th>Edad</th><th>Tipo</th><th>Poder</th></tr>";
    if (lista.length == 0) {
        tabla += "<tr><td colspan='4'>No hay mascotas que mostrar</td></tr>";
    }
    else {
        for (var i = 0; i < lista.length; i++) {
            tabla += "<tr><td>" + lista[i].id + "</td><td>" + lista[i].nombre + "</td><td>" + lista[i].edad + "</td><td>" + Clases.tipoHeroe[lista[i].tipo] + "</td><td>" + lista[i].poder_principal + "</td></tr>";
        }
    }
    tabla += "</table>";
    $('#divTabla').html(tabla);
}
function calcularPromedio() {
    var promedio = 0;
    var totalEdades;
    var cantidad;
    var tipo = Number($('#cmbFiltro').val());
    var heroesFiltrados;
    var HeroesString = localStorage.getItem("Heroes");
    var HeroesJSON = HeroesString == null ? [] : JSON.parse(HeroesString);
    //filtrar heroes por tipo
    heroesFiltrados = HeroesJSON.filter(function (heroe) {
        return Clases.tipoHeroe[heroe.tipo] === Clases.tipoHeroe[tipo];
    });
    totalEdades = heroesFiltrados.reduce(function (anterior, actual) {
        return anterior += actual.edad;
    }, 0);
    //calcular suma de edades
    console.log(totalEdades);
    cantidad = heroesFiltrados.length;
    console.log(cantidad);
    //se calcula el promedio
    if (cantidad != 0) {
        promedio = totalEdades / cantidad;
    }
    //asignar promedio  al valor de txtPromedio, usando jQuery
    $('#txtPromedio').val(promedio);
}
function mapearCampos() {
    var chkId = $('#chkId')[0].checked;
    var chkName = $('#chkName')[0].checked;
    var chkEdad = $('#chkEdad')[0].checked;
    var chkPoder = $('#chkPoder')[0].checked;
    var HeroesString = localStorage.getItem("Heroes");
    var HeroesJSON = HeroesString == null ? [] : JSON.parse(HeroesString);
    var tabla = "<table class='table'><thead><tr>";
    //hacer la logica para crear la tabla en base a los valores de los checkbox
    if (chkId)
        tabla += "<th>Id</th>";
    if (chkName)
        tabla += "<th>Nombre</th>";
    if (chkEdad)
        tabla += "<th>Edad</th>";
    tabla += "<th>Tipo</th>";
    if (chkPoder)
        tabla += "<th>Poder</th>";
    tabla += "</tr>";
    for (var i = 0; i < HeroesJSON.length; i++) {
        tabla += "<tr>";
        if (chkId)
            tabla += "<td>" + HeroesJSON[i].id + "</td>";
        if (chkName)
            tabla += "<td>" + HeroesJSON[i].nombre + "</td>";
        if (chkEdad)
            tabla += "<td>" + HeroesJSON[i].edad + "</td>";
        tabla += "<td>" + Clases.tipoHeroe[HeroesJSON[i].tipo] + "</td>";
        if (chkPoder)
            tabla += "<td>" + HeroesJSON[i].poder_principal + "</td>";
        tabla += "" + "<td><input type=button value=Eliminar onclick=eliminar(" + i + ")>" + "<input type=button value=Modificar onclick=modificar(" + i + ")></td></tr>";
    }
    tabla += "</table>";
    $('#divTabla').html(tabla);
}
//agregar el codigo que crea conveniente para realizar las bajas y las modificaciones
