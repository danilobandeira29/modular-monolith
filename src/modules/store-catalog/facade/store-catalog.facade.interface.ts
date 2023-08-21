export interface OutputFindDto {
    id: string;
    name: string;
    description: string;
    salesPrice: number;
}

export interface OutputFindAllDto {
    products: {
        id: string;
        name: string;
        description: string;
        salesPrice: number;
    }[];
}

export interface StoreCatalogFacadeInterface {
    find(ctx: { id: string }): Promise<OutputFindDto>;
    findAll(): Promise<OutputFindAllDto>;
}