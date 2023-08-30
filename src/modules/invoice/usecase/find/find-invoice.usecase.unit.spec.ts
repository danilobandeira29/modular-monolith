import {InvoiceGatewayInterface} from "../../gateway/invoice.gateway";
import Invoice from "../../domain/invoice";
import Id from "../../../@shared/domain/value-object/id-object";
import Address from "../../domain/address";
import InvoiceItems from "../../domain/invoice-items";
import FindInvoiceUseCase from "./find-invoice.usecase";

describe("Find Invoice UseCase Unit Tests", () => {
    it("should find an Invoice", async () => {
        const invoice = new Invoice({
            id: new Id("1"),
            name: "Invoice Name",
            document: '1234',
            createdAt: new Date(),
            updatedAt: new Date(),
            address: new Address({
                street: "Street",
                zipCode: "00000-000",
                state: "State",
                city: "City",
                number: "123456",
                complement: "Complement"
            }),
            items: [new InvoiceItems({ name: "InvoiceItem Name", price: 44, createdAt: new Date(), updatedAt: new Date(), id: new Id("2") })]
        })
        const repo = {} as InvoiceGatewayInterface;
        repo.find = jest.fn().mockResolvedValueOnce(invoice);
        const result = await new FindInvoiceUseCase(repo).execute({ id: "1" });
        expect(result.id).toStrictEqual("1");
        expect(result.name).toStrictEqual("Invoice Name");
        expect(result.document).toStrictEqual("1234");
        expect(result.items[0].id.toString()).toStrictEqual("2");
        expect(result.items[0].name).toStrictEqual("InvoiceItem Name");
        expect(result.items[0].price).toStrictEqual(44);
    });
})