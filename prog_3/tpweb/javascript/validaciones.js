"use strict";
function AdministrarValidaciones() {
    var flag = true;
    var DNI = document.getElementById("dni").value;
    var Apellido = document.getElementById("apellido").value;
    var Nombre = document.getElementById("nombre").value;
    var Legajo = document.getElementById("legajo").value;
    var Sueldo = document.getElementById("sueldo").value;
    var Sexo = document.getElementById("cboSexo").value;
    var Foto = document.getElementById("archivo").value;
    //verifico campos vacios en dni.
    if (ValidarCamposVacios(DNI)) {
        //verifico que este en rango.
        if (ValidarRangoNumerico((Number(DNI)), 1000000, 55000000) == false) {
            AdministrarSpanError("spnDNI", true);
            flag = false;
        }
    }
    //verifico campos vacios Apellido
    if (ValidarCamposVacios(Apellido) == false) {
        AdministrarSpanError("spnApellido", true);
        flag = false;
    }
    //verifico campos vacios nombre
    if (ValidarCamposVacios(Nombre) == false) {
        AdministrarSpanError("spnNombre", true);
        flag = false;
    }
    //validamos campo vacio legajo.
    if (ValidarCamposVacios(Legajo)) {
        //vemos que el legajo este dentro de rango permitido.
        if (ValidarRangoNumerico((Number(Legajo)), 100, 550) == false) {
            AdministrarSpanError("spnLegajo", true);
            flag = false;
        }
    }
    //validamos campo sueldo
    if (ValidarCamposVacios(Sueldo)) {
        //vemos si esta en el rango permitido.
        if (ValidarRangoNumerico((Number(Sueldo)), 8000, ObtenerSueldoMaximo(ObtenerTurnoSeleccionado())) == false) {
            AdministrarSpanError("spnSueldo", true);
            flag = false;
        }
    }
    //validamos sexo viendo que se ha seleccionado uno.
    if (ValidarCombo(Sexo, "seleccione") != true) {
        AdministrarSpanError("spnSexo", true);
        flag = false;
    }
    //Validamos Foto.
    if (ValidarCamposVacios(Foto) == false) {
        flag = false;
    }
    //si todo es ok.
    if (flag) {
        var btn = document.getElementById("guardar");
        btn.type = "submit";
        btn.click();
        //mando un login correctamente por consola y alert.
        console.log("Login Successful");
    }
}
//Si devuelve false ahi espacios vacios.
function ValidarCamposVacios(texto) {
    var retorno = false;
    if (texto.length > 0) {
        if (texto != "") {
            retorno = true;
        }
    }
    return retorno;
}
function ValidarRangoNumerico(numero, minimo, maximo) {
    var retorno = false;
    if (numero >= minimo && numero <= maximo) {
        retorno = true;
    }
    return retorno;
}
function ValidarCombo(valor, valorFalse) {
    var retorno = false;
    if (valor != valorFalse) {
        retorno = true;
    }
    return retorno;
}
function ObtenerTurnoSeleccionado() {
    return traerChecks();
}
function ObtenerSueldoMaximo(turno) {
    var retorno = 0;
    switch (turno) {
        case "Maniana":
            retorno = 20000;
            break;
        case "Tarde":
            retorno = 18500;
            break;
        case "Noche":
            retorno = 25000;
            break;
        default:
            break;
    }
    return retorno;
}
function traerChecks() {
    //obtengo todos los inputs
    var checks = document.getElementsByTagName("input");
    var seleccionados = "";
    //recorro los inputs
    for (var index = 0; index < checks.length; index++) {
        var input = checks[index];
        if (input.type === "radio") { //verifico que sea un Checked(checkbox)
            if (input.checked === true) { //verifico que este seleccionado
                seleccionados += input.value;
            }
        }
    }
    //quito el ultimo guion (-)
    //seleccionados = seleccionados.substr(0, seleccionados.length - 1);
    return seleccionados;
}
///Administraciones LOGIN.
function AdministrarValidacionesLogin() {
    //verifico campos vacios en dni.
    if (ValidarCamposVacios(document.getElementById("dni").value)) {
        //verifico que este en rango.
        if (ValidarRangoNumerico((Number(document.getElementById("dni").value)), 1000000, 55000000) == false) {
            AdministrarSpanError("spnDNI", true);
        }
    }
    //verifico campos vacios nombre
    if (ValidarCamposVacios(document.getElementById("apellido").value) == false) {
        AdministrarSpanError("spnApellido", true);
    }
    if (VerificarValidacionesLogin() == false) {
        var form = document.getElementById("form");
    }
}
function AdministrarSpanError(id, visible) {
    var span = document.getElementById(id);
    if (visible) {
        span === null || span === void 0 ? void 0 : span.setAttribute("style", "display:block");
        span === null || span === void 0 ? void 0 : span.setAttribute("style", "color: red");
    }
    else {
        span === null || span === void 0 ? void 0 : span.setAttribute("style", "display:none");
    }
}
function VerificarValidacionesLogin() {
    var _a, _b;
    var retorno = false;
    var dni = (_a = document.getElementById("spnDNI")) === null || _a === void 0 ? void 0 : _a.style.display;
    var apellido = (_b = document.getElementById("spnApellido")) === null || _b === void 0 ? void 0 : _b.style.display;
    if (dni == "none" && apellido == "none") {
        retorno = true;
    }
    return retorno;
}
function AdministrarModificar(dni) {
    var inputHidden = document.getElementById("inpHidden");
    if (inputHidden != null) {
        inputHidden === null || inputHidden === void 0 ? void 0 : inputHidden.setAttribute("value", dni.toString());
        var form = document.getElementById("form");
        form.submit();
    }
}
//# sourceMappingURL=validaciones.js.map