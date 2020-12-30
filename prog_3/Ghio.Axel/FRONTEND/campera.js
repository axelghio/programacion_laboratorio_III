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
///<reference path="ropa.ts"/>
var Entidades;
(function (Entidades) {
    var Campera = /** @class */ (function (_super) {
        __extends(Campera, _super);
        function Campera(codigo, nombre, precio, talle, color) {
            var _this = _super.call(this, codigo, nombre, precio) || this;
            _this.talle = talle;
            _this.color = color;
            return _this;
        }
        Campera.prototype.camperaToJSON = function () {
            var json = "{\"talle\":\"" + this.talle + "\",\"color\":\"" + this.color + "\", " + _super.prototype.ropaToString.call(this) + "}";
            return JSON.parse(json);
        };
        return Campera;
    }(Entidades.Ropa));
    Entidades.Campera = Campera;
})(Entidades || (Entidades = {}));
