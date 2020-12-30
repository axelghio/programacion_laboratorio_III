/// <reference path="node_modules/@types/jquery/index.d.ts" />
///<reference path="perro.ts"/>

namespace PrimerParcial{
    export interface IParte2{
        EliminarPerro(perro:any):void;
        ModificarPerro(perro:any):void;
        ObtenerPerrosPorTamaño():void;
    }
    export interface IParte3{
        FiltrarPerrosPorRaza():void;
        CargarRazasJSON():void;
        AdministrarSpinner(flag:boolean):void;
    }
    export class Manejadora implements IParte2, IParte3{
        public static AgregarPerroJSON(){
            if(Manejadora.AdministrarValidaciones()){
            let tamaño : string =(<HTMLInputElement> document.getElementById("tamaño")).value;
            let edad : string =(<HTMLInputElement> document.getElementById("edad")).value;
            let precio : string =(<HTMLInputElement> document.getElementById("precio")).value;
            let nombre : string =(<HTMLInputElement> document.getElementById("nombre")).value;
            let raza : string = (<HTMLSelectElement> document.getElementById("raza")).value; 
            let foto : any = (<HTMLInputElement>document.getElementById("foto")); 
            let path : any = (<HTMLInputElement>document.getElementById("foto")).value; 

            let pathFoto : string = (path.split('\\'))[2];

            let perro = new Entidades.Perro(tamaño, parseInt(edad), parseFloat(precio), nombre, raza, pathFoto);
            
            let xhr = new XMLHttpRequest();
            let form = new FormData();
            form.append("foto",foto.files[0]);
            form.append("cadenaJson",JSON.stringify(perro.ToJSON()));

            let ajax = $.ajax({

                type: "POST",
                url: "./BACKEND/agregar_json.php",
                cache: false,
                contentType: false,
                processData : false,
                data: form,
                dataType: "JSON"

            })

            ajax.done(function(response){
                    if(response.Ok){
                        alert("Se guardo la foto");
                    }
                    else{
                        alert("No se guardo la foto");
                    }
                
            });
        }
        else{
            alert("Hay campos vacios");
        }

        }

        public static MostrarPerrosJSON(){
            let ajax = $.ajax({

                type: "POST",
                url: "./BACKEND/traer_json.php",
                cache: false,
                contentType: false,
                processData : false,
                dataType: "JSON"

            })

            ajax.done(function (response){
                let tabla:string ="";
                tabla+= "<table border=1>";
                tabla+= "<thead>";
                tabla+= "<tr>";
                tabla+= "<td>Tamaño</td>";
                tabla+= "<td>Edad</td>";
                tabla+= "<td>Precio</td>";
                tabla+= "<td>Nombre</td>";
                tabla+= "<td>Raza</td>";
                tabla+= "<td>Foto</td>";
                tabla+= "</tr>";
                tabla+= "</thead>";
                let lista = response;
               lista.forEach(function(perro:any){
                tabla+= "<tr>";
 
                tabla+= "<td>";
                tabla+= perro.tamanio;
                tabla+= "</td>";

                tabla+= "<td>";
                tabla+= perro.edad;
                tabla+= "</td>";

                tabla+= "<td>";
                tabla+= perro.precio;
                tabla+= "</td>";

                tabla+= "<td>";
                tabla+= perro.nombre;
                tabla+= "</td>";

                tabla+= "<td>";
                tabla+= perro.raza;
                tabla+= "</td>";

                tabla+="<td>";
                let img = new Image();
                let path : string = perro.pathFoto ;
                img.src = "./BACKEND/fotos/"+ path; 
                tabla+="<img src='./BACKEND/fotos/" + perro.pathFoto + "' height=100 width=100 ></img>";
                tabla+="</td>";
                tabla+="</tr>"; 
               });
                    
                tabla+="</table>";
                $("#divTabla").html(tabla);
            });
        }

        public static AgregarPerroEnBaseDatos(){
            if(Manejadora.AdministrarValidaciones()){
                let tamaño : string =(<HTMLInputElement> document.getElementById("tamaño")).value;
                let edad : string =(<HTMLInputElement> document.getElementById("edad")).value;
                let precio : string =(<HTMLInputElement> document.getElementById("precio")).value;
                let nombre : string =(<HTMLInputElement> document.getElementById("nombre")).value;
                let raza : string = (<HTMLSelectElement> document.getElementById("raza")).value; 
                let foto : any = (<HTMLInputElement>document.getElementById("foto")); 
                let path : any = (<HTMLInputElement>document.getElementById("foto")).value; 

                let pathFoto : string = (path.split('\\'))[2];

                let perro = new Entidades.Perro(tamaño, parseInt(edad), parseFloat(precio), nombre, raza, pathFoto);
                
                let form = new FormData();
                form.append("foto",foto.files[0]);
                form.append("cadenaJson",JSON.stringify(perro.ToJSON()));

                let backend = "./BACKEND/agregar_bd.php";
                if(localStorage.getItem("modificar")){
                    backend = "./BACKEND/modificar_bd.php";
                }
                let ajax = $.ajax({

                    type: "POST",
                    url: backend,
                    cache: false,
                    contentType: false,
                    processData : false,
                    data: form,
                    dataType: "JSON"

                })
                ajax.done(function(response){
                    if(localStorage.getItem("modificar")){
                        if(response.Ok){
                            alert("Se modifico el perro");
                            (<HTMLInputElement> document.getElementById("btnAgregarBd")).value = "Agregar en BD";
                            Manejadora.MostrarPerrosBaseDatos();
                            $("#precio").prop("disabled", false);

                        }
                        else{
                            alert("No se modifico el perro");
                            console.log("No se modifico el perro");
                            (<HTMLInputElement> document.getElementById("btnAgregarBd")).value = "Agregar en BD";
                            $("#precio").prop("disabled", false);
                        }
                    }
                    else{
                        if(response.Ok){
                            alert("Se guardo la foto");
                        }
                        else{
                            alert("No se guardo la foto");
                        }
                    }
                
                })
                localStorage.removeItem("modificar");
            }
            else{
                alert("Hay errores en los campos");
            }
        }

        public static VerificarExistencia(){
            let edad : string =(<HTMLInputElement> document.getElementById("edad")).value;
            let raza : string = (<HTMLSelectElement> document.getElementById("raza")).value; 
            let ajax = $.ajax({

                type: "POST",
                url: "./BACKEND/traer_bd.php",
                cache: false,
                contentType: false,
                processData : false,
                dataType: "JSON"

            })
            ajax.done(function(response){
                let lista = response
                let flag = false;
                lista.forEach(function(perrito:any) {
                    if(perrito.edad == edad && perrito.raza == raza){
                        flag = true;
                        alert("Ya existe ese perro");
                        console.log("Ya existe ese perro");
                        return;
                    }
                });
                if(!flag){
                    Manejadora.AgregarPerroEnBaseDatos();
                    alert("Se agrego correctamente");
                }
            })
        }

        public static MostrarPerrosBaseDatos(){
            let ajax = $.ajax({

                type: "POST",
                url: "./BACKEND/traer_bd.php",
                cache: false,
                contentType: false,
                processData : false,
                dataType: "JSON"

            })
            new Manejadora().AdministrarSpinner(true);
            
            ajax.done(function (response){
                let tabla:string ="";
                tabla+= "<table border=1>";
                tabla+= "<thead>";
                tabla+= "<tr>";
                //if($("#chxNombre").prop("checked"))
                tabla+= "<td>Tamaño</td>";
                tabla+= "<td>Edad</td>";
                tabla+= "<td>Precio</td>";
                tabla+= "<td>Nombre</td>";
                tabla+= "<td>Raza</td>";
                tabla+= "<td>Foto</td>";
                tabla+= "</tr>";
                tabla+= "</thead>";
                let lista = response;
               lista.forEach(function(perro:any){
                tabla+= "<tr>";
 
                tabla+= "<td>";
                tabla+= perro.tamanio;
                tabla+= "</td>";

                tabla+= "<td>";
                tabla+= perro.edad;
                tabla+= "</td>";

                tabla+= "<td>";
                tabla+= perro.precio;
                tabla+= "</td>";

                tabla+= "<td>";
                tabla+= perro.nombre;
                tabla+= "</td>";

                tabla+= "<td>";
                tabla+= perro.raza;
                tabla+= "</td>";

                tabla+="<td>";
                let pathFinal = "./BACKEND/fotos/"+ perro.pathFoto ;
                if(perro.pathFoto.indexOf("MODIFICADA") != -1){
                    pathFinal = "./BACKEND/fotos_modificadas/"+ perro.pathFoto;
                }
                tabla+=`<img src='${pathFinal}' height=100 width=100 ></img>`;
                tabla+="</td>";
                tabla+="<td>";
                tabla+=`<input type='button' value='Modificar' class='btn btn-warning' onclick='new PrimerParcial.Manejadora().ModificarPerro(${JSON.stringify(perro)})' /></br>`;
                tabla+=`<input type='button' value='Eliminar' class='btn btn-warning' onclick='new PrimerParcial.Manejadora().EliminarPerro(${JSON.stringify(perro)})' />`;
                tabla+="</td>";
                tabla+="</tr>"; 
               });
                    
                tabla+="</table>";
                $("#divTabla").html(tabla);
                new Manejadora().AdministrarSpinner(false);
            });
        }

        EliminarPerro(perro: any): void {
            let form = new FormData();
            form.append("cadenaJson",JSON.stringify(perro));
            let ajax = $.ajax({

                type: "POST",
                url: "./BACKEND/traer_bd.php",
                cache: false,
                contentType: false,
                processData : false,
                dataType: "JSON"

            })
            ajax.done(function (response){
                for (let perrito of response) {
                    if(perrito.nombre == perro.nombre && perrito.raza == perro.raza){
                        if(confirm(`¿Seguro desea eliminar a ${perro.nombre} ${perro.raza}?`)){
                           let eliminar = $.ajax({
                                type: "POST",
                                url: "./BACKEND/eliminar_bd.php",
                                cache: false,
                                contentType: false,
                                processData : false,
                                data : form,
                                dataType: "JSON"
                            });
                            eliminar.done(function(rsp){
                                if(!rsp.Ok){
                                    alert("Se ha eliminado el perro");
                                    PrimerParcial.Manejadora.MostrarPerrosBaseDatos();
                                }
                                else{
                                    alert("No se ha eliminado el perro");
                                }
                            });
                        }
                        break;
                    }
                }
            });            
        }
        ModificarPerro(perro: any): void {
            (<HTMLInputElement> document.getElementById("btnAgregarBd")).value = "ModificarBd";
            $("#precio").prop("disabled", true);
            $("#raza").val(perro.raza);
            $("#nombre").val(perro.nombre);
            $("#precio").val(perro.precio);
            $("#edad").val(perro.edad);
            $("#tamaño").val(perro.tamanio);
            //$("#foto").val(perro.pathFoto);
            
            localStorage.setItem("modificar", "true");
        }

        ObtenerPerrosPorTamaño(): void {
            let ajax = $.ajax({

                type: "POST",
                url: "./BACKEND/traer_bd.php",
                cache: false,
                contentType: false,
                processData : false,
                dataType: "JSON"

            })
            ajax.done(function (response){
               let chico = 0;
               let mediano = 0;
               let grande = 0;

                for (let perrito of response) {
                    perrito.tamanio.toLowerCase();
                    if(perrito.tamanio == "chico"){
                        chico++;
                    }
                    else if(perrito.tamanio == "mediano"){
                        mediano++;
                    }
                    else if(perrito.tamanio == "grande"){
                        grande++;
                    }
                }

                let max = chico;
                let min = chico;
                let maxTamaño = "chico";
                let minTamaño = "chico";

                if(mediano > max){
                    max = mediano;
                    maxTamaño = "mediano";
                }
                else if(mediano == max){
                    maxTamaño+= ", mediano";
                }
            
                if(grande > max){
                    max = grande;
                    maxTamaño = "grande"
                }
                else if(grande == max){
                    maxTamaño+= ", grande";
                }

                if(mediano < min){
                    min = mediano;
                    minTamaño = "mediano";
                }
                else if(mediano == min){
                    minTamaño+= ", mediano";
                }
                
                if(grande < min){
                    min = grande;
                    minTamaño = "grande";
                }
                else if(grande == min){
                    minTamaño+= ", grande";
                }

                console.log(`La mayor cantidad es ${maxTamaño} con ${max} perros.`);
                console.log(`La menor cantidad es ${minTamaño} con ${min} perros.`);

            });
        }

        FiltrarPerrosPorRaza(): void {
           let raza = $("#raza").val();

           let ajax = $.ajax({

            type: "POST",
            url: "./BACKEND/traer_bd.php",
            cache: false,
            contentType: false,
            processData : false,
            dataType: "JSON"
            })
            ajax.done(function(response){
                let tabla:string ="<table border=1>"+
                        "<thead><tr><td>Tamaño</td><td>Edad</td><td>Precio</td><td>Nombre</td><td>Raza</td><td>Foto</td></tr></thead>";
                for (let perro of response) {
                    if(perro.raza == raza){
                        tabla+= `<tr><td>${perro.tamanio}</td>`;
                        tabla+= `<td>${perro.edad}</td>`;
                        tabla+= `<td>${perro.precio}</td>`;
                        tabla+= `<td>${perro.nombre}</td>`;
                        tabla+= `<td>${perro.raza}</td>`;

                        tabla+="<td>";
                        let pathFinal = "./BACKEND/fotos/"+ perro.pathFoto ;
                        if(perro.pathFoto.indexOf("MODIFICADA") != -1){
                            pathFinal = "./BACKEND/fotos_modificadas/"+ perro.pathFoto;
                        }
                        tabla+=`<img src='${pathFinal}' height=100 width=100 ></img>`;
                        tabla+="</td>";
                        tabla+="<td>";
                        tabla+=`<input type='button' value='Modificar' class='btn btn-warning' onclick='new PrimerParcial.Manejadora().ModificarPerro(${JSON.stringify(perro)})' /></br>`;
                        tabla+=`<input type='button' value='Eliminar' class='btn btn-warning' onclick='new PrimerParcial.Manejadora().EliminarPerro(${JSON.stringify(perro)})' />`;
                        tabla+="</td></tr>";
                    }
                }
                tabla+="</table>";
                $("#divTabla").html(tabla);
            });
        }
        
        CargarRazasJSON(): void {
            let ajax = $.ajax({

                type: "POST",
                url: "./BACKEND/cargar_raza.php",
                cache: false,
                contentType: false,
                processData : false,
                dataType: "JSON"
                })
                new Manejadora().AdministrarSpinner(true);
            ajax.done(function(response){
                let cboRaza =  (<HTMLSelectElement>document.getElementById('raza'));
                for (let i of response) {
                  cboRaza.innerHTML += `<option>${i.descripcion}</option>`;
                }
            })
        }
        AdministrarSpinner(flag:boolean): void {
            setTimeout(() => 
            {
                if (!flag) 
                {
                    (<HTMLImageElement>document.getElementById('imgSpinner')).setAttribute('src', '');
                }
            }, 1000);
            if (flag)
                (<HTMLImageElement>document.getElementById('imgSpinner')).setAttribute('src', './BACKEND/gif-load.gif');
        } 

        public static AdministrarValidaciones(){
            let todoOk:boolean = false;
            let todosLosCamposCompletos:boolean = true;
            let numeroValido:boolean = false;
            let tipoValido:boolean = false;
            let ids:string[] = ["tamaño", "edad", "precio", "nombre", "raza"];
            let tipos:string[] = ["salchicha", "chihuahua", "pitbull", "caniche", "ovejero", "Salchicha", "Perro", "Ovejero", "Boxer", "Caniche toy", "Chihuahua"];
            for (let index = 0; index < ids.length; index++) 
            {
                if(this.ValidarCamposVacios(ids[index]))
                {
                    (<HTMLSpanElement>(<HTMLSpanElement>document.getElementById(ids[index])).nextElementSibling).style.display="none";
                }
                else
                {
                    todosLosCamposCompletos = false;
                    (<HTMLSpanElement>(<HTMLSpanElement>document.getElementById(ids[index])).nextElementSibling).style.display="inline";
                }               
            }
            numeroValido = this.ValidarEdad(parseInt((<HTMLInputElement>document.getElementById("edad")).value));
            tipoValido = this.ValidarRaza((<HTMLInputElement>document.getElementById("raza")).value, tipos);
            if(!numeroValido)
            {
                (<HTMLSpanElement>(<HTMLSpanElement>document.getElementById("edad")).nextElementSibling).style.display="inline";
            }
            if(!tipoValido)
            {
                (<HTMLSpanElement>(<HTMLSpanElement>document.getElementById("raza")).nextElementSibling).style.display="inline";
            }
            if(todosLosCamposCompletos && numeroValido && tipoValido)
            {
                todoOk = true;
            }
            return todoOk;
        }

        public static ValidarCamposVacios(aux:string):boolean{
            let flag = false;
            if($(`#${aux}`).val() != ""){
                flag = true;
            }

            return flag;
        }

        public static ValidarRaza(valor:string, permitidos:any[]):boolean{
            let flag = false;
            for (let raza of permitidos) {
                if(valor === raza){
                    flag = true;
                    break;
                }
            }

            return flag;
        }

        public static ValidarEdad(edad:number):boolean{
            let flag = false;
            if(edad >= 0 && edad < 18){
                flag = true;
            }

            return flag;
        }
             

    }
}