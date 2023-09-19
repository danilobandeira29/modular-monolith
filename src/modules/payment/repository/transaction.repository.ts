import Transaction from "../domain/transaction";
import {TransactionModel} from "./transaction.model";
import {PaymentGatewayInterface} from "../gateway/payment.gateway.interface";

export default class TransactionRepository implements PaymentGatewayInterface {
    async save(input: Transaction): Promise<Transaction> {
        await TransactionModel.create({
            id: input.id.toString(),
            orderId: input.orderId,
            amount: input.amount,
            createdAt: input.createdAt,
            updatedAt: input.updatedAt,
            status: input.status
        })
        return new Transaction({
            id: input.id,
            orderId: input.orderId,
            amount: input.amount,
            status: input.status
        })
    }
}