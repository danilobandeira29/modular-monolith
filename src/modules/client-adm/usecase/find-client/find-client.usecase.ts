import {ClientGateway} from "../../gateway/client.gateway";
import {InputFindClient, OutputFindClient} from "./find-client.dto";

export default class FindClientUseCase {
    constructor(private readonly repo: ClientGateway) {}

    async execute(input: InputFindClient): Promise<OutputFindClient> {
        const client = await this.repo.find({ id: input.id });
        if(!client) {
            return null
        }
        return {
            id: input.id.toString(),
            name: client.name,
            address: client.address,
            email: client.email,
            document: client.document,
            createdAt: client.createdAt,
            updatedAt: client.updatedAt
        }
    }
}