import AddProductUseCase from "./add-product.usecase";
import {ProductGateway} from "../gateway/product.gateway";

describe("Add Product UseCase Unit test", () => {
    it("should add a Product", async() => {
        const repo = {} as ProductGateway;
        repo.add = jest.fn(() => Promise.resolve());
        const result = await new AddProductUseCase(repo).execute({
            name: "Product",
            description: "Description Product",
            purchasePrice: 400,
            stock: 20
        })
        expect(result).toStrictEqual({
            id: expect.any(String),
            name: "Product",
            description: "Description Product",
            purchasePrice: 400,
            stock: 20
        })
    })
})