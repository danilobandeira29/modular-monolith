import {InvoiceGatewayInterface} from "../../gateway/invoice.gateway";
import {GenerateInvoiceUseCaseInputDto, GenerateInvoiceUseCaseOutputDto} from "./generate-invoice.dto";
import Invoice from "../../domain/invoice";
import Id from "../../../@shared/domain/value-object/id-object";
import Address from "../../domain/address";
import InvoiceItems from "../../domain/invoice-items";

export default class GenerateInvoiceUseCase {
    constructor(private readonly repo: InvoiceGatewayInterface) {}

    async execute(input: GenerateInvoiceUseCaseInputDto): Promise<GenerateInvoiceUseCaseOutputDto> {
        const invoice = new Invoice({
            id: new Id(),
            createdAt: new Date(),
            updatedAt: new Date(),
            name: input.name,
            document: input.document,
            address: new Address({
                street: input.street,
                number: input.number,
                city: input.city,
                state: input.state,
                zipCode: input.zipCode,
                complement: input.complement
            }),
            items: input.items.map(i => new InvoiceItems({ id: new Id(i.id), name: i.name, createdAt: new Date(), updatedAt: new Date(), price: i.price }))
        })
        await this.repo.generate(invoice);
        return {
            id: invoice.id.toString(),
            name: invoice.name,
            street: invoice.address.street,
            city: invoice.address.city,
            number: invoice.address.number,
            complement: invoice.address.complement,
            state: invoice.address.state,
            zipCode: invoice.address.zipCode,
            document: invoice.document,
            total: invoice.total,
            items: invoice.items.map(i => ({ id: i.id.toString(), price: i.price, name: i.name }))
        }
    }
}