var Entidades;
(function (Entidades) {
    var Persona = /** @class */ (function () {
        function Persona(nombre, apellido, dni, sexo) {
            this._nombre = nombre;
            this._apellido = apellido;
            this._dni = dni;
            this._sexo = sexo;
        }
        Persona.prototype.GetNombre = function () {
            return this._nombre;
        };
        Persona.prototype.GetApellido = function () {
            return this._apellido;
        };
        Persona.prototype.GetDni = function () {
            return this._dni;
        };
        Persona.prototype.GetSexo = function () {
            return this._sexo;
        };
        Persona.prototype.ToString = function () {
            return this._nombre + " - " + this._apellido + " - " + this._dni + " - " + this._sexo;
        };
        return Persona;
    }());
    Entidades.Persona = Persona;
})(Entidades || (Entidades = {}));
