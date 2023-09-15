import {InputDtoPlaceOrder, OutputDtoPlaceOrder} from "./place-order.dto";
import {ClientAdmFacadeInterface} from "../../client-adm/facade/client-adm.facade.interface";
import {ProductAdmFacadeInterface} from "../../product-adm/facade/product-adm.facade.interface";
import {StoreCatalogFacadeInterface} from "../../store-catalog/facade/store-catalog.facade.interface";
import Product from "../domain/product.entity";
import Id from "../../@shared/domain/value-object/id-object";
import Client from "../domain/client.entity";
import Order from "../domain/order.entity";

export default class PlaceOrderUseCase {
    constructor(
        private readonly facades:
            {
                clientAdm: ClientAdmFacadeInterface,
                productAdm: ProductAdmFacadeInterface,
                storeCatalogAdm: StoreCatalogFacadeInterface
            }) {}

    async execute(input: InputDtoPlaceOrder): Promise<OutputDtoPlaceOrder> {
        const client = await this.facades.clientAdm.find({ id: input.clientId });
        if (!client) {
            throw new Error("Client not found.");
        }
        if (!input.products.length) {
            throw new Error("Products should be in Stock and Price greater than zero");
        }
        const c = new Client({ id: new Id(client.id), email: client.email, name: client.name, address: client.address })
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
        const order = new Order({ id: new Id(), client: c, products })
        return {} as any;
        // processar o pagamento -> utiliza facade de payment para isso
        // caso pagamento seja aprovado, devemos gerar a fatura
        // quando a fatura for gerada, vou mudar o status da order para approved
        // return dto
    }
}