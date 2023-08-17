import Product from "../domain/product";

export interface ProductGateway {
    add(product: Product): Promise<void>;
    findRequired(id: string): Promise<Product>;
}
