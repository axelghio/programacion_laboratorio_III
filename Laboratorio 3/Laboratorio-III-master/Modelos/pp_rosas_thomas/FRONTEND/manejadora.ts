///<reference path="televisor.ts"/>
namespace PrimerParcial{
    export class Manejadora{
        public static AgregarTelevisor(){
            let codigo : any = $("#codigo").val();
            let marca : any = $("#marca").val();
            let precio : any = $("#precio").val();
            let tipo : any = $("#tipo").val();
            let paisOrigen : any = $("#pais").val();
            let foto : any = (<HTMLInputElement>document.getElementById("foto")); 
            let path : any = (<HTMLInputElement>document.getElementById("foto")).value; 

            let pathFoto : string = (path.split('\\'))[2];

            let tele = new Entidades.Televisor(codigo, marca, precio, tipo, paisOrigen, pathFoto);

            let form = new FormData();
            form.append("foto",foto.files[0]);
            form.append("cadenaJson",JSON.stringify(tele.ToJSON()));
            if(localStorage.getItem("modificar")){
                form.append("caso", "modificar");
            }
            else{
                form.append("caso", "agregar");
            }

            let ajax = $.ajax({
                type: "POST",
                url: "./BACKEND/administrar.php",
                cache: false,
                contentType: false,
                processData : false,
                data: form,
                dataType: "JSON"
            });
            Manejadora.AdministrarSpinner(true);
            ajax.done(function(response){
                if(localStorage.getItem("modificar")){
                    if(response.TodoOK){
                        Manejadora.AdministrarSpinner(false);
                        alert("Se modifico el alien");
                       $("#btn-agregar").val("Agregar");
                       Manejadora.GuardarEnLocalStorage();
                        Manejadora.MostrarTelevisores();
                        $("#codigo").prop("disabled", false);

                    }
                    else{
                        Manejadora.AdministrarSpinner(false);
                        alert("No se modifico el alien");
                        console.log("No se modifico el alien");
                        $("#btn-agregar").val("Agregar");
                        $("#codigo").prop("disabled", false);
                    }
                    localStorage.setItem("modificar", "false");
                }
                else{    
                    if(response.TodoOK){
                        Manejadora.AdministrarSpinner(false);
                        alert("Se agrego el televisor");   
                        if(localStorage.getItem("refreshLocalStorage") == "true"){
                            Manejadora.GuardarEnLocalStorage();
                        }                
                    }
                    else{
                        Manejadora.AdministrarSpinner(false);
                        alert("No se agrego el televisor");
                    }
                }
            });
            Manejadora.LimpiarForm();
        }

        public static MostrarTelevisores(){
            let form = new FormData();
            form.append("caso","traer");
            let ajax = $.ajax({

                type: "POST",
                url: "./BACKEND/administrar.php",
                cache: false,
                contentType: false,
                processData : false,
                data: form,
                dataType: "JSON"

            })
            Manejadora.AdministrarSpinner(true);
            ajax.done(function (response){
                let tabla:string ="";
                tabla+= "<table border=1> <thead> <tr>";
                tabla+= "<td>Codigo</td> <td>Marca</td> <td>Precio</td> <td>Tipo</td> <td>PaisOrigen</td> <td>Foto</td>";
                tabla+= "</tr> </thead>";
                let lista = response;
               lista.forEach(function(tele:any){
                tabla+= `<tr><td> ${tele.codigo} </td>`;
                tabla+= `<td> ${tele.marca} </td>`;
                tabla+= `<td> ${tele.precio} </td>`;
                tabla+= `<td> ${tele.tipo} </td>`;
                tabla+= `<td> ${tele.paisOrigen} </td>`;

                tabla+="<td>";
                let path : string = tele.pathFoto ;
                tabla+="<img src='./BACKEND/fotos/" + tele.pathFoto + "' height=60 width=60>";
                tabla+="</td>";
                tabla+="<td>";
                tabla+=`<input type='button' value='Modificar' class="btn btn-info" onclick='PrimerParcial.Manejadora.ModificarTelevisor(${JSON.stringify(tele)})'></br>`;
                tabla+=`<input type='button' value='Eliminar' class="btn btn-warning" onclick='PrimerParcial.Manejadora.EliminarTelevisor(${JSON.stringify(tele)})'>`;
                tabla+="</td></tr>";
               });
                    
                tabla+="</table>";
                Manejadora.AdministrarSpinner(false);
                $("#divTabla").html(tabla);
            });
        }

        public static GuardarEnLocalStorage(){
            let form = new FormData();
            form.append("caso","traer");
            let ajax = $.ajax({
                type: "POST",
                url: "./BACKEND/administrar.php",
                cache: false,
                contentType: false,
                processData : false,
                data: form,
                dataType: "JSON"
            });
            Manejadora.AdministrarSpinner(true);
            ajax.done(function(response){
                Manejadora.AdministrarSpinner(false);
                localStorage.setItem("televisores_local_storage", JSON.stringify(response));

            });
        }

        public static VerificarExistencia(){
            let codigo : any = $("#codigo").val();

            let listado = JSON.parse(localStorage.getItem("televisores_local_storage") as string);
            let flag = false;
            for (let tele of listado) {
                if(tele.codigo == codigo){
                    flag = true;
                    alert("El televisor ya existe");
                    console.log("El televisor ya existe");
                    break;
                }
            }
    
            if(!flag){
                localStorage.setItem("refreshLocalStorage", "true");
                Manejadora.AgregarTelevisor();
            }
        }

        public static EliminarTelevisor(tele:any){
            if(confirm(`¿Desea eliminar ${tele.codigo}, ${tele.tipo}?`)){
                let form = new FormData();
                form.append("cadenaJson",JSON.stringify(tele));
                form.append("caso","eliminar");
                let ajax = $.ajax({
    
                    type: "POST",
                    url: "./BACKEND/administrar.php",
                    cache: false,
                    contentType: false,
                    processData : false,
                    data: form,
                    dataType: "JSON"
    
                })
                Manejadora.AdministrarSpinner(true);
                ajax.done(function(response){
                    if(response.TodoOK){
                        Manejadora.AdministrarSpinner(false);
                        alert("Se pudo eliminar");
                        Manejadora.GuardarEnLocalStorage();
                        Manejadora.MostrarTelevisores();
                    }
                    else{
                        alert("No se pudo eliminar");
                    }
                
            });
            }
        }

        public static ModificarTelevisor(tele:any){
            $("#btn-agregar").val("Modificar");
            $("#codigo").val(tele.codigo);
            $("#codigo").prop("disabled", true);
            $("#marca").val(tele.marca);
            $("#precio").val(tele.precio);
            $("#tipo").val(tele.tipo);
            $("#pais").val(tele.paisOrigen);
            $("#CboPlaneta").val(tele.planetaOrigen);
            //$("#foto").val(alien.pathFoto);
            $("#imgFoto").attr("src", `./BACKEND/fotos/${tele.pathFoto}`);

            localStorage.setItem("modificar", "true");
        }

        public static FiltrarTelevisoresPorPais(){
            let pais = $("#pais").val();
            let form = new FormData();
            form.append("caso","traer");
            
            let ajax = $.ajax({

                type: "POST",
                url: "./BACKEND/administrar.php",
                cache: false,
                contentType: false,
                processData : false,
                data: form,
                dataType: "JSON"

            })           
            Manejadora.AdministrarSpinner(true);
            ajax.done(function(response){
                let tabla:string ="";
                tabla+= "<table border=1>";
                tabla+= "<thead>";
                tabla+= "<tr>";
                tabla+= "<td>Codigo</td>";
                tabla+= "<td>Nombre</td>";
                tabla+= "<td>Precio</td>";
                tabla+= "<td>Talle</td>";
                tabla+= "<td>Color</td>";
                tabla+= "<td>Foto</td>";
                tabla+= "</tr>";
                tabla+= "</thead>";
                for (let tele of response) {
                    if(tele.paisOrigen === pais){
                        tabla+= "<tr>";
 
                        tabla+= "<td>";
                        tabla+= tele.codigo;
                        tabla+= "</td>";
        
                        tabla+= "<td>";
                        tabla+= tele.marca;
                        tabla+= "</td>";
        
                        tabla+= "<td>";
                        tabla+= tele.precio;
                        tabla+= "</td>";
        
                        tabla+= "<td>";
                        tabla+= tele.tipo;
                        tabla+= "</td>";
        
                        tabla+= "<td>";
                        tabla+= tele.paisOrigen;
                        tabla+= "</td>";
        
                        tabla+="<td>";
                        let path : string = tele.pathFoto ;
                        tabla+="<img src='./BACKEND/fotos/" + tele.pathFoto + "' height=60 width=60>";
                        tabla+="</td>";
                        tabla+="<td>";
                        tabla+=`<input type='button' value='Modificar' class="btn btn-info" onclick='PrimerParcial.Manejadora.ModificarTelevisor(${JSON.stringify(tele)})' /></br>`;
                        tabla+=`<input type='button' value='Eliminar' class="btn btn-warning" onclick='PrimerParcial.Manejadora.EliminarTelevisor(${JSON.stringify(tele)})' />`;
                        tabla+="</td>";
                        tabla+="</tr>"; 
                    }
                }
                tabla+="</table>";
                Manejadora.AdministrarSpinner(false);
                $("#divTabla").html(tabla);
            })
            Manejadora.LimpiarForm();
        }

        public static CargarPaisesJSON(){
            if($("#pais option").length == 3){
                let form = new FormData();
                form.append("caso","paises");
                let ajax = $.ajax({
                    type: "POST",
                    url: "./BACKEND/administrar.php",
                    cache: false,
                    contentType: false,
                    processData : false,
                    data: form,
                    dataType: "JSON"
                })
                Manejadora.AdministrarSpinner(true);
                ajax.done(function(response){
                    for(let i of response)
                    {        
                        $("#pais").append(`<option>${i.descripcion}</option>}`);                                                         
                    }   
                    Manejadora.AdministrarSpinner(false);
                })
            }
            else{
                console.log("Los paises ya estan cargados");
            }
        }

        public static LimpiarForm(){
            $("#codigo").val("");
            $("#marca").val("");
            $("#precio").val("");
            $("#tipo").val("");
            $("#pais").val("Argentina");
            $("#foto").val("");
            $("#imgFoto").attr("src", `./BACKEND/fotos/tv_defecto.jpg`);
        }

        public static AdministrarSpinner(flag:boolean): void {
            let gif : string = "./BACKEND/gif-load.gif";
            let div = <HTMLDivElement> document.getElementById("divSpinner");
            let img = <HTMLImageElement> document.getElementById("imgSpinner");
        
            if(flag){
                div.style.display = "block";
                div.style.top = "50%";
                div.style.left = "45%"
                img.src = gif;
            }
            else{
                div.style.display = "none";
                img.src = "";
            }
        } 
    }
}
