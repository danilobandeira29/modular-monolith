import {ClientGateway} from "../gateway/client.gateway";
import {ClientModel} from "./client.model";
import {Client} from "../domain/client.entity";
import Id from "../../@shared/domain/value-object/id-object";
import Address from "../domain/address";

export default class ClientRepository implements ClientGateway {
    async add(client: Client): Promise<void> {
        await ClientModel.create({
            id: client.id.toString(),
            name: client.name,
            street: client.address.street,
            complement: client.address.complement,
            city: client.address.city,
            zipCode: client.address.zipCode,
            state: client.address.state,
            number: client.address.number,
            document: client.document,
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
            document: model.document,
            address: new Address({ state: model.state, number: model.number, complement: model.complement, city: model.city, zipCode: model.zipCode, street: model.street }),
            email: model.email
        })
    }
}
