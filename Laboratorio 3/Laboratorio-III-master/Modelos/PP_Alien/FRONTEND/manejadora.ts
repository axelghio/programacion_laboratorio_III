/// <reference path="node_modules/@types/jquery/index.d.ts" />
///<reference path="alien.ts"/>
namespace RecuperatorioPrimerParcial{
    interface IParte2{
        EliminarAlien(alien:any):void;
        ModificarAlien(alien:any):void;
    }
    export class Manejadora implements IParte2{
        public static AgregarAlien(refreshLocalStorage:boolean = false){
            let cuadrante : any = $("#cuadrante").val();
            let edad : any = $("#edad").val();
            let altura : any = $("#altura").val();
            let raza : any = $("#raza").val();
            let planetaOrigen : any = $("#cboPlaneta").val();
            let foto : any = (<HTMLInputElement>document.getElementById("foto")); 
            let path : any = (<HTMLInputElement>document.getElementById("foto")).value; 

            let pathFoto : string = (path.split('\\'))[2];

            let alien = new Entidades.Alien(cuadrante, parseInt(edad), parseFloat(altura), raza, planetaOrigen, pathFoto);

            let form = new FormData();
            form.append("foto",foto.files[0]);
            form.append("cadenaJson",JSON.stringify(alien.ToJSON()));
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

            })

            ajax.done(function(response){
                if(localStorage.getItem("modificar")){
                    if(response.TodoOK){
                        alert("Se modifico el alien");
                       $("#btn-agregar").val("Agregar");
                       Manejadora.GuardarEnLocalStorage();
                        Manejadora.MostrarAliens();
                        $("#cuadrante").prop("disabled", false);

                    }
                    else{
                        alert("No se modifico el alien");
                        console.log("No se modifico el alien");
                        $("#btn-agregar").val("Agregar");
                        $("#cuadrante").prop("disabled", false);
                    }
                    localStorage.setItem("modificar", "false");
                }
                else{
                    if(response.TodoOK){
                        alert("Se guardo la foto");
                        if(refreshLocalStorage){
                            Manejadora.GuardarEnLocalStorage();
                        }
                    }
                    else{
                        alert("No se guardo la foto");
                    }
                }
                
            });
        }

        public static MostrarAliens(){
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
            ajax.done(function (response){
                let tabla:string ="";
                tabla+= "<table border=1>";
                tabla+= "<thead>";
                tabla+= "<tr>";
                tabla+= "<td>Cuadrante</td>";
                tabla+= "<td>Edad</td>";
                tabla+= "<td>Altura</td>";
                tabla+= "<td>Raza</td>";
                tabla+= "<td>PlanetaOrigen</td>";
                tabla+= "<td>Foto</td>";
                tabla+= "</tr>";
                tabla+= "</thead>";
                let lista = response;
               lista.forEach(function(alien:any){
                tabla+= "<tr>";
 
                tabla+= "<td>";
                tabla+= alien.cuadrante;
                tabla+= "</td>";

                tabla+= "<td>";
                tabla+= alien.edad;
                tabla+= "</td>";

                tabla+= "<td>";
                tabla+= alien.altura;
                tabla+= "</td>";

                tabla+= "<td>";
                tabla+= alien.raza;
                tabla+= "</td>";

                tabla+= "<td>";
                tabla+= alien.planetaOrigen;
                tabla+= "</td>";

                tabla+="<td>";
                let img = new Image();
                let path : string = alien.pathFoto ;
                img.src = "./BACKEND/fotos/"+ path; 
                tabla+="<img src='./BACKEND/fotos/" + alien.pathFoto + "' height=60 width=60 ></img>";
                tabla+="</td>";
                tabla+="<td>";
                tabla+=`<input type='button' value='Modificar' class="btn btn-info" onclick='new RecuperatorioPrimerParcial.Manejadora().ModificarAlien(${JSON.stringify(alien)})' /></br>`;
                tabla+=`<input type='button' value='Eliminar' class="btn btn-info" onclick='new RecuperatorioPrimerParcial.Manejadora().EliminarAlien(${JSON.stringify(alien)})' />`;
                tabla+="</td>";
                tabla+="</tr>"; 
               });
                    
                tabla+="</table>";
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
            ajax.done(function(response){

                    localStorage.setItem("aliens_local_storage", JSON.stringify(response));

            });
        }

        public static VerificarExistencia(){
            let cuadrante : any = $("#cuadrante").val();
            let raza : any = $("#raza").val();

            let listado = JSON.parse(localStorage.getItem("aliens_local_storage") as string);
            let flag = false;
            for (let alien of listado) {
                if(alien.cuadrante == cuadrante && alien.raza == raza){
                    flag = true;
                    alert("El alien ya existe");
                    console.log("El alien ya existe");
                    break;
                }
            }
    
            if(!flag){
                Manejadora.AgregarAlien(true);
            }
        }

        public static ObtenerAliensPorCuadrante(){
            let aliens = JSON.parse(localStorage.getItem("aliens_local_storage") as string);
            let contadores = [];

            for(let datos of aliens)
            {
                if(contadores[datos.cuadrante] === undefined)
                {
                    contadores.push(datos.cuadrante);
                    contadores[datos.cuadrante] = 0;
                }

                contadores[datos.cuadrante]++;

            }

            let max = undefined;
            let min = undefined;


            for(let datos of contadores)
            {
                if(max === undefined && min === undefined)
                {
                    max = contadores[datos];
                    min = contadores[datos];
                }

                break;
            }

            console.log(max);
            console.log(min);

            let maxStr = `El/Los cuadrantes con ${max} aliens es/son: `;
            let minStr = `El/Los cuadrantes con ${min} aliens es/son: `;

            for(let planeta of contadores)
            {
                if(contadores[planeta] > max)
                {
                    max = contadores[planeta];
                }
                else if(contadores[planeta] < min)
                {
                    min = contadores[planeta];
                }
            }

            for(let planetas of contadores)
            {
                if(contadores[planetas] == max)
                {
                    maxStr += planetas + "\n";
                }

                if(contadores[planetas] == min)
                {
                    minStr += planetas + "\n";
                }
            }

            console.log(maxStr);
            console.log(minStr);
        }

        EliminarAlien(alien:any): void {
            if(confirm(`¿Desea eliminar ${alien.cuadrante}, ${alien.raza}?`)){
                let form = new FormData();
                form.append("cadenaJson",JSON.stringify(alien));
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
                ajax.done(function(response){
                    if(response.TodoOK){
                        alert("Se pudo eliminar");
                        Manejadora.GuardarEnLocalStorage();
                        Manejadora.MostrarAliens();
                    }
                    else{
                        alert("No se pudo eliminar");
                    }
                
            });
            }
            
        }
        ModificarAlien(alien:any): void {
            $("#btn-agregar").val("Modificar");
            $("#cuadrante").val(alien.cuadrante);
            $("#cuadrante").prop("disabled", true);
            $("#raza").val(alien.raza);
            $("#edad").val(alien.edad);
            $("#altura").val(alien.altura);
            $("#CboPlaneta").val(alien.planetaOrigen);
            //$("#foto").val(alien.pathFoto);
            $("#imgFoto").attr("src", `./BACKEND/fotos/${alien.pathFoto}`);

            localStorage.setItem("modificar", "true");
        }
    }
}