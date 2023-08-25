import {PaymentFacadeInterface} from "../facade/payment-facade.interface";
import TransactionRepository from "../repository/transaction.repository";
import ProcessPaymentUseCase from "../usecase/process-payment/process-payment.usecase";
import PaymentFacade from "../facade/payment-facade";

export default class PaymentFactory {
    static create(): PaymentFacadeInterface {
        const repo = new TransactionRepository();
        const useCase = new ProcessPaymentUseCase(repo);
        return new PaymentFacade({ process: useCase });
    }
}
