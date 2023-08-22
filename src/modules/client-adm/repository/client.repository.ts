import {ClientGateway} from "../gateway/client.gateway";
import {ClientModel} from "./client.model";
import {Client} from "../domain/client.entity";
import Id from "../../@shared/domain/value-object/id-object";

export default class ClientRepository implements ClientGateway {
    async add(client: Client): Promise<void> {
        await ClientModel.create({
            id: client.id.toString(),
            name: client.name,
            address: client.address,
            email: client.email,
            createdAt: client.createdAt,
            updatedAt: client.updatedAt
        });
        return;
    }

    async find(ctx: { id: string }): Promise<Client> {
        const model = await ClientModel.findByPk(ctx.id);
        if (!model) {
            throw new Error("Client not found");
        }
        return new Client({
            id: new Id(model.id),
            name: model.name,
            address: model.address,
            email: model.email
        })
    }
}
