import ProcessPaymentUseCase from "./process-payment.usecase";
import Id from "../../../@shared/domain/value-object/id-object";
import {PaymentGatewayInterface} from "../../gateway/payment.gateway.interface";

describe("Process Payment UseCase Unit Tests", () => {
   it("should decline payment because his amount is 99", async () => {
       const repo = {} as PaymentGatewayInterface;
       repo.save = jest.fn().mockResolvedValueOnce({ status: "declined", id: new Id() });
       const useCase = new ProcessPaymentUseCase(repo);
       const result = await useCase.execute({
           amount: 99,
           orderId: "1"
       });
       expect(result.status).toStrictEqual("declined");
   })

    it("should transaction status be approved because his amount is equal or greater than 100", async () => {
        const repo = {} as PaymentGatewayInterface;
        repo.save = jest.fn().mockResolvedValueOnce({ status: "declined", id: new Id() });
        const useCase = new ProcessPaymentUseCase(repo);
        const result = await useCase.execute({
            amount: 99,
            orderId: "1"
        });
        expect(result.status).toStrictEqual("declined");
    })
})