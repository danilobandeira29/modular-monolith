export interface InputFindClient {
    id: string;
}

export type OutputFindClient = null | {
    id: string;
    name: string;
    address: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}
