import Id from "../value-object/id-object";

export default class Entity {
    private readonly _id: Id;
    private readonly _createdAt: Date;
    private _updatedAt: Date;

    constructor(id?: Id) {
        this._id = id || new Id();
        this._createdAt = new Date();
        this._updatedAt = new Date();
    }

    get id() {
        return this._id;
    }

    get createdAt() {
        return this._createdAt;
    }

    get updatedAt() {
        return this._updatedAt;
    }

    set updatedAt(d: Date) {
        this._updatedAt = d;
    }
}
