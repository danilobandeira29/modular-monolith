import {Sequelize} from "sequelize-typescript";
import StoreCatalogFactory from "../factory/store-catalog.factory";
import ProductModel from "../repository/product.model";

describe("Store Catalog Facade Integration Tests", () => {
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

    it("should find all Product", async () => {
        const model = await ProductModel.create({
            id: "1234",
            name: "Product Name",
            description: "Product description",
            salesPrice: 44
        });
        const model2 = await ProductModel.create({
            id: "4444",
            name: "Product Name 2",
            description: "Product description 2",
            salesPrice: 42
        });
        const facade = StoreCatalogFactory.create();
        const result = await facade.findAll();
        expect(result.products[0].id.toString()).toStrictEqual(model.id);
        expect(result.products[0].name).toStrictEqual(model.name);
        expect(result.products[0].description).toStrictEqual(model.description);
        expect(result.products[0].salesPrice).toStrictEqual(model.salesPrice);
        expect(result.products[1].id.toString()).toStrictEqual(model2.id);
        expect(result.products[1].name).toStrictEqual(model2.name);
        expect(result.products[1].description).toStrictEqual(model2.description);
        expect(result.products[1].salesPrice).toStrictEqual(model2.salesPrice);
    })

    it("should find a Product", async () => {
        const model = await ProductModel.create({
            id: "1234",
            name: "Product Name",
            description: "Product description",
            salesPrice: 44
        });
        const facade = StoreCatalogFactory.create();
        const product = await facade.find({ id: "1234" });
        expect(product.id.toString()).toStrictEqual(model.id);
        expect(product.name).toStrictEqual(model.name);
        expect(product.description).toStrictEqual(model.description);
        expect(product.salesPrice).toStrictEqual(model.salesPrice);

    })
})