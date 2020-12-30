/// <reference path="node_modules/@types/jquery/index.d.ts" />
///<reference path="Ciudadano.ts"/>

namespace Entidades
{
    export class Manejadora
    {
        public static AgregarCiudadano()
        {
            let nombre : string =(<HTMLInputElement> document.getElementById("txtNombre")).value;
            let edad : string =(<HTMLInputElement> document.getElementById("txtEdad")).value;
            let apellido : string =(<HTMLInputElement> document.getElementById("txtApellido")).value;
            let dni : string =(<HTMLInputElement> document.getElementById("txtDni")).value;
            let pais : string = (<HTMLSelectElement> document.getElementById("cboPais")).value;
            let foto : any = (<HTMLInputElement> document.getElementById("foto"));
            let path : string = (<HTMLInputElement> document.getElementById("foto")).value;
            let pathModificado : string = (path.split('\\'))[2];
            
            let ciudadano = new Entidades.Ciudadano(parseInt(dni),pais,pathModificado,nombre,apellido,parseInt(edad));
            let accion = "";
            let form : FormData = new FormData();

            form.append("foto",foto.files[0]);
            form.append("obJSON", JSON.stringify(ciudadano.personaToJSON()));
            let valorStorage = localStorage.getItem("modificar");
            let valorBtn = $("#btnCargar").val();

            if(valorStorage != "true")
            {
                if(valorBtn == "Agregar")
                {
                    accion = "agregar";
                    form.append("accion", accion);

                    let ajax = $.ajax({

                        type: "POST",
                        url: "../BACKEND/nexo.php",
                        cache: false,
                        contentType: false,
                        processData : false,
                        data: form,
                        dataType: "text"

                    })

                    ajax.done(function(respuesta){

                        console.log(respuesta);
                        if(respuesta == "1")
                        {
                            alert("se ha guardado el ciudadano");
                        }
                        else
                        {
                            alert("no se ha podido guardar el ciudadano");
                        }
                        
                    })

                    ajax.fail(function(){

                        alert("error al entregar los datos");
                    }) 
                
                }
                else
                {
                    accion = "modificar";
                    form.append("accion", accion);

                    let ajax = $.ajax({

                        type: "POST",
                        url: "../BACKEND/nexo.php",
                        cache: false,
                        contentType: false,
                        processData : false,
                        data: form,
                        dataType: "text"

                    })

                    ajax.done(function(respuesta){

                        if(respuesta == "1")
                        {
                            alert("se ha modificado el ciudadano");
                            $("#btnCargar").val("Agregar");
                            Manejadora.MostrarCiudadanos();
                        }
                        else
                        {
                            alert("no se ha podido modificar el ciudadano");
                        }
                        
                    })
                }
            }
            else
            {
                localStorage.setItem("modificar", "false");
                $("#btnCargar").val("Modificar");
            }  
        }

        public static MostrarCiudadanos()
        {
            let form : FormData = new FormData();
            form.append("accion", "mostrar");

            let ajax = $.ajax({

                type: "POST",
                url: "../BACKEND/nexo.php",
                cache: false,
                contentType: false,
                processData : false,
                dataType: "text",
                data: form
            })

            ajax.done(function(respuesta){

                $("#divTabla").html(respuesta);

            })
        }

        public static EliminarCiudadano(json : any)
        {
            let form : FormData = new FormData();
            form.append("accion", "eliminar");
            form.append("obJSON", JSON.stringify(json));

            let ajax = $.ajax({

                type: "POST",
                url: "../BACKEND/nexo.php",
                cache: false,
                contentType: false,
                processData : false,
                dataType: "text",
                data: form
            })

            ajax.done(function(respuesta){

                if(respuesta == "1")
                {
                    alert("Se ha eliminado de forma correcta");
                    Manejadora.MostrarCiudadanos();
                }

            })
        }

        public static ModificarCiudadano(json : any)
        {   

                $("#txtNombre").val(json.nombre);
                $("#txtEdad").val(json.edad);
                $("#txtApellido").val(json.apellido);
                $("#txtDni").val(json.dni);
                $("#txtDni").prop("disabled", true);
                $("#cboPais").val(json.pais);

                localStorage.setItem("modificar", "true");
                Manejadora.AgregarCiudadano();
            
        }

        public static FiltrarPorPais()
        {
            let form : FormData = new FormData();
            let pais : any = $("#cboPais").val();

            form.append("accion", "filtrar");
            form.append("cboPais", pais);

            console.log(pais);

            let ajax = $.ajax({

                type: "POST",
                url: "../BACKEND/nexo.php",
                cache: false,
                contentType: false,
                processData : false,
                dataType: "text",
                data: form

            })

            ajax.done(function(respuesta){

                $("#divTabla").html(respuesta);
                
            })
        }
    }
}