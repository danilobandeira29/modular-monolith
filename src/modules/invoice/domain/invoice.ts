import Entity from "../../@shared/domain/entity/entity";
import {AggregateRoot} from "../../@shared/domain/entity/aggregate-root.interface";
import Id from "../../@shared/domain/value-object/id-object";
import Address from "./address";
import InvoiceItems from "./invoice-items";

export default class Invoice extends Entity implements  AggregateRoot {
    private readonly _name: string;
    private readonly _document: string;
    private readonly _address: Address;
    private readonly _items: InvoiceItems[];

    constructor(ctx: { id?: Id; name: string; document: string; address: Address; items: InvoiceItems[], createdAt: Date, updatedAt?: Date }) {
        super(ctx?.id, ctx?.createdAt, ctx.updatedAt);
        this._name = ctx.name;
        this._document = ctx.document;
        this._address = ctx.address;
        this._items = ctx.items;
    }

    get name() {
        return this._name;
    }

    get document() {
        return this._document;
    }

    get address() {
        return this._address;
    }

    get items() {
        return this._items;
    }

    get total() {
        return this._items.reduce((acc, i) => {
            acc += i.price;
            return acc;
        }, 0)
    }
}