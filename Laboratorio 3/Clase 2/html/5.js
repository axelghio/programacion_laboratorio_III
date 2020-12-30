"use strict";
/*
Guardar su nombre y apellido en dos variables distintas. Dichas variables serán pasadas
como parámetro de la función MostrarNombreApellido, que mostrará el apellido en
mayúscula y el nombre solo con la primera letra en mayúsculas y el resto en minúsculas.
El apellido y el nombre se mostrarán separados por una coma (,).
Nota: Utilizar console.log()
*/
var ap = "ghio";
var nom = "axel";
function MostrarNombreApellido(apellido, nombre) {
    var retorno = apellido.toUpperCase();
    retorno += ", " + nombre.charAt(0).toUpperCase() + nombre.slice(1);
    return retorno;
}
console.log(MostrarNombreApellido(ap, nom));
