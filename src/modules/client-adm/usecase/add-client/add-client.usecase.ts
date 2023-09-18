import {ClientGateway} from "../../gateway/client.gateway";
import {InputAddClient, OutputAddClient} from "./add-client.dto";
import {Client} from "../../domain/client.entity";
import Id from "../../../@shared/domain/value-object/id-object";
import Address from "../../domain/address";

export default class AddClientUseCase {
    constructor(private readonly repo: ClientGateway) {}

    async execute(input: InputAddClient): Promise<OutputAddClient> {
        const client = new Client({ document: input.document, email: input.email, address: new Address({ zipCode: input.address.zipCode, street: input.address.street, state: input.address.state, city: input.address.city, complement: input.address.complement, number: input.address.number }), name: input.name, id: new Id(input.id) });
        this.repo.add(client).catch((e) => console.error(e));
        return {
            id: client.id.toString(),
            name: client.name,
            address: client.address,
            email: client.email,
            createdAt: client.createdAt,
            updatedAt: client.updatedAt
        };
    }
}