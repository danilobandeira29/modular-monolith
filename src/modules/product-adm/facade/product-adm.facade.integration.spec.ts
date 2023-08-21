import {Sequelize} from "sequelize-typescript";
import {ProductModel} from "../repository/product.model";
import ProductAdmFactoryFacade from "../factory/product-adm.factory.facade";

describe("Product Adm Facade Integration Tests", function () {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });
        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a product passing a id", async () => {
        const facade = ProductAdmFactoryFacade.create()
        const result = await facade.addProduct(
            {
                id: "1234",
                description: "Product description",
                purchasePrice: 444,
                stock: 2,
                name: "Product name"
            }
        )
        expect(result).toStrictEqual({
            id: "1234",
            description: "Product description",
            purchasePrice: 444,
            stock: 2,
            name: "Product name",
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
        })
    })

    it("should create a product without passing a id", async () => {
        const facade = ProductAdmFactoryFacade.create();
        const result = await facade.addProduct(
            {
                description: "Product description",
                purchasePrice: 444,
                stock: 2,
                name: "Product name"
            }
        )
        expect(result).toStrictEqual({
            id: expect.any(String),
            description: "Product description",
            purchasePrice: 444,
            stock: 2,
            name: "Product name",
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
        })
    })

    it("should check stock", async () => {
        const facade = ProductAdmFactoryFacade.create();
        await facade.addProduct(
            {
                id: "123",
                description: "Product description",
                purchasePrice: 444,
                stock: 2,
                name: "Product name"
            }
        )
        const result = await facade.checkStock({ productId: "123" });
        expect(result).toStrictEqual({
            productId: "123",
            stock: 2
        })
    })
});