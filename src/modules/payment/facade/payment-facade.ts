import { OutputPaymentFacadeSaveDto, InputPaymentFacadeSaveDto, PaymentFacadeInterface } from "./payment-facade.interface";
import ProcessPaymentUseCase from "../usecase/process-payment/process-payment.usecase";

export default class PaymentFacade implements PaymentFacadeInterface {
    constructor(private useCase: { process: ProcessPaymentUseCase } ) {}
    process(input: InputPaymentFacadeSaveDto): Promise<OutputPaymentFacadeSaveDto> {
        return this.useCase.process.execute(input);
    }
}
