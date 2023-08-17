"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = __importDefault(require("../domain/product"));
const product_model_1 = require("./product.model");
const id_object_1 = __importDefault(require("../../@shared/domain/value-object/id-object"));
class ProductRepository {
    async add(product) {
        await product_model_1.ProductModel.create({
            id: product.id.toString(),
            name: product.name,
            description: product.description,
            stock: product.stock,
            purchasePrice: product.purchasePrice,
            createdAt: new Date(),
            updatedAt: new Date()
        });
    }
    async findRequired(id) {
        const model = await product_model_1.ProductModel.findByPk(id);
        if (!model) {
            throw new Error("Product not found");
        }
        return new product_1.default({
            id: new id_object_1.default(model.id),
            stock: model.stock,
            purchasePrice: model.purchasePrice,
            description: model.description,
            name: model.name,
            createdAt: model.createdAt,
            updatedAt: model?.updatedAt
        });
    }
}
exports.default = ProductRepository;
