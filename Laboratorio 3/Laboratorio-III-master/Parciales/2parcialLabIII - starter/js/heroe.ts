///<reference path="personaje.ts"/>
///<reference path="enumerados.ts"/>

namespace Clases{

    export class Heroe extends Personaje{

        public id:number;
        public tipo:tipoHeroe;
        public poder_principal:string;

        public constructor(nombre:string,edad:number,id:number,tipo:tipoHeroe,poder_principal:string)
        {
            super(nombre,edad);
            this.id = id;
            this.tipo = tipo;
            this.poder_principal=poder_principal;
        }
//realizar codigo de la clase "Heroe". el metodo toJSON es parte de la clase y es provisto en el starter
        public toJSON():string{

            let cad:string = super.toJSON().replace('}', '');          
            

            let json:string = cad + `, "id":${this.id}, "tipo":${this.tipo.toString()}, "poder_principal":"${this.poder_principal}"}`;
            return json;
        }

    }
}



