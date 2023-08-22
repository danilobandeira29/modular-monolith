export interface InputFindClient {
    id: string;
}

export interface OutputFindClient {
    id: string;
    name: string;
    address: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}
