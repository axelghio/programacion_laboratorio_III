///<reference path="Persona.ts"/>

namespace Entidades
{
    export class Ciudadano extends Persona 
        {
            public dni : number;
            public pais : string;
            public foto : string;

            public constructor(dni : number, pais : string, foto : string, nombre : string, apellido : string, edad : number)
            {
                super(nombre,apellido,edad);
                this.dni = dni;
                this.pais = pais;
                this.foto = foto;
            }

            public personaToJSON()
            {
                let datos = `{"dni" : "${this.dni}", "pais" : "${this.pais}", "foto" : "${this.foto}", ${super.personaToString()}}`;

                return JSON.parse(datos);
            } 
        }

}