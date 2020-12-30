function mostrar() {
    var http = new XMLHttpRequest();
    http.open("POST", "administracion.php", true);
    http.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    http.send("queHago=mostrarGrilla");
    http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
            document.getElementById("divGrilla").innerHTML = http.responseText;
        }
    };
}
function loguear() {
    var http = new XMLHttpRequest();
    http.open("POST", "verificacion.php", true);
    http.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    http.send("usuario=logueado");
    var flag = false;
    http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
            if (http.responseText == "ok") {
                alert("resp:" + http.responseText);
                flag = true;
            }
        }
    };
    alert(flag);
    return flag;
}
window.onload = function () {
    if (loguear()) {
        mostrar();
    }
};
