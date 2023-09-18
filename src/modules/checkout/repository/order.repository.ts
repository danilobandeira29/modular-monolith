import {CheckoutGateway} from "../gateway/checkout.gateway";
import Order from "../domain/order.entity";
import {OrderModel} from "./order.model";
import Id from "../../@shared/domain/value-object/id-object";

export default class OrderRepository implements CheckoutGateway {
    async addOrder(order: Order): Promise<void> {
        await OrderModel.create({
            id: order.id.toString(),
            status: order.status,
            createdAt: order.createdAt,
            updatedAt: order.updatedAt
        })
    }

    async findOrder(ctx: { id: string }): Promise<Order | null> {
        const model = await OrderModel.findByPk(ctx.id);
        if(!model) {
            throw new Error('Order not found');
        }
        return new Order({
            id: new Id(model.id),
            client: {} as any,
            status: model.status,
            products: []
        })
    }

}