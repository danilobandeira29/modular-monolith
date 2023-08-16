export interface InputProductDto {
    name: string;
    description: string;
    purchasePrice: number;
    stock: number;
}

export interface OutputProductDto {
    id: string;
    name: string;
    description: string;
    purchasePrice: number;
    stock: number;
}
