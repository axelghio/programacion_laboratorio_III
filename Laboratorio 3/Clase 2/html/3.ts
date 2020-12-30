/*
Realizar una función que reciba un parámetro requerido de tipo numérico y otro opcional
de tipo cadena. Si el segundo parámetro es recibido, se mostrará tantas veces por
consola, como lo indique el primer parámetro. En caso de no recibir el segundo
parámetro, se mostrará el valor inverso del primer parámetro.
*/

function repetitivo(cantidad:number, opcional:string) {

    if(opcional != ""){
        for (let index = 0; index < cantidad; index++) {
            console.log(opcional);
            console.log("\n");
        }
    }
    else
    {
        console.log(cantidad/-1);
    }
}
console.log(repetitivo(7, "asdasd"));