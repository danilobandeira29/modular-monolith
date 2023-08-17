import ProductRepository from "../repository/product.repository";
import AddProductUseCase from "../usecase/add-product/add-product.usecase";
import ProductAdmFacade from "../facade/product-adm.facade";

export default class ProductAdmFactoryFacade {
    static create() {
        const repo = new ProductRepository();
        const addUseCase = new AddProductUseCase(repo);
        return new ProductAdmFacade({ addProduct: addUseCase });
    }
}