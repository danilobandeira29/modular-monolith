import {ProductGateway} from "../../gateway/product.gateway";
import {OutputFindAllProductsDto} from "./find-all-products.dto";

export default class FindAllProductsUseCase {
    constructor(private readonly productRepository: ProductGateway) {}

    async execute(): Promise<OutputFindAllProductsDto> {
        const products = await this.productRepository.findAll();
        return {
            products: products.map(p => ({
                description: p.description,
                name: p.name,
                salesPrice: p.salesPrice,
                id: p.id.toString()
            }))
        }
    }
}
