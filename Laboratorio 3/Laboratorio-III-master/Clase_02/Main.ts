function MostrarDatos():void{
    let nombre : string = (<HTMLInputElement> document.getElementById("nombre")).value;
    let edad : string = (<HTMLInputElement> document.getElementById("edad")).value;

    let txtBox : string;
    txtBox =  nombre + " " + edad;

    (<HTMLInputElement> document.getElementById("txtBox")).value = txtBox;
    (<HTMLDivElement> document.getElementById("divText")).innerHTML = txtBox
}