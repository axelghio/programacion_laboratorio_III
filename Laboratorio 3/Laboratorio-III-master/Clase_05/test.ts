function mostrar(obj:any){
    var http = new XMLHttpRequest();
    http.open("POST", "./JSON_test.php", true);
    http.setRequestHeader("content-type","application/x-www-form-urlencoded");
    http.send("producto="+JSON.stringify(obj));
    http.onreadystatechange = () => {
        if (http.readyState == 4 && http.status == 200) {
            alert(http.responseText);
        }
    }
}

window.onload=function(){
    var obj={"codigo_barra":"ABC123","precio":257.33,"nombre":"tomate"};
    mostrar(obj);
};