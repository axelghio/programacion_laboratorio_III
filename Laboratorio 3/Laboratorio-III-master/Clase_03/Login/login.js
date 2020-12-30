if (localStorage.getItem("Empleados") == null)
    localStorage.setItem("Empleados", "Pepe-101,Juan-102");
function Loguear() {
    var nombre;
    var legajo;
    var emp = localStorage.getItem("Empleados");
    var array_emp = Array();
    var array_datos = Array();
    var array_terminado = Array();
    nombre = document.getElementById("nombreTxt").value;
    legajo = document.getElementById("legajoTxt").value;
    if (emp != null) {
        array_emp = emp.split(",");
    }
    array_emp.forEach(function (obj) {
        array_datos = obj.split("-");
        array_datos.forEach(function (element) {
            array_terminado.push(element);
        });
    });
    var flag = false;
    for (var i = 0; i < array_terminado.length; i++) {
        if (array_terminado[i] == nombre && array_terminado[i + 1] == legajo) {
            flag = true;
            break;
        }
        else {
            flag = false;
        }
    }
    if (flag) {
        window.location.href = 'home.html';
    }
    else {
        alert("no son iguales");
    }
}
