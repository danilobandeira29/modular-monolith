import {OutputFindAllDto, OutputFindDto, StoreCatalogFacadeInterface} from "./store-catalog.facade.interface";
import FindProductUseCase from "../usecase/find/find-product.usecase";
import FindAllProductsUseCase from "../usecase/find-all/find-all.products.usecase";

export default class StoreCatalogFacade implements StoreCatalogFacadeInterface {
    constructor(private readonly _useCases: { find: FindProductUseCase; findAll: FindAllProductsUseCase }) {}

    find(ctx: { id: string }): Promise<OutputFindDto> {
        return this._useCases.find.execute(ctx);
    }

    findAll(): Promise<OutputFindAllDto> {
        return this._useCases.findAll.execute();
    }

}