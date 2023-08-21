import ProductRepository from "../repository/product.repository";
import {StoreCatalogFacadeInterface} from "../facade/store-catalog.facade.interface";
import FindAllProductsUseCase from "../usecase/find-all/find-all.products.usecase";
import FindProductUseCase from "../usecase/find/find-product.usecase";
import StoreCatalogFacade from "../facade/store-catalog.facade";

export default class StoreCatalogFactoryFacade {
    static create(): StoreCatalogFacadeInterface {
        const repo = new ProductRepository();
        const findAllUseCase = new FindAllProductsUseCase(repo);
        const findUseCase = new FindProductUseCase(repo);
        return new StoreCatalogFacade({ findAll: findAllUseCase, find: findUseCase });
    }
}