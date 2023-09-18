export interface InputAddClient {
    name: string;
    email: string;
    document: string;
    address: {
        street: string;
        complement: string;
        number: string;
        zipCode: string;
        state: string;
        city: string;
    };
    id?: string;
}

export interface OutputAddClient {
    id: string;
    name: string;
    email: string;
    address: {
        street: string;
        complement: string;
        number: string;
        zipCode: string;
        state: string;
        city: string;
    };
    createdAt: Date;
    updatedAt: Date;
}
