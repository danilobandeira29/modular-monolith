export interface InputAddClient {
    name: string;
    email: string;
    address: string;
    id?: string;
}

export interface OutputAddClient {
    id: string;
    name: string;
    email: string;
    address: string;
    createdAt: Date;
    updatedAt: Date;
}
