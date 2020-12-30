///<reference path="producto.ts"/>
namespace Entidades{
    export class Televisor extends Producto{
        public tipo : string;
        public paisOrigen : string;
        public pathFoto : string;

        public constructor(codigo:number, marca:string, precio:number, tipo:string, paisOrigen:string, pathFoto:string){
            super(marca,codigo,precio);
            this.tipo = tipo;
            this.paisOrigen = paisOrigen;
            this.pathFoto = pathFoto;
        }

        public ToJSON():JSON{
            let json = `{${super.ToString()},"tipo":"${this.tipo}","paisOrigen":"${this.paisOrigen}","pathFoto":"${this.pathFoto}"}`
            return JSON.parse(json);
        }       
    }
}