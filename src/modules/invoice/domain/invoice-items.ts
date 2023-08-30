import Id from "../../@shared/domain/value-object/id-object";
import Entity from "../../@shared/domain/entity/entity";

export default class InvoiceItems extends Entity {
    private readonly _name: string;
    private readonly _price: number;

    constructor(ctx: { id?: Id; name: string; price: number; createdAt: Date; updatedAt: Date }) {
        super(ctx?.id, ctx?.createdAt, ctx?.updatedAt);
        this._name = ctx.name;
        this._price = ctx.price;
    }

    get price() {
        return this._price;
    }

    get name() {
        return this._name;
    }
}