import {InputDtoPlaceOrder, OutputDtoPlaceOrder} from "./place-order.dto";
import {ClientAdmFacadeInterface} from "../../client-adm/facade/client-adm.facade.interface";
import {ProductAdmFacadeInterface} from "../../product-adm/facade/product-adm.facade.interface";
import {StoreCatalogFacadeInterface} from "../../store-catalog/facade/store-catalog.facade.interface";
import Product from "../domain/product.entity";
import Id from "../../@shared/domain/value-object/id-object";
import Client from "../domain/client.entity";
import Order from "../domain/order.entity";
import {PaymentFacadeInterface} from "../../payment/facade/payment-facade.interface";
import {CheckoutGateway} from "../gateway/checkout.gateway";
import {InvoiceGatewayInterface} from "../../invoice/gateway/invoice.gateway";
import Invoice from "../../invoice/domain/invoice";
import InvoiceItems from "../../invoice/domain/invoice-items";
import Address from "../../invoice/domain/address";
import ClientAddress from "../../client-adm/domain/address"

export default class PlaceOrderUseCase {
    constructor(
        private readonly facades:
            {
                clientAdm: ClientAdmFacadeInterface,
                productAdm: ProductAdmFacadeInterface,
                storeCatalogAdm: StoreCatalogFacadeInterface
                payment: PaymentFacadeInterface,
                order: CheckoutGateway,
                invoice: InvoiceGatewayInterface
            }) {}

    async execute(input: InputDtoPlaceOrder): Promise<OutputDtoPlaceOrder> {
        const client = await this.facades.clientAdm.find({ id: input.clientId });
        if (!client) {
            throw new Error("Client not found.");
        }
        if (!input.products.length) {
            throw new Error("Products should be in Stock and Price greater than zero");
        }
        const productsStock = await Promise.all(input.products.map(p =>
            this.facades.productAdm.checkStock({ productId: p.productId })
        ))
        const productsOutStock = productsStock.reduce((acc, p) => {
            if (!p.stock) acc.push(p.productId);
            return acc;
        }, [] as Array<string>);
        if (productsOutStock.length) {
            throw new Error(`The Products: ${productsStock.join(', ')} must be in Stock`);
        }
        const productsCatalog = await Promise.all(productsStock.map(async p => this.facades.storeCatalogAdm.find({ id: p.productId })))
        const products = productsCatalog.map(p => new Product({ id: new Id(p.id), name: p.name, description: p.description, salesPrice: p.salesPrice }))
        const c = new Client({
            id: new Id(client.id),
            email: client.email,
            name: client.name,
            address: new ClientAddress({city:client.address.city, number: client.address.number, state: client.address.state, zipCode: client.address.zipCode, street: client.address.street, complement: client.address.complement})
        })
        const order = new Order({ id: new Id(), client: c, products });
        const payment = await this.facades.payment.process({
            orderId: order.id.toString(),
            amount: order.total
        })
        const invoice = new Invoice({
            id: new Id(),
            address: new Address({ complement: client.address.complement, street: client.address.street, zipCode: client.address.zipCode, state: client.address.state,city: client.address.city, number: client.address.number}),
            name: client.name,
            createdAt: new Date(),
            document: client.document,
            items: products.map(p => new InvoiceItems({ id: p.id, name: p.name, createdAt: p.createdAt, price: p.salesPrice, updatedAt: p.updatedAt }))
        })
        payment.status === 'approved' && await this.facades.invoice.generate(invoice);
        payment.status === 'approved' && order.approved();
        await this.facades.order.addOrder(order);
        return {
            id: order.id.toString(),
            status: order.status,
            total: order.total,
            invoiceId: payment.status === 'approved' ? invoice.id.toString() : null,
            products: products.map(p => ({ productId: p.id.toString() }))
        }
    }
}