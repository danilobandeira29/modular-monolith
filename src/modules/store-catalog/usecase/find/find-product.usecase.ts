import {ProductGateway} from "../../gateway/product.gateway";
import {InputFindProductDto, OutputFindProductDto} from "./find-product.dto";

export default class FindProductUseCase {
    constructor(private readonly productRepository: ProductGateway) {}

    async execute(input: InputFindProductDto): Promise<OutputFindProductDto> {
        const product = await this.productRepository.find(input);
        return {
            id: product.id.toString(),
            name: product.name,
            description: product.description,
            salesPrice: product.salesPrice
        }
    }
}