function mostrar(){
    var http = new XMLHttpRequest();
    http.open("POST", "administracion.php", true);
    http.setRequestHeader("content-type","application/x-www-form-urlencoded");
    http.send("queHago=mostrarGrilla");
    http.onreadystatechange = () => {
        if (http.readyState == 4 && http.status == 200) {
            (<HTMLDivElement>document.getElementById("divGrilla")).innerHTML = http.responseText;
        }
    };
}

function loguear() : boolean{
    var http = new XMLHttpRequest();
    http.open("POST", "verificacion.php", true);
    http.setRequestHeader("content-type","application/x-www-form-urlencoded");
    http.send("usuario=logueado");
    var flag = false;
    alert("ASD");
    http.onreadystatechange = () => {
        if (http.readyState == 4 && http.status == 200) {
            if(http.responseText == "ok"){
                alert("resp:"+http.responseText);
                flag = true;
             }        }
    };
    alert(flag);
    return flag;
}
window.onload=function(){
    alert("ASDASDA");
    if(loguear()){
        mostrar();
    }
};