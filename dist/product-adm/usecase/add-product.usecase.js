"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = __importDefault(require("../domain/product"));
const id_object_1 = __importDefault(require("../../@shared/domain/value-object/id-object"));
class AddProductUseCase {
    constructor(repo) {
        this.repo = repo;
    }
    async execute(input) {
        const product = new product_1.default({
            id: new id_object_1.default(),
            name: input.name,
            description: input.description,
            stock: input.stock,
            purchasePrice: input.purchasePrice,
        });
        this.repo.add(product).catch(e => console.error(e));
        return {
            id: product.id.toString(),
            name: product.name,
            purchasePrice: product.purchasePrice,
            description: product.description,
            stock: product.stock
        };
    }
}
exports.default = AddProductUseCase;
