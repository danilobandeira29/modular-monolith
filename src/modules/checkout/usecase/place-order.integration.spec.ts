import {Sequelize} from "sequelize-typescript";
import {ClientModel} from "../../client-adm/repository/client.model";
import ClientAdmFacadeFactory from "../../client-adm/factory/client-adm.facade.factory";
import Id from "../../@shared/domain/value-object/id-object";
import PlaceOrderUseCase from "./place-order.usecase";
import ProductAdmFactoryFacade from "../../product-adm/factory/product-adm.factory.facade";
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
        await sequelize.addModels([ClientModel, ProductModel]);
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
        const useCase = new PlaceOrderUseCase({ clientAdm, productAdm });
        const result = await useCase.execute({ clientId: clientId, products: [{productId}] });
        expect(result).toStrictEqual({});
    })

    it("should throw errors when products are empty", async () => {
        const clientAdm = ClientAdmFacadeFactory.create();
        const clientId = new Id().toString();
        await clientAdm.addClient({ id: clientId, name: 'Danilo Bandeira', email: 'email@email.com', address: 'address' });
        const productAdm = ProductAdmFactoryFacade.create();
        const useCase = new PlaceOrderUseCase({ clientAdm, productAdm });
        await expect((() => useCase.execute({ clientId: clientId, products: [] }))).rejects.toThrowError("Products should be in Stock and Price greater than zero");
    })

    it("should throw errors when products are not in Stock", async () => {
        const clientAdm = ClientAdmFacadeFactory.create();
        const clientId = new Id().toString();
        await clientAdm.addClient({ id: clientId, name: 'Danilo Bandeira', email: 'email@email.com', address: 'address' });
        const productAdm = ProductAdmFactoryFacade.create();
        const useCase = new PlaceOrderUseCase({ clientAdm, productAdm });
        const productId = new Id().toString();
        await productAdm.addProduct({ id: productId, name: '', stock: 0, purchasePrice: 100, description: '' });
        await expect((() => useCase.execute({ clientId: clientId, products: [{ productId }] }))).rejects.toThrowError(/must be in Stock/);
    })

})