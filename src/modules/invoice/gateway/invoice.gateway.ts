import Invoice from "../domain/invoice";

export interface InvoiceGatewayInterface {
    find(ctx: { id: string }): Promise<Invoice>
    generate(entity: Invoice): Promise<void>;
}
