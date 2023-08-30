import {
    InvoiceGatewayInterface
} from "../gateway/invoice.gateway";
import Invoice from "../domain/invoice";
import InvoiceModel from "./invoice.model";
import Address from "../domain/address";
import InvoiceItemsModel from "./invoice-items.model";
import InvoiceItems from "../domain/invoice-items";
import Id from "../../@shared/domain/value-object/id-object";

export default class InvoiceRepository implements InvoiceGatewayInterface {
    async find(ctx: { id: string }): Promise<Invoice> {
        const model = await InvoiceModel.findByPk(ctx.id, { include: InvoiceItemsModel });
        if(!model) {
            throw new Error("Invoice not found");
        }
        return new Invoice({
            id: new Id(model.id),
            address: new Address({
                zipCode: model.zipCode,
                street: model.street,
                state: model.state,
                city: model.city,
                complement: model.complement,
                number: model.number
            }),
            document: model.document,
            name: model.name,
            createdAt: model.createdAt,
            updatedAt: model.updatedAt,
            items: model.items.map(i => new InvoiceItems({ id: i.id, name: i.name, price: i.price, createdAt: i.createdAt, updatedAt: i.updatedAt }))
        })
    }

    async generate(entity: Invoice): Promise<void> {
        await InvoiceModel.create({
            id: entity.id.toString(),
            name: entity.name,
            document: entity.document,
            street: entity.address.street,
            zipCode: entity.address.zipCode,
            state: entity.address.state,
            city: entity.address.city,
            complement: entity.address.complement,
            number: entity.address.number,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
            items: entity.items.map(i => ({
                name: i.name,
                id: i.id.toString(),
                price: i.price
            }))
        })
        await InvoiceItemsModel.bulkCreate(entity.items.map(item => ({ id: item.id.toString(), name: item.name, price: item.price, createdAt: item.createdAt, updatedAt: item.updatedAt })));
    }
}