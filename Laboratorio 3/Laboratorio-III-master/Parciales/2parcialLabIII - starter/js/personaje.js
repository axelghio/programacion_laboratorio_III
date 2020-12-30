"use strict";
var Clases;
(function (Clases) {
    var Personaje = /** @class */ (function () {
        //hacer constructor
        function Personaje(nombre, edad) {
            this.nombre = nombre;
            this.edad = edad;
        }
        Personaje.prototype.toJSON = function () {
            var json = "{\"nombre\":\"" + this.nombre + "\", \"edad\":" + this.edad + "}";
            return json;
        };
        return Personaje;
    }());
    Clases.Personaje = Personaje;
})(Clases || (Clases = {}));
