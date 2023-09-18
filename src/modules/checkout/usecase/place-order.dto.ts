export interface InputDtoPlaceOrder {
    clientId: string;
    products: {
        productId: string;
    }[];
}

export interface OutputDtoPlaceOrder {
    id: string;
    invoiceId: string | null;
    status: string;
    total: number;
    products: {
        productId: string;
    }[];
}
