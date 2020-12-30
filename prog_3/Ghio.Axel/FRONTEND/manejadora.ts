///<reference path="campera.ts"/>
namespace Test{
    export class Manejadora
    {
        public static AgregarCampera()
        {
            let codigo : any = $("#txtCodigo").val();
            let nombre : any = $("#txtNombre").val();
            let precio : any = $("#txtPrecio").val();
            let talle : any = $("#txtTalle").val();
            let color : any = $("#cboColores").val();

            let campera = new Entidades.Campera(codigo, nombre, precio, talle, color);

            let form = new FormData();
            let flag = false;
            form.append("cadenaJson",JSON.stringify(campera.camperaToJSON()));
            
            let auxMod = $("#hdnIdModificacion").val();

            if(codigo == auxMod)
            {
                console.log("codigo = codigo");
                form.append("caso", "modificar");
                flag = true;
            }
            else
            {
                $("#hdnIdModificacion").val("");
                form.append("caso", "agregar");
            }

            let ajax = $.ajax
            ({
                type: "POST",
                url: "./BACKEND/administrar.php",
                cache: false,
                contentType: false,
                processData : false,
                data: form,
                dataType: "JSON"
            });
            ajax.done(function(response)
            {
                if(flag)
                {
                    if(response.TodoOK)
                    {
                        alert("Se modifico la campera");
                        $("#btnAgregar").val("Agregar");
                        Manejadora.MostrarCamperas();
                        $("#txtCodigo").prop("disabled", false);
                    }
                    else
                    {
                        alert("No se modifico la campera");
                        console.log("No se modifico la campera");
                        $("#btnAgregar").val("Agregar");
                        $("#txtCodigo").prop("disabled", false);
                    }
                }
                else
                {
                    if(response.TodoOK)
                    {
                        alert("Se agrego la campera");
                    }
                    else
                    {
                        alert("No se agrego la campera");
                    }
                }
            });

            Manejadora.LimpiarForm();
        }

        public static MostrarCamperas()
        {
            let form = new FormData();
            form.append("caso","mostrar");
            let ajax = $.ajax
            ({
                type: "POST",
                url: "./BACKEND/administrar.php",
                cache: false,
                contentType: false,
                processData : false,
                data: form,
                dataType: "JSON"
            })
            ajax.done(function (response)
            {
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
                lista.forEach(function(campera:any)
                {
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
                    tabla+=`<input type='button' value='Modificar' class="btn btn-info" onclick='Test.Manejadora.ModificarCampera(${JSON.stringify(campera)})' /></br>`;
                    tabla+=`<input type='button' value='Eliminar' class="btn btn-info" onclick='Test.Manejadora.EliminarCampera(${JSON.stringify(campera)})' />`;
                    tabla+="</td>";
                    tabla+="</tr>"; 
                });
                    
                tabla+="</table>";
                $("#divTabla").html(tabla);
            });
        }

        public static EliminarCampera(campera:any)
        {
            if(confirm(`¿Eliminar campera ${campera.codigo}, ${campera.talle}?`))
            {
                let form = new FormData();
                form.append("cadenaJson",JSON.stringify(campera));
                form.append("caso","eliminar");
                let ajax = $.ajax
                ({
                    type: "POST",
                    url: "./BACKEND/administrar.php",
                    cache: false,
                    contentType: false,
                    processData : false,
                    data: form,
                    dataType: "JSON"
    
                })
                ajax.done(function(response)
                {
                    if(response.TodoOK)
                    {
                        alert("Se pudo eliminar");
                        Manejadora.MostrarCamperas();
                    }
                    else
                    {
                        alert("No se pudo eliminar");
                    }
                });
            }
        }

        public static ModificarCampera(campera:any)
        {
            $("#btnAgregar").val("Modificar");
            $("#txtCodigo").val(campera.codigo);
            $("#txtCodigo").prop("disabled", true);
            $("#txtNombre").val(campera.nombre);
            $("#txtPrecio").val(campera.precio);
            $("#txtTalle").val(campera.talle);
            $("#cboColores").val(campera.color);

            $("#hdnIdModificacion").val(campera.codigo);
        }

        public static FiltrarCamperasPorColor()
        {
            let color = $("#cboColores").val();
            let form = new FormData();
            form.append("caso","mostrar");
            
            let ajax = $.ajax
            ({

                type: "POST",
                url: "./BACKEND/administrar.php",
                cache: false,
                contentType: false,
                processData : false,
                data: form,
                dataType: "JSON"

            })
            ajax.done(function(response)
            {
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
                for (let campera of response) 
                {
                    if(campera.color === color)
                    {
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
        
                        tabla+=`<td><input type='button' value='Modificar' class="btn btn-info" onclick='Test.Manejadora.ModificarCampera(${JSON.stringify(campera)})' /></br>`;
                        tabla+=`<input type='button' value='Eliminar' class="btn btn-info" onclick='Test.Manejadora.EliminarCampera(${JSON.stringify(campera)})' /></td>`;
                        tabla+="</tr>"; 
                    }
                }
                tabla+="</table>";
                $("#divTabla").html(tabla);
            })
            Manejadora.LimpiarForm();
        }

        public static CargarColoresJSON()
        {
            let form = new FormData();
            form.append("caso","colores");
            let ajax = $.ajax
            ({
                type: "POST",
                url: "./BACKEND/administrar.php",
                cache: false,
                contentType: false,
                processData : false,
                data: form,
                dataType: "JSON"
            })

            ajax.done(function(response)
            {
                for(let i of response)
                {
                    $("#cboColores").append(`<option>${i.descripcion}</option>}`);
                }

            })
        }

        public static LimpiarForm()
        {
            $("#txtCodigo").val("");
            $("#txtNombre").val("");
            $("#txtPrecio").val("");
            $("#txtTalle").val("");
            $("#cboColores").val("Azul");
        }

        public static AdministrarValidaciones()
        {
            let codigo : any = $("#txtCodigo").val();
            let nombre : any = $("#txtNombre").val();
            let precio : any = $("#txtPrecio").val();
            let talle : any = $("#txtTalle").val();
            let color : any = $("#cboColores").val();

            if(!this.ValidarCamposVacios(codigo))
            {
                console.log("codigo campo vacio");
            }
            if(!this.ValidarCamposVacios(nombre))
            {
                console.log("nombre campo vacio");
            }
            if(!this.ValidarCamposVacios(precio))
            {
                console.log(" precio campo vacio");
            }
            if(!this.ValidarCamposVacios(talle))
            {
                console.log("talle campo vacio");
            }
            if(!this.ValidarCamposVacios(color))
            {
                console.log("color campo vacio");
            }

        }

        public static ValidarCamposVacios(campo:string):boolean
        {
            let retorno = false;
            if(campo.length > 0)
            {
                if(campo != null)
                {
                    retorno = true;
                }
            }
            return retorno;
        }

        public static ValidarTalles(talle:string, talles:string[]):boolean
        {
            let retorno = false;
            for(let aux of talles) {
                if(aux == talle)
                {
                    retorno = true;
                }   
            }
            return retorno;
        }
        
        public static ValidarCodigo(codigo:number):boolean
        {
            let retorno = false;
            if(codigo >= 523 && codigo < 1000)
            {
                retorno = true;
            }
            return retorno;
        }
    }    
}