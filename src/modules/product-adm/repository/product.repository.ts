import {ProductGateway} from "../gateway/product.gateway";
import Product from "../domain/product";
import {ProductModel} from "./product.model";
import Id from "../../@shared/domain/value-object/id-object";

export default class ProductRepository implements ProductGateway {
    async add(product: Product): Promise<void> {
        await ProductModel.create({
            id: product.id.toString(),
            name: product.name,
            description: product.description,
            stock: product.stock,
            purchasePrice: product.purchasePrice,
            createdAt: new Date(),
            updatedAt: new Date()
        })
    }

    async findRequired(id: string): Promise<Product> {
        const model = await ProductModel.findByPk(id);
        if (!model) {
            throw new Error("Product not found");
        }
        return new Product(
            {
                id: new Id(model.id),
                stock: model.stock,
                purchasePrice: model.purchasePrice,
                description: model.description,
                name: model.name,
                createdAt: model.createdAt,
                updatedAt: model?.updatedAt
            })
    }
}