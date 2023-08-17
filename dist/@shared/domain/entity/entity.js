"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const id_object_1 = __importDefault(require("../value-object/id-object"));
class Entity {
    constructor(id) {
        this._id = id || new id_object_1.default();
        this._createdAt = new Date();
        this._updatedAt = new Date();
    }
    get id() {
        return this._id;
    }
    get createdAt() {
        return this._createdAt;
    }
    get updateAt() {
        return this._updatedAt;
    }
    set updateAt(d) {
        this._updatedAt = d;
    }
}
exports.default = Entity;
