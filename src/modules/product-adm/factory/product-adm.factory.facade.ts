import ProductRepository from "../repository/product.repository";
import AddProductUseCase from "../usecase/add-product/add-product.usecase";
import ProductAdmFacade from "../facade/product-adm.facade";
import CheckStockUseCase from "../usecase/check-stock/check-stock.usecase";

export default class ProductAdmFactoryFacade {
    static create() {
        const repo = new ProductRepository();
        const addUseCase = new AddProductUseCase(repo);
        const checkStockUseCase = new CheckStockUseCase(repo);
        return new ProductAdmFacade({ addProduct: addUseCase, checkStock: checkStockUseCase });
    }
}