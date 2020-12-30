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

function agregarHeroe(): void {
    let id: number = Number($('#txtId').val());
    let tipo: Clases.tipoHeroe = Number($('#selectTipo').val());
    //crear heroe(nuevoHeroe) en base a los datos del DOM
    let nuevoHeroe = new Clases.Heroe( String($('#txtNombre').val()), Number($('#txtEdad').val()), id, tipo, String($('#txtPoder').val()));
    

    let HeroesString: string | null = localStorage.getItem("Heroes");

    let HeroesJSON: JSON[] = HeroesString == null ? [] : JSON.parse(HeroesString);

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

    let HeroesString: string | null = localStorage.getItem("Heroes");

    let HeroesJSON: Clases.Heroe[] = HeroesString == null ? [] : JSON.parse(HeroesString);

    let tabla: string = "<table class='table'><thead><tr><th>Id</th><th>Nombre</th><th>Edad</th><th>Tipo</th><th>Poder</th></tr>";



    for (let i = 0; i < HeroesJSON.length; i++) {

        tabla += `<tr><td>${HeroesJSON[i].id}</td><td>${HeroesJSON[i].nombre}</td><td>${HeroesJSON[i].edad}</td><td>${Clases.tipoHeroe[HeroesJSON[i].tipo]}</td><td>${HeroesJSON[i].poder_principal}</td>`+
        "<td><input type=button value=Eliminar onclick=eliminar(" + i + ")>" + "<input type=button value=Modificar onclick=modificar(" + i + ")></td></tr>";

    }

    tabla += `</table>`;

    $('#divTabla').html(tabla);

}

function eliminar(id: number) {
    
    let heroes: Clases.Heroe[] = JSON.parse(<string>localStorage.getItem("Heroes"));

    heroes.splice(id, 1)

    localStorage.setItem("Heroes", JSON.stringify(heroes));

    mostrarHeroes();
}


function modificar(id: number) {
    //obtengo el array de mascotas.
    let heroe = JSON.parse(<string>localStorage.getItem("Heroes"));
    console.log(heroe);

    //referencia al boton agregar mascotas.
    let btn = $("#btnModificar");

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

    let mod: any;

    btn.on("click", mod = function () {
        heroe[id].nombre = <string>$("#txtNombre").val();
        heroe[id].edad = <number>$("#txtEdad").val();
        heroe[id].patas = <number>$("#txtPoder").val();
       // mascota[id].tipo = <number>$("#selectTipo").val();
       heroe[id].tipo =  Clases.tipoHeroe[<number>$("#selectTipo").val()];
       heroe[id].id = <number>$("#txtId").val();

        localStorage.setItem("Heroes", JSON.stringify(heroe));

        mostrarHeroes();

        btn.attr("value", "Agregar");
        btn.off("click", mod);
        btn.on("click", agregarHeroe);
        limpiarCampos();
    });
}


function cargarTipos() {

    for (let i = 0; i < Object.keys(Clases.tipoHeroe).length / 2; i++) {
        $("#cmbFiltro").append('<option value="' + i + '">' + Clases.tipoHeroe[i] + '</option>');
    }

    for (let i = 0; i < Object.keys(Clases.tipoHeroe).length / 2; i++) {
        $("#selectTipo").append('<option value="' + i + '">' + Clases.tipoHeroe[i] + '</option>');
    }
}


function filtrarHeroes(tipo: number) {

    let heroesFiltrados: Array<Clases.Heroe>;

    let HeroesString: string | null = localStorage.getItem("Heroes");

    let HeroesJSON: Clases.Heroe[] = HeroesString == null ? [] : JSON.parse(HeroesString);

    //en "heroesFiltrados", aplicar el filtro por tipo.
    //AYUDA. Usar el siguiente codigo: Clases.tipoHeroe[Heroe.tipo] === Clases.tipoHeroe[tipo]
    heroesFiltrados = HeroesJSON.filter(function (heroe: Clases.Heroe) {

        return Clases.tipoHeroe[heroe.tipo] === Clases.tipoHeroe[tipo];

    }

    );

    mostrarHeroesPorTipo(heroesFiltrados);

}

function cleanStorage() {
    localStorage.clear();
    alert("LocalStorage Limpio");
}

function mostrarHeroesPorTipo(lista: Array<Clases.Heroe>) {

    //en caso de disponer de tiempo. arreglar la linea de abajo para que responda a los checkbox
    let tabla: string = "<table class='table'><thead><tr><th>Id</th><th>Nombre</th><th>Edad</th><th>Tipo</th><th>Poder</th></tr>";

    if (lista.length == 0) {
        tabla += "<tr><td colspan='4'>No hay mascotas que mostrar</td></tr>";
    }
    else {


        for (let i = 0; i < lista.length; i++) {

            tabla += `<tr><td>${lista[i].id}</td><td>${lista[i].nombre}</td><td>${lista[i].edad}</td><td>${Clases.tipoHeroe[lista[i].tipo]}</td><td>${lista[i].poder_principal}</td></tr>`;

        }

    }

    tabla += `</table>`;

    $('#divTabla').html(tabla);

}

function calcularPromedio() {

    let promedio: number = 0;
    let totalEdades: number;
    let cantidad: number;

    let tipo: number = Number($('#cmbFiltro').val());

    let heroesFiltrados: Array<Clases.Heroe>;

    let HeroesString: string | null = localStorage.getItem("Heroes");

    let HeroesJSON: Clases.Heroe[] = HeroesString == null ? [] : JSON.parse(HeroesString);

//filtrar heroes por tipo
heroesFiltrados = HeroesJSON.filter(function (heroe: Clases.Heroe) {

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

        let chkId: boolean = (<HTMLInputElement> $('#chkId')[0]).checked;
        let chkName: boolean = (<HTMLInputElement> $('#chkName')[0]).checked;
        let chkEdad: boolean = (<HTMLInputElement> $('#chkEdad')[0]).checked;
        let chkPoder: boolean = (<HTMLInputElement> $('#chkPoder')[0]).checked;
    
        let HeroesString: string | null = localStorage.getItem("Heroes");
    
        let HeroesJSON: Clases.Heroe[] = HeroesString == null ? [] : JSON.parse(HeroesString);
    
        let tabla: string = "<table class='table'><thead><tr>";

        //hacer la logica para crear la tabla en base a los valores de los checkbox
        if(chkId)
        tabla += "<th>Id</th>";
        if(chkName)
        tabla += "<th>Nombre</th>";
        if(chkEdad)
        tabla+= "<th>Edad</th>";
        tabla += "<th>Tipo</th>";
        if(chkPoder)
        tabla += "<th>Poder</th>";
        tabla += "</tr>";   
    
        for (let i = 0; i < HeroesJSON.length; i++) {
    
            tabla += `<tr>`;
            if(chkId)
            tabla += `<td>${HeroesJSON[i].id}</td>`;
            if(chkName)
            tabla += `<td>${HeroesJSON[i].nombre}</td>`;
            if(chkEdad)
            tabla+= `<td>${HeroesJSON[i].edad}</td>`;
            tabla += `<td>${Clases.tipoHeroe[HeroesJSON[i].tipo]}</td>`;
            if(chkPoder)
            tabla += `<td>${HeroesJSON[i].poder_principal}</td>`;
            tabla += ``+"<td><input type=button value=Eliminar onclick=eliminar(" + i + ")>" + "<input type=button value=Modificar onclick=modificar(" + i + ")></td></tr>";             
    
        }
    
        tabla += `</table>`;
    
        $('#divTabla').html(tabla);
    
}

//agregar el codigo que crea conveniente para realizar las bajas y las modificaciones
    