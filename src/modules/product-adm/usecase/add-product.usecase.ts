import {InputProductDto, OutputProductDto} from "./add-product.dto";
import {ProductGateway} from "../gateway/product.gateway";
import Product from "../domain/product";
import Id from "../../@shared/domain/value-object/id-object";

export default class AddProductUseCase {
    constructor(private readonly repo: ProductGateway) {}

    async execute(input: InputProductDto): Promise<OutputProductDto> {
        const product = new Product({
            id: new Id(),
            name: input.name,
            description: input.description,
            stock: input.stock,
            purchasePrice: input.purchasePrice,
        })
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