import {Sequelize} from "sequelize-typescript";
import InvoiceModel from "./invoice.model";
import InvoiceItemsModel from "./invoice-items.model";
import InvoiceRepository from "./invoice.repository";
import Invoice from "../domain/invoice";
import Address from "../domain/address";
import InvoiceItems from "../domain/invoice-items";
import Id from "../../@shared/domain/value-object/id-object";

describe("Invoice Repository Integration Tests", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });
        await sequelize.addModels([InvoiceModel, InvoiceItemsModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should find an invoice", async () => {
        await InvoiceModel.create({
            id: "1",
            name: "Invoice Name",
            document: "1234",
            street: "Street",
            zipCode: "00000-000",
            state: "State",
            city: "City",
            complement: "Complement",
            number: "44",
            createdAt: new Date(),
            updatedAt: new Date()
        });
        await InvoiceItemsModel.create({
            id: "2",
            name: "InvoiceItem Name",
            price: 44,
            createdAt: new Date(),
            updatedAt: new Date(),
            invoice_id: "1"
        });
        const result = await new InvoiceRepository().find({ id: "1" });
        expect(result.id.toString()).toStrictEqual("1");
        expect(result.name).toStrictEqual("Invoice Name");
        expect(result.document).toStrictEqual("1234");
        expect(result.items[0].id.toString()).toStrictEqual("2");
        expect(result.items[0].name).toStrictEqual("InvoiceItem Name");
        expect(result.items[0].price).toStrictEqual(44);
    });

    it("should generate an invoice", async () => {
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
        await new InvoiceRepository().generate(invoice);
        const invoiceModel = await InvoiceModel.findByPk("1");
        const invoiceItemModel = await InvoiceItemsModel.findByPk("2");
        expect(invoice.id.toString()).toStrictEqual(invoiceModel!.id);
        expect(invoice.address.street).toStrictEqual(invoiceModel!.street);
        expect(invoice.address.number).toStrictEqual(invoiceModel!.number);
        expect(invoice.address.city).toStrictEqual(invoiceModel!.city);
        expect(invoice.address.zipCode).toStrictEqual(invoiceModel!.zipCode);
        expect(invoice.address.state).toStrictEqual(invoiceModel!.state);
        expect(invoice.address.complement).toStrictEqual(invoiceModel!.complement);
        expect(invoice.name).toStrictEqual(invoiceModel!.name);
        expect(invoice.document).toStrictEqual(invoiceModel!.document);
        expect(invoice.items[0].id.toString()).toStrictEqual(invoiceItemModel!.id);
        expect(invoice.items[0].name).toStrictEqual(invoiceItemModel!.name);
        expect(invoice.items[0].price).toStrictEqual(invoiceItemModel!.price);
    })
})