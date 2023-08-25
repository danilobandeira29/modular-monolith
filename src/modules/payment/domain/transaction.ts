import Entity from "../../@shared/domain/entity/entity";
import Id from "../../@shared/domain/value-object/id-object";
import {AggregateRoot} from "../../@shared/domain/entity/aggregate-root.interface";

export default class Transaction extends Entity implements AggregateRoot {
    private readonly _amount: number;
    private readonly _orderId: string;
    private _status: string;

    constructor(ctx: { id?: Id; amount: number; orderId: string; status?: string }) {
        super(ctx?.id);
        this._amount = ctx.amount;
        this._orderId = ctx.orderId;
        this._status = ctx.status || 'pending';
        this.validate();
    }

    private validate() {
        if(this._amount <= 0) {
            throw new Error("Amount must be greater than 0");
        }
    }

    approve() {
        this._status = 'approved';
    }

    decline() {
        this._status = "declined";
    }

    process(): void {
        if(this._amount >= 100) {
            this.approve();
            return;
        }
        this.decline();
    }

    get amount() {
        return this._amount;
    }

    get orderId() {
        return this._orderId;
    }

    get status() {
        return this._status;
    }

}
