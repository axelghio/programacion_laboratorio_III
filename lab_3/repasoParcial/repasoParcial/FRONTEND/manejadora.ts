///<reference path="televisor.ts"/>
namespace PrimerParcial
{
    export class Manejadora
    {    
        public static AgregarTelevisor()
        {
            let codigo:any = $("#codigo").val();
            let marca:any = $("#marca").val();
            let precio:any = $("#precio").val();
            let tipo:any = $("#tipo").val();
            let pais:any = $("#pais").val();

            let foto : any = (<HTMLInputElement>document.getElementById("foto")); 
            let path : any = (<HTMLInputElement>document.getElementById("foto")).value;
            let pathFoto : string = (path.split('\\'))[2];

            let televisor : any = new Entidades.Televisor(codigo, marca, precio, tipo, pais, pathFoto);
            
            let form = new FormData();
            form.append("foto",foto.files[0]);
            form.append("cadenaJson",JSON.stringify(televisor.ToJson()));
            form.append("caso", "agregar");

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
        }

        public static MostrarTelevisores()
        {
            let form = new FormData();
            form.append("caso", "traer");

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

            ajax.done(function (response)
            {
                let tabla:string ="";
                tabla+= "<table border=1> <thead> <tr>";
                tabla+= "<td>Codigo</td> <td>Marca</td> <td>Precio</td> <td>Tipo</td> <td>PaisOrigen</td> <td>Foto</td> <td>Acciones</td>";
                tabla+= "</tr> </thead>";
                
                let lista = response;
                lista.forEach(function(tele:any){
                tabla+= `<tr><td> ${tele.codigo} </td>`;
                tabla+= `<td> ${tele.marca} </td>`;
                tabla+= `<td> ${tele.precio} </td>`;
                tabla+= `<td> ${tele.tipo} </td>`;
                tabla+= `<td> ${tele.paisOrigen} </td>`;
                let path : string = tele.pathFoto ;
                tabla+="<td><img src='./BACKEND/fotos/" + tele.pathFoto + "' height=60 width=60></td>";
                tabla+=`<td><input type='button' value='Modificar' class="btn btn-info" onclick='PrimerParcial.Manejadora.ModificarTelevisor(${JSON.stringify(tele)})'></br>`;
                tabla+=`<input type='button' value='Eliminar' class="btn btn-warning" onclick='PrimerParcial.Manejadora.EliminarTelevisor(${JSON.stringify(tele)})'></td></tr>`;
                });
                    
                tabla+="</table>";
                $("#divTabla").html(tabla);
            });
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

        }

        public static EliminarTelevisor(tv:any)
        {
            if(confirm(`¿Desea eliminar ${tv.codigo}, ${tv.tipo}?`))
            {
                let form = new FormData();
                form.append("cadenaJson", JSON.stringify(tv));
                form.append("caso", "eliminar");

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
                ajax.done(function(response){
                    if(response.TodoOK){
                        alert("Se pudo eliminar");
                        Manejadora.MostrarTelevisores();
                    }
                    else{
                        alert("No se pudo eliminar");
                    }
                });
            }
        }
    }
}