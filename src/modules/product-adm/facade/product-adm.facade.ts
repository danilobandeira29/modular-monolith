import {
    InputAddProductAdmFacade,
    InputCheckStockProductAdmFacade,
    OutputAddProductAdmFacade,
    OutputCheckStockProductAdmFacade,
    ProductAdmFacadeInterface
} from "./product-adm.facade.interface";
import AddProductUseCase from "../usecase/add-product/add-product.usecase";

export default class ProductAdmFacade implements ProductAdmFacadeInterface {
    constructor(private readonly useCases: { addProduct: AddProductUseCase,  }) {}

    async addProduct(ctx: InputAddProductAdmFacade): Promise<OutputAddProductAdmFacade> {
        // caso o dto de output da facade fosse diferente do dto de output do caso de uso, devia converter aqui
        return this.useCases.addProduct.execute(
            {
                    name: ctx.name,
                    purchasePrice: ctx.purchasePrice,
                    description: ctx.description,
                    stock: ctx.stock,
                    id: ctx.id
            })
    }

    checkStock(ctx: InputCheckStockProductAdmFacade): Promise<OutputCheckStockProductAdmFacade> {
        return Promise.resolve({} as any);
    }

}