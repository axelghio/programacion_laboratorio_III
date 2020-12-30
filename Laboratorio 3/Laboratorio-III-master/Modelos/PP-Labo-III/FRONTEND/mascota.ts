namespace Entidades{
    export class Mascota{
        public tamaño:string;
        public edad:number;
        public precio:number;

        public constructor(tamaño:string,edad:number,precio:number)
        {
            this.tamaño = tamaño;
            this.edad = edad;
            this.precio = precio;
        }

        public ToString():string{
            return `"tamanio":"${this.tamaño}","edad":"${this.edad}","precio":"${this.precio}"`;
        }
    }
}