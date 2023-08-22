import Entity from "../../@shared/domain/entity/entity";
import Id from "../../@shared/domain/value-object/id-object";

export class Client extends Entity {
    private readonly _name: string;
    private readonly _email: string;
    private readonly _address: string;

    constructor(ctx: { id?: Id; name: string; email: string; address: string}) {
        super(ctx.id);
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
