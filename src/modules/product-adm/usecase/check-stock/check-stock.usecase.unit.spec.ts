import Id from "../../../@shared/domain/value-object/id-object";
import Product from "../../domain/product";
import CheckStockUseCase from "./check-stock.usecase";
import ProductRepository from "../../repository/product.repository";

describe("CheckStock usecase unit test", () => {
    it("should get stock of a product", async () => {
        const product = new Product({
            id: new Id("1"),
            name: "Product",
            description: "Product description",
            purchasePrice: 100,
            stock: 10,
        });
        const repo = {} as ProductRepository;
        repo.findRequired = jest.fn().mockResolvedValueOnce(product)
        const checkStockUseCase = new CheckStockUseCase(repo);
        const input = {
            productId: "1",
        };
        const result = await checkStockUseCase.execute(input);
        expect(repo.findRequired).toHaveBeenCalled();
        expect(result.productId).toBe("1");
        expect(result.stock).toBe(10);
    });
});