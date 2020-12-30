namespace Entidades
{
    export class Persona 
        {
            public nombre : string;
            public apellido : string;
            public edad : number;
            
            public constructor(nombre : string, apellido : string ,edad : number)
            {
                this.nombre = nombre;
                this.edad = edad;
                this.apellido = apellido;
            }

            public personaToString() 
            {
                return `"nombre" : "${this.nombre}", "apellido" : "${this.apellido}", "edad" : "${this.edad}"`;
            }

        }
}