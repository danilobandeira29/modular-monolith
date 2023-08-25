import Transaction from "../domain/transaction";

export interface PaymentGatewayInterface {
    save(input: Transaction): Promise<Transaction>;
}
