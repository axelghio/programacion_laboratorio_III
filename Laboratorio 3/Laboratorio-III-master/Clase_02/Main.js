function MostrarDatos() {
    var nombre = document.getElementById("nombre").value;
    var edad = document.getElementById("edad").value;
    var txtBox;
    txtBox = nombre + " " + edad;
    document.getElementById("txtBox").value = txtBox;
    document.getElementById("divText").innerHTML = txtBox;
}
