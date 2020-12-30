namespace Entidades{
    export class Producto{
        public marca : string;
        public codigo : number;
        public precio : number;

        public constructor(marca:string, codigo:number, precio:number){
            this.marca = marca;
            this.codigo = codigo;
            this.precio = precio;
        }

        public ToString():string{
            return `"codigo":${this.codigo},"marca":"${this.marca}","precio":"${this.precio}"`;
        }       
    }
}