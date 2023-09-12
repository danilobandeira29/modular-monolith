import Order from "../domain/order.entity";

export interface CheckoutGateway {
    addOrder(order: Order): Promise<void>;
    findOrder(ctx: {id: string}): Promise<Order | null>;
}