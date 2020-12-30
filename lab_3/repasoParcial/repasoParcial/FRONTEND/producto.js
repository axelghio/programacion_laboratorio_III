"use strict";
var Entidades;
(function (Entidades) {
    var Producto = /** @class */ (function () {
        function Producto(codigo, marca, precio) {
            this.codigo = codigo;
            this.marca = marca;
            this.precio = precio;
        }
        Producto.prototype.ToString = function () {
            return "\"codigo\":" + this.codigo + ",\"marca\":\"" + this.marca + "\",\"precio\":" + this.precio;
        };
        return Producto;
    }());
    Entidades.Producto = Producto;
})(Entidades || (Entidades = {}));
//# sourceMappingURL=producto.js.map