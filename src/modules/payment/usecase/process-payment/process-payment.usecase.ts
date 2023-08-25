import {InputProcessPaymentDto, OutputProcessPaymentDto} from "./process-payment.dto";
import Transaction from "../../domain/transaction";
import {PaymentGatewayInterface} from "../../gateway/payment.gateway.interface";

export default class ProcessPaymentUseCase {
    constructor(private readonly repo: PaymentGatewayInterface) {}

    async execute(input: InputProcessPaymentDto): Promise<OutputProcessPaymentDto> {
        const transaction = new Transaction({
            orderId: input.orderId,
            amount: input.amount
        });
        transaction.process();
        const result = await this.repo.save(transaction);
        return {
            amount: result.amount,
            orderId: result.orderId,
            status: result.status,
            createdAt: result.createdAt,
            updatedAt: result.updatedAt,
            transactionId: result.id.toString()
        }
    }
}