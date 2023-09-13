export interface InputAddClientFacade {
    name: string;
    email: string;
    address: string;
    id?: string;
}

export type OutputFindClientFacade = null | {
    id: string;
    name: string;
    email: string;
    address: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface ClientAdmFacadeInterface {
    addClient(input: InputAddClientFacade): Promise<void>;
    find(input: { id: string }): Promise<OutputFindClientFacade | null>;
}
