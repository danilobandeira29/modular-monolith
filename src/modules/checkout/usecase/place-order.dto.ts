export interface InputDtoPlaceOrder {
    clientId: string;
    products: {
        productId: string;
    }[];
}

export interface OutputDtoPlaceOrder {
    id: string;
    invoiceId: string;
    status: string;
    total: number;
    products: {
        productId: string;
    }[];
}
