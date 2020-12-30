"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Entidades;
(function (Entidades) {
    var Televisor = /** @class */ (function (_super) {
        __extends(Televisor, _super);
        function Televisor(codigo, marca, precio, tipo, paisOrigen, pathFoto) {
            var _this = _super.call(this, codigo, marca, precio) || this;
            _this.tipo = tipo;
            _this.paisOrigen = paisOrigen;
            _this.pathFoto = pathFoto;
            return _this;
        }
        Televisor.prototype.ToString = function () {
            return "";
        };
        Televisor.prototype.ToJson = function () {
            var json = "{" + _super.prototype.ToString.call(this) + ",\"tipo\":\"" + this.tipo + "\",\"paisOrigen\":\"" + this.paisOrigen + "\",\"pathFoto\":\"" + this.pathFoto + "\"}";
            return JSON.parse(json);
        };
        return Televisor;
    }(Entidades.Producto));
    Entidades.Televisor = Televisor;
})(Entidades || (Entidades = {}));
//# sourceMappingURL=televisor.js.map