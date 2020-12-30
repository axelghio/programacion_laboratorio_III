///<reference path="ropa.ts"/>
namespace Entidades{
    export class Campera extends Ropa{
        public talle:string;
        public color:string;

        public constructor(codigo:number, nombre:string, precio:number, talle:string, color:string){
            super(codigo,nombre,precio);
            this.talle = talle;
            this.color = color;
        }

        public camperaToJSON():JSON{
            let json = `{"talle":"${this.talle}","color":"${this.color}", ${super.ropaToString()}}`;
            return JSON.parse(json);
        }
    }
}