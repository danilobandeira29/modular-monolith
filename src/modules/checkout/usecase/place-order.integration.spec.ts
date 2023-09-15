import {Sequelize} from "sequelize-typescript";
import {ClientModel} from "../../client-adm/repository/client.model";
import ClientAdmFacadeFactory from "../../client-adm/factory/client-adm.facade.factory";
import Id from "../../@shared/domain/value-object/id-object";
import PlaceOrderUseCase from "./place-order.usecase";
import ProductAdmFactoryFacade from "../../product-adm/factory/product-adm.factory.facade";
import { ProductCatalogModel as ProductCatalogModel } from "../../store-catalog/repository/product-catalog.model";
import StoreCatalogFactoryFacade from "../../store-catalog/factory/store-catalog.factory";
import {ProductModel} from "../../product-adm/repository/product.model";

describe("Place Order Integration Tests", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });
        sequelize.addModels([ClientModel, ProductCatalogModel, ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should place a order", async () => {
        const clientAdm = ClientAdmFacadeFactory.create();
        const clientId = new Id().toString();
        await clientAdm.addClient({ id: clientId, name: 'Danilo Bandeira', email: 'email@email.com', address: 'address' });
        const productAdm = ProductAdmFactoryFacade.create();
        const productId = new Id().toString();
        await productAdm.addProduct({ id: productId, name: '', stock: 1, purchasePrice: 100, description: '' });
        const storeCatalogAdm = StoreCatalogFactoryFacade.create();
        const useCase = new PlaceOrderUseCase({ clientAdm, productAdm, storeCatalogAdm });
        const result = await useCase.execute({ clientId: clientId, products: [{productId}] });
        expect(result).toStrictEqual({});
    })

    it("should throw errors when products are empty", async () => {
        const clientAdm = ClientAdmFacadeFactory.create();
        const clientId = new Id().toString();
        await clientAdm.addClient({ id: clientId, name: 'Danilo Bandeira', email: 'email@email.com', address: 'address' });
        const productAdm = ProductAdmFactoryFacade.create();
        const storeCatalogAdm = StoreCatalogFactoryFacade.create();
        const useCase = new PlaceOrderUseCase({ clientAdm, productAdm, storeCatalogAdm });
        await expect((() => useCase.execute({ clientId: clientId, products: [] }))).rejects.toThrowError("Products should be in Stock and Price greater than zero");
    })

    it("should throw errors when products are not in Stock", async () => {
        const clientAdm = ClientAdmFacadeFactory.create();
        const clientId = new Id().toString();
        await clientAdm.addClient({ id: clientId, name: 'Danilo Bandeira', email: 'email@email.com', address: 'address' });
        const productAdm = ProductAdmFactoryFacade.create();
        const storeCatalogAdm = StoreCatalogFactoryFacade.create();
        const useCase = new PlaceOrderUseCase({ clientAdm, productAdm, storeCatalogAdm });
        const productId = new Id().toString();
        const productId2 = new Id().toString();
        const productId3 = new Id().toString();
        const productId4 = new Id().toString();
        await productAdm.addProduct({ id: productId, name: '', stock: 0, purchasePrice: 100, description: '' });
        await productAdm.addProduct({ id: productId2, name: '', stock: 0, purchasePrice: 100, description: '' });
        await productAdm.addProduct({ id: productId3, name: '', stock: 0, purchasePrice: 100, description: '' });
        await productAdm.addProduct({ id: productId4, name: '', stock: 0, purchasePrice: 100, description: '' });
        await expect((() => useCase.execute({ clientId: clientId, products: [{ productId }, { productId: productId2 }, { productId: productId3 }, { productId: productId4 }] }))).rejects.toThrowError(/must be in Stock/);
    })

})