import Entity from "../../@shared/domain/entity/entity";
import {AggregateRoot} from "../../@shared/domain/entity/aggregate-root.interface";
import Id from "../../@shared/domain/value-object/id-object";

export default class Client extends Entity implements AggregateRoot {
    private readonly _name: string;
    private readonly _email: string;
    private readonly _address: string;

    constructor(ctx: {id?: Id; email: string; address: string; name: string}) {
        super(ctx?.id);
        this._name = ctx.name;
        this._address = ctx.address;
        this._email = ctx.email;
    }

    get name() {
        return this._name;
    }

    get email() {
        return this._email;
    }

    get address() {
        return this._address;
    }
}