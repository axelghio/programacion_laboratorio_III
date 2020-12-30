var meses : Array<string> = ["Enero", "Febrero", "Marzo","Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre","Noviembre", "Diciembre"];
var cont:number = 0;
for(var i:number = 0; i < meses.length; i++){
  cont++;
  console.log(meses[i] + ' ' + cont);
}
