import {ProductGateway} from "../gateway/product.gateway";
import Product from "../domain/product";
import { ProductCatalogModel as ProductCatalogModel } from "./product-catalog.model";
import Id from "../../@shared/domain/value-object/id-object";

export default class ProductRepository implements ProductGateway {
    async find(ctx: { id: string }): Promise<Product> {
        const model = await ProductCatalogModel.findByPk(ctx.id);
        if (!model) {
            throw new Error("Product not found");
        }
        return new Product({ id: new Id(model.id), name: model.name, description: model.description, salesPrice: model.salesPrice });
    }

    async findAll(): Promise<Product[]> {
        const models = await ProductCatalogModel.findAll();
        return models.map(m => new Product({ id: new Id(m.id), name: m.name, description: m.description, salesPrice: m.salesPrice }));
    }
}