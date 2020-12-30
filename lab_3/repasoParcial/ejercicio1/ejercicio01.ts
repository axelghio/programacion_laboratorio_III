///<reference path="../node_modules/@types/jquery/index.d.ts" />

function verificarPositivos()
{
    var value = "opcion=" + $("#input1").val();
    var ajax = $.ajax({
        type: 'POST',
        url: 'manejador.php',
        async: true,
        dataType: "text",
        data: value,
        statusCode: {
            200: function()
            {
                console.log("encontrado");
            },
            404: function()
            {
                console.log("NO encontrado");
            }

        }
    }).done(function(resultado){
        $("#input2").val(resultado);
    }).fail(function(jqHXR, textStatus, errorThown)
    {
        alert( jqHXR.responseText + "\n" + textStatus + "\n" + errorThown);
    })
}