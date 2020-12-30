function Mostrar(cant, cadena) {
    if (cadena != null) {
        for (var i = 0; i < cant; i++) {
            console.log(cadena);
        }
    }
    else {
        console.log(cant / -1);
    }
}
Mostrar(5, "Hola");
