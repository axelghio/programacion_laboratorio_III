///<reference path="campera.ts"/>
namespace Test{
    export class Manejadora{
        public static AgregarCampera(){
            //#region Obtener datos
            let codigo : any = $("#txtCodigo").val();
            let nombre : any = $("#txtNombre").val();
            let precio : any = $("#txtPrecio").val();
            let talle : any = $("#txtTalle").val();
            let color : any = $("#cboColor").val();
            let foto : any = (<HTMLInputElement>document.getElementById("idFoto")); 
            let path : any = (<HTMLInputElement>document.getElementById("idFoto")).value; 
            let pathFoto : string = (path.split('\\'))[2];
            //#endregion

            let campera = new Entidades.Campera(codigo, nombre, precio, talle, color, pathFoto);

            let form = new FormData();
            form.append("cadenaJson",JSON.stringify(campera.camperaToJSON()));

            if(localStorage.getItem("modificar") == "true"){
                form.append("caso", "modificar");
            }
            else{
            form.append("caso", "agregar");
            }

            //#region Subir Foto
            let formFoto = new FormData();
            formFoto.append("codigo", pathFoto);
            formFoto.append("caso", "subirFoto");
            formFoto.append("foto", foto.files[0]);
            let ajaxFoto = $.ajax({
             type: "POST",
             url: "./BACKEND/administrar.php",
             cache: false,
             contentType: false,
             processData : false,
             data: formFoto,
             dataType: "JSON"
            })
            ajaxFoto.done(function(response){
                if(response.Ok){
                    alert("Se guardo la foto");
                }
                else{
                    alert("No se pudo guardar la foto");
                }
            })
            //#endregion

            //#region ajax agregar
            let ajax = $.ajax({
                type: "POST",
                url: "./BACKEND/administrar.php",
                cache: false,
                contentType: false,
                processData : false,
                data: form,
                dataType: "JSON"
            });
            ajax.done(function(response){
                if(localStorage.getItem("modificar") == "true"){
                    if(response.TodoOK){
                        alert("Se modifico la campera");
                        $("#btnAgregar").val("Agregar");
                        Manejadora.MostrarCamperas();
                        $("#txtCodigo").prop("disabled", false);
                        localStorage.setItem("modificar","false");
                    }
                    else{
                        alert("No se modifico la campera");
                        console.log("No se modifico la campera");
                        $("#btnAgregar").val("Agregar");
                        $("#txtCodigo").prop("disabled", false);
                        localStorage.setItem("modificar","false");
                    }
                }
                else{
                    if(response.TodoOK){
                        alert("Se agrego la campera");
                    }
                    else{
                        alert("No se agrego la campera");
                    }
                }
            });
            //#endregion

            Manejadora.LimpiarForm();
        }

        public static MostrarCamperas(){
            let form = new FormData();
            form.append("caso","mostrar");
            let ajax = $.ajax({
                type: "POST",
                url: "./BACKEND/administrar.php",
                cache: false,
                contentType: false,
                processData : false,
                data: form,
                dataType: "JSON"
            })
            ajax.done(function (response){
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
                let lista = response;
               lista.forEach(function(campera:any){
                tabla+= "<tr>";
 
                tabla+= "<td>";
                tabla+= campera.codigo;
                tabla+= "</td>";

                tabla+= "<td>";
                tabla+= campera.nombre;
                tabla+= "</td>";

                tabla+= "<td>";
                tabla+= campera.precio;
                tabla+= "</td>";

                tabla+= "<td>";
                tabla+= campera.talle;
                tabla+= "</td>";

                tabla+= "<td>";
                tabla+= campera.color;
                tabla+= "</td>";

                tabla+="<td>";
                let path : string = campera.path ;
                tabla+="<img src='./BACKEND/fotos/" + path + "' width=70>";
                tabla+="</td>";
                tabla+="<td>";
                tabla+=`<input type='button' value='Modificar' class="btn btn-info" onclick='Test.Manejadora.ModificarCampera(${JSON.stringify(campera)})' /></br>`;
                tabla+=`<input type='button' value='Eliminar' class="btn btn-info" onclick='Test.Manejadora.EliminarCampera(${JSON.stringify(campera)})' />`;
                tabla+="</td>";
                tabla+="</tr>"; 
               });
                    
                tabla+="</table>";
                $("#divTabla").html(tabla);
            });
        }

        public static EliminarCampera(campera:any):void{
            if(confirm(`¿Desea eliminar ${campera.codigo}, ${campera.talle}?`)){
                let form = new FormData();
                form.append("cadenaJson",JSON.stringify(campera));
                form.append("caso","eliminar");
                let formFoto = new FormData();
                formFoto.append("caso","eliminarFoto");
                formFoto.append("codigo", campera.path);
                let ajaxFoto = $.ajax({
                    type: "POST",
                    url: "./BACKEND/administrar.php",
                    cache: false,
                    contentType: false,
                    processData : false,
                    data: formFoto,
                    dataType: "JSON"
                })
                ajaxFoto.done(function(resp){
                    if(resp.Ok){
                        alert("Se movio la foto");
                    }
                    else{
                        alert("No se movio la foto");
                    }
                })
                let ajax = $.ajax({
    
                    type: "POST",
                    url: "./BACKEND/administrar.php",
                    cache: false,
                    contentType: false,
                    processData : false,
                    data: form,
                    dataType: "JSON"
    
                })
                ajax.done(function(response){
                    if(response.TodoOK){
                        
                        alert("Se pudo eliminar");
                        Manejadora.MostrarCamperas();
                    }
                    else{
                        alert("No se pudo eliminar");
                    }
                
            });
            }
        }

        public static ModificarCampera(campera:any):void{
            $("#btnAgregar").val("Modificar");
            $("#txtCodigo").val(campera.codigo);
            $("#txtCodigo").prop("disabled", true);
            $("#txtNombre").val(campera.nombre);
            $("#txtPrecio").val(campera.precio);
            $("#txtTalle").val(campera.talle);
            $("#cboColor").val(campera.color);
            //$("#foto").val(campera.pathFoto);
            //$("#imgFoto").attr("src", `./BACKEND/fotos/${campera.pathFoto}`);
            let path = $("#foto").val();
            console.log(path);
            if(path == null){
                let form = new FormData();
                form.append("caso", "modificarFoto");
                form.append("codigo", campera.path);
                let ajaxFoto = $.ajax({
                    type: "POST",
                    url: "./BACKEND/administrar.php",
                    cache: false,
                    contentType: false,
                    processData : false,
                    data: form,
                    dataType: "JSON"
                   })
                ajaxFoto.done(function(response){
                       if(response.Ok){
                           alert("Se movio la foto");
                       }
                       else{
                           alert("No se pudo mover la foto");
                       }
                })                
            }
            localStorage.setItem("modificar", "true");
        }

        public static FiltrarCamperasPorColor(){
            let color = $("#cboColor").val();
            let form = new FormData();
            form.append("caso","mostrar");
            
            let ajax = $.ajax({

                type: "POST",
                url: "./BACKEND/administrar.php",
                cache: false,
                contentType: false,
                processData : false,
                data: form,
                dataType: "JSON"

            })
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
                for (let campera of response) {
                    if(campera.color === color){
                        tabla+= "<tr>";
 
                        tabla+= "<td>";
                        tabla+= campera.codigo;
                        tabla+= "</td>";
        
                        tabla+= "<td>";
                        tabla+= campera.nombre;
                        tabla+= "</td>";
        
                        tabla+= "<td>";
                        tabla+= campera.precio;
                        tabla+= "</td>";
        
                        tabla+= "<td>";
                        tabla+= campera.talle;
                        tabla+= "</td>";
        
                        tabla+= "<td>";
                        tabla+= campera.color;
                        tabla+= "</td>";
        
                        tabla+="<td>";
                        let img = new Image();
                        let path : string = campera.foto ;
                        img.src = "./BACKEND/fotos/"+ path; 
                        tabla+="<img src='./BACKEND/fotos/" + campera.foto + "' height=60 width=60 ></img>";
                        tabla+="</td>";
                        tabla+="<td>";
                        tabla+=`<input type='button' value='Modificar' class="btn btn-info" onclick='Test.Manejadora.ModificarCampera(${JSON.stringify(campera)})' /></br>`;
                        tabla+=`<input type='button' value='Eliminar' class="btn btn-info" onclick='Test.Manejadora.EliminarCampera(${JSON.stringify(campera)})' />`;
                        tabla+="</td>";
                        tabla+="</tr>"; 
                    }
                }
                tabla+="</table>";
                $("#divTabla").html(tabla);
            })
            Manejadora.LimpiarForm();
        }

        public static CargarColoresJSON(){
            let form = new FormData();
            form.append("caso","colores");
            let ajax = $.ajax({
                type: "POST",
                url: "./BACKEND/administrar.php",
                cache: false,
                contentType: false,
                processData : false,
                data: form,
                dataType: "JSON"
            })

            ajax.done(function(response){

                for(let i of response)
                {
                    $("#cboColor").append(`<option>${i.descripcion}</option>}`);
                }

            })
        }

        public static LimpiarForm(){
            $("#txtCodigo").val("");
            $("#txtNombre").val("");
            $("#txtPrecio").val("");
            $("#txtTalle").val("");
            $("#cboColor").val("Azul");
        }

    }
}