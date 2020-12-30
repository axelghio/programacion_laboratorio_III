"use strict";
var Entidades;
(function (Entidades) {
    var Ropa = /** @class */ (function () {
        function Ropa(codigo, nombre, precio) {
            this.codigo = codigo;
            this.nombre = nombre;
            this.precio = precio;
        }
        Ropa.prototype.ropaToString = function () {
            return "\"nombre\":\"" + this.nombre + "\",\"precio\":" + this.precio + ",\"codigo\":" + this.codigo;
        };
        return Ropa;
    }());
    Entidades.Ropa = Ropa;
})(Entidades || (Entidades = {}));
