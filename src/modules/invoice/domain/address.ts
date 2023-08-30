export default class Address {
    private readonly _street: string;
    private readonly _complement: string;
    private readonly _city: string;
    private readonly _state: string;
    private readonly _zipCode: string;
    private readonly _number: string;

    constructor(ctx: {  street: string;
        number: string;
        complement: string;
        city: string;
        state: string;
        zipCode: string; }) {
        this._city = ctx.city;
        this._complement = ctx.complement;
        this._state = ctx.state;
        this._street = ctx.street;
        this._zipCode = ctx.zipCode;
        this._number = ctx.number;
    }

    get zipCode() {
        return this._zipCode;
    }

    get city() {
        return this._city;
    }

    get street() {
        return this._street;
    }

    get state() {
        return this._state;
    }

    get complement() {
        return this._complement;
    }

    get number() {
        return this._number;
    }
}