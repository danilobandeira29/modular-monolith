export interface InputAddClientFacade {
    name: string;
    email: string;
    document: string;
    address: {
        complement: string;
        number: string;
        street: string;
        city: string;
        state: string;
        zipCode: string;
    };
    id?: string;
}

export type OutputFindClientFacade = null | {
    id: string;
    name: string;
    email: string;
    document: string;
    address: {
        complement: string;
        number: string;
        street: string;
        city: string;
        state: string;
        zipCode: string;
    };
    createdAt: Date;
    updatedAt: Date;
}

export interface ClientAdmFacadeInterface {
    addClient(input: InputAddClientFacade): Promise<void>;
    find(input: { id: string }): Promise<OutputFindClientFacade | null>;
}
