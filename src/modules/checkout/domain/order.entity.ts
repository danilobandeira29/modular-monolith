import Entity from "../../@shared/domain/entity/entity";
import {AggregateRoot} from "../../@shared/domain/entity/aggregate-root.interface";
import Id from "../../@shared/domain/value-object/id-object";
import Client from "./client.entity";
import Product from "./product.entity";

export default class Order extends Entity implements AggregateRoot {
    private readonly _client: Client;
    private readonly _products: Product[];
    private _status: string;

    constructor(ctx: {id?: Id; client: Client; products: Product[]; status?: string;}) {
        super(ctx?.id);
        this._client = ctx.client;
        this._products = ctx.products;
        this._status = ctx.status || 'pending';
    }

    approved() {
        this._status = 'approved';
    }

    get client() {
        return this._client;
    }

    get products() {
        return this._products;
    }

    get status() {
        return this._status;
    }

    get total() {
        return this._products.reduce((acc, p) => acc += p.salesPrice, 0);
    }
}
