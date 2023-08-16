import {ProductGateway} from "../gateway/product.gateway";
import Product from "../domain/product";
import {ProductModel} from "./product.model";

export default class ProductRepository implements ProductGateway {
    async add(product: Product): Promise<void> {
        await ProductModel.create({
            id: product.id.toString(),
            name: product.name,
            description: product.description,
            stock: product.stock,
            createdAt: new Date(),
            updatedAt: new Date()
        })
    }

    async find(id: string): Promise<Product | null> {
        return Promise.resolve(null);
    }
}