import {InvoiceGatewayInterface} from "../../gateway/invoice.gateway";
import GenerateInvoiceUseCase from "./generate-invoice.usecase";

describe("Generate Invoice UseCase Unit Tests", () => {
    it("should generate an Invoice", async () => {
        const repo = {} as InvoiceGatewayInterface;
        repo.generate = jest.fn();
        const result = await new GenerateInvoiceUseCase(repo).execute({
            street: "Street",
            zipCode: "00000-000",
            state: "State",
            city: "City",
            number: "123456",
            complement: "Complement",
            document: "1234",
            name: "Invoice Name",
            items: [{ name: "InvoiceItem Name", price: 44, id: "12"}]
        });
        expect(result.id).toBeDefined();
        expect(result.name).toStrictEqual("Invoice Name");
        expect(result.document).toStrictEqual("1234");
        expect(result.items[0].id.toString()).toStrictEqual("12");
        expect(result.items[0].name).toStrictEqual("InvoiceItem Name");
        expect(result.items[0].price).toStrictEqual(44);
        expect(result.street).toStrictEqual("Street");
        expect(result.number).toStrictEqual("123456");
        expect(result.city).toStrictEqual("City");
        expect(result.zipCode).toStrictEqual("00000-000");
        expect(result.state).toStrictEqual("State");
        expect(result.complement).toStrictEqual("Complement");
    })
})