import {InputDtoPlaceOrder, OutputDtoPlaceOrder} from "./place-order.dto";
import {ClientAdmFacadeInterface} from "../../client-adm/facade/client-adm.facade.interface";
import {ProductAdmFacadeInterface} from "../../product-adm/facade/product-adm.facade.interface";

export default class PlaceOrderUseCase {
    constructor(private readonly facades: { clientAdm: ClientAdmFacadeInterface, productAdm: ProductAdmFacadeInterface }) {}

    async execute(input: InputDtoPlaceOrder): Promise<OutputDtoPlaceOrder> {
        const client = await this.facades.clientAdm.find({ id: input.clientId });
        if (!client) {
            throw new Error("Client not found.");
        }
        if (!input.products.length) {
            throw new Error("Products should be in Stock and Price greater than zero");
        }
        const products = await Promise.all(input.products.map(p =>
            this.facades.productAdm.checkStock({ productId: p.productId })
        ))
        const productsOutStock = products.reduce((acc, p) => {
            if (!p.stock) acc.push(p.productId);
            return acc;
        }, [] as Array<string>);
        if (productsOutStock.length) {
            throw new Error(`The Products: ${products.join(', ')} must be in Stock`);
        }
        return {} as any;
        // validar todos os produtos que estao sendo passados(podem vir com 0, verificar stock e afins)
        // recuperar os produtos
        // criar o objeto do client
        // criar o objeto da order(client, products)
        // processar o pagamento -> utiliza facade de payment para isso
        // caso pagamento seja aprovado, devemos gerar a fatura
        // quando a fatura for gerada, vou mudar o status da order para approved
        // return dto
    }
}