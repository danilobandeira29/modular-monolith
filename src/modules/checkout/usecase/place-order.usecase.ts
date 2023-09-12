import {InputDtoPlaceOrder, OutputDtoPlaceOrder} from "./place-order.dto";

export default class PlaceOrderUseCase {
    constructor() {
    }

    async execute(input: InputDtoPlaceOrder): Promise<OutputDtoPlaceOrder> {
        // buscar client. quando nao encontrar, client not found
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