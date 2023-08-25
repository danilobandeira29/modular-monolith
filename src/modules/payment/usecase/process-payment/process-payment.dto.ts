export interface InputProcessPaymentDto {
    orderId: string;
    amount: number;
}

export interface OutputProcessPaymentDto {
    transactionId: string;
    orderId: string;
    status: string;
    amount: number;
    createdAt: Date;
    updatedAt: Date;
}
