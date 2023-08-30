import {InvoiceGatewayInterface} from "../../gateway/invoice.gateway";
import {FindInvoiceUseCaseInputDTO, FindInvoiceUseCaseOutputDTO} from "./find-invoice.dto";

export default class FindInvoiceUseCase {
    constructor(private readonly repo: InvoiceGatewayInterface) {}

    async execute(input: FindInvoiceUseCaseInputDTO): Promise<FindInvoiceUseCaseOutputDTO> {
        const invoice = await this.repo.find(input)
        return {
            id: invoice.id.toString(),
            name: invoice.name,
            address: {
                street: invoice.address.street,
                city: invoice.address.city,
                number: invoice.address.number,
                complement: invoice.address.complement,
                state: invoice.address.state,
                zipCode: invoice.address.zipCode
            },
            createdAt: invoice.createdAt,
            document: invoice.document,
            total: invoice.total,
            items: invoice.items.map(i => ({ id: i.id.toString(), price: i.price, name: i.name }))
        }
    }
}