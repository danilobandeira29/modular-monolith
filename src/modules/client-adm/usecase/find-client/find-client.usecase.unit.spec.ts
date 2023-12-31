import {ClientGateway} from "../../gateway/client.gateway";
import {Client} from "../../domain/client.entity";
import Id from "../../../@shared/domain/value-object/id-object";
import FindClientUseCase from "./find-client.usecase";
import Address from "../../domain/address";

describe("Find Client UseCase Unit Tests", () => {
    it("should find a client", async () => {
        const repo = {} as ClientGateway;
        const client = new Client({
            id: new Id("1"),
            email: "email@email.com",
            document: '1',
            address: new Address({ street: 'street', zipCode: '1', number: '1', state: 'state', complement: 'complement', city: 'city' }),
            name: "Client Name"
        })
        repo.find = jest.fn().mockResolvedValueOnce(client);
        const result = await new FindClientUseCase(repo).execute({ id: client.id.toString() });
        expect(repo.find).toHaveBeenCalledTimes(1);
        expect(result!.id).toBeDefined();
        expect(result!.name).toStrictEqual("Client Name");
        expect(result!.address.street).toStrictEqual("street");
        expect(result!.email).toStrictEqual("email@email.com");
        expect(result!.createdAt).toBeInstanceOf(Date);
        expect(result!.updatedAt).toBeInstanceOf(Date);
    });
});
