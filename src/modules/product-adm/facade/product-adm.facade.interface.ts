export interface InputAddProductAdmFacade {
    id?: string;
    name: string;
    description: string;
    purchasePrice: number;
    stock: number;
}

export interface OutputAddProductAdmFacade {
    id: string;
    name: string;
    description: string;
    purchasePrice: number;
    stock: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface InputCheckStockProductAdmFacade {
    productId: string;
}

export interface OutputCheckStockProductAdmFacade {
    productId: string;
    stock: number;
}

export interface ProductAdmFacadeInterface {
    addProduct(ctx: InputAddProductAdmFacade): Promise<OutputAddProductAdmFacade>;
    checkStock(ctx: InputCheckStockProductAdmFacade): Promise<OutputCheckStockProductAdmFacade>;
}
