import Product from "../domain/product";

export interface ProductGateway {
    add(product: Product): Promise<void>;
    find(id: string): Promise<Product | null>;
}
