import {ClientGateway} from "../../gateway/client.gateway";
import AddClientUseCase from "./add-client.usecase";

describe("Add Client UseCase Unit Tests", () => {
    it("should add client", async () => {
       const repo = {} as ClientGateway;
       repo.add = jest.fn(() => Promise.resolve());
       const result = await new AddClientUseCase(repo).execute({
           name: "Client Name",
           address: {
               number: '1',
               zipCode: '1',
               complement: 'complement',
               city: 'city',
               state: 'state',
               street: 'street'
           },
           document: '1',
           email: "email@email.com"
       });
       expect(repo.add).toHaveBeenCalledTimes(1);
       expect(result.id).toBeDefined();
       expect(result.name).toStrictEqual("Client Name");
       expect(result.address).toStrictEqual("Address");
       expect(result.email).toStrictEqual("email@email.com");
       expect(result.createdAt).toBeInstanceOf(Date);
       expect(result.updatedAt).toBeInstanceOf(Date);
    });
});
