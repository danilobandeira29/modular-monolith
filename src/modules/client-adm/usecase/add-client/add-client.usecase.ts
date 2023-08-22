import {ClientGateway} from "../../gateway/client.gateway";
import {InputAddClient, OutputAddClient} from "./add-client.dto";
import {Client} from "../../domain/client.entity";
import Id from "../../../@shared/domain/value-object/id-object";

export default class AddClientUseCase {
    constructor(private readonly repo: ClientGateway) {}

    async execute(input: InputAddClient): Promise<OutputAddClient> {
        const client = new Client({ email: input.email, address: input.address, name: input.name, id: new Id() });
        this.repo.add(client).catch((e) => console.error(e));
        return {
            id: client.id.toString(),
            name: client.name,
            address: client.address,
            email: client.email,
            createdAt: client.createdAt,
            updatedAt: client.updateAt
        };
    }
}