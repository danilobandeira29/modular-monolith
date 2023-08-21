import Product from "../domain/product";

export interface ProductGateway {
    findAll(): Promise<Product[]>;
    find(ctx: { id: string }): Promise<Product>;
}
