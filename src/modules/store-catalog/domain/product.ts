import Entity from "../../@shared/domain/entity/entity";
import {AggregateRoot} from "../../@shared/domain/entity/aggregate-root.interface";
import Id from "../../@shared/domain/value-object/id-object";

export default class Product extends Entity implements AggregateRoot {
    private readonly _name: string;
    private readonly _description: string;
    private readonly _salesPrice: number;

    constructor(ctx: { id: Id; name: string; salesPrice: number; description: string }) {
        super(ctx.id);
        this._name = ctx.name;
        this._description = ctx.description;
        this._salesPrice = ctx.salesPrice;
    }

    get salesPrice() {
        return this._salesPrice;
    }

    get description() {
        return this._description;
    }

    get name() {
        return this._name;
    }
}
