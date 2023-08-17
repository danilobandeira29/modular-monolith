"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const entity_1 = __importDefault(require("../../@shared/domain/entity/entity"));
class Product extends entity_1.default {
    constructor(ctx) {
        super(ctx?.id);
        this._name = ctx.name;
        this._description = ctx.description;
        this._purchasePrice = ctx.purchasePrice;
        this._stock = ctx.stock;
    }
    get name() {
        return this._name;
    }
    set name(n) {
        this._name = n;
    }
    get description() {
        return this._description;
    }
    set description(d) {
        this._description = d;
    }
    get purchasePrice() {
        return this._purchasePrice;
    }
    set purchasePrice(p) {
        this._purchasePrice = p;
    }
    get stock() {
        return this._stock;
    }
    set stock(s) {
        this._stock = s;
    }
}
exports.default = Product;
