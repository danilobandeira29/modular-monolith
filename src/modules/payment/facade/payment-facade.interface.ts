export interface InputPaymentFacadeSaveDto {
    orderId: string;
    amount: number;
}

export interface OutputPaymentFacadeSaveDto {
    transactionId: string;
    orderId: string;
    status: string;
    amount: number;
    createdAt: Date;
    updatedAt: Date;
}


export interface PaymentFacadeInterface {
    process(input: InputPaymentFacadeSaveDto): Promise<OutputPaymentFacadeSaveDto>
}