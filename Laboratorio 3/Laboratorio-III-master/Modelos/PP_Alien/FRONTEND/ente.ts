namespace Entidades{
    export class Ente{
        public cuadrante : string;
        public edad : number;
        public altura : number;

        public constructor(cuadrante:string, edad:number, altura:number){
            this.cuadrante = cuadrante;
            this.edad = edad;
            this.altura = altura;
        }

        public ToString():string{
            return `"cuadrante":"${this.cuadrante}","edad":"${this.edad}","altura":"${this.altura}"`;
        }       
    }
}