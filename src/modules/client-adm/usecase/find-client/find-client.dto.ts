export interface InputFindClient {
    id: string;
}

export type OutputFindClient = null | {
    id: string;
    name: string;
    document: string;
    address: {
        complement: string;
        number: string;
        street: string;
        city: string;
        state: string;
        zipCode: string;
    };
    email: string;
    createdAt: Date;
    updatedAt: Date;
}
