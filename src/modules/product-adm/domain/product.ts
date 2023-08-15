import Entity from "../../@shared/domain/entity/entity";
import {AggregateRoot} from "../../@shared/domain/entity/aggregate-root.interface";
import Id from "../../@shared/domain/value-object/id-object";

export default class Product extends Entity implements AggregateRoot {
    private _name: string;
    private _description: string;
    private _purchasePrice: number;
    private _stock: number;

    constructor(ctx: {id?: Id; name: string; description: string; purchasePrice: number; stock: number; createdAt?: Date; updatedAt?: Date}) {
        super(ctx?.id);
        this._name = ctx.name;
        this._description = ctx.description;
        this._purchasePrice = ctx.purchasePrice;
        this._stock = ctx.stock;
    }

    get name() {
        return this._name;
    }

    set name(n: string) {
        this._name = n;
    }

    get description() {
        return this._description;
    }

    set description(d: string) {
        this._description = d;
    }

    get purchasePrice() {
        return this._purchasePrice
    }

    set purchasePrice(p: number) {
        this._purchasePrice = p;
    }

    get stock() {
        return this._stock
    }

    set stock(s: number) {
        this._stock = s;
    }
}