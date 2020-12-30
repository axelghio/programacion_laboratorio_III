function mostrar(){

    let http = new XMLHttpRequest();
    http.open("POST", "./admin.php", true);
    //http.setRequestHeader("content-type","application/x-www-form-urlencoded");
    http.send();
    http.onreadystatechange = () => {
        if (http.readyState == 4 && http.status == 200) {
            let lis_autos : any[] = JSON.parse(http.responseText);
            var tabla :string= "<table border=2> <tr><td>Id</td><td>Nombre</td><td>Apellido</td><td>Perfil</td><td>Estado</td><td>Acciones</td></tr>";

            for(var i = 0; i<lis_autos.length ; i++){
                //console.log(lis_autos[i]);
                tabla+="<tr>" +
                "<td>"+lis_autos[i].Id+"</td>"+
                "<td>"+lis_autos[i].Marca+"</td>"+
                "<td>"+lis_autos[i].Precio+"</td>"+
                "<td>"+lis_autos[i].Color+"</td>"+
                "<td>"+lis_autos[i].Modelo+"</td>"+
                "<td><input type='button' value='Ver auto' onclick='verAuto("+JSON.stringify(lis_autos[i])+")'>"+
                "</tr>";
            }
            tabla+= "</table>";
            document.write(tabla);
        }
    }
}
function verAuto(auto:any){
    console.log(auto);
}
window.onload=function(){
    mostrar();
};