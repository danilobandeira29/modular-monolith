import {Sequelize} from "sequelize-typescript";
import {ClientModel} from "../repository/client.model";
import ClientRepository from "../repository/client.repository";
import AddClientUseCase from "../usecase/add-client/add-client.usecase";
import ClientAdmFacade from "./client-adm.facade";

describe("Client Adm Facade Integration Tests", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });
        await sequelize.addModels([ClientModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should add Client", async () => {
        const repo = new ClientRepository();
        const addClientUseCase = new AddClientUseCase(repo);
        const facade = new ClientAdmFacade({ addClient: addClientUseCase, find: {} as any })
        await facade.addClient({
            id: "1",
            email: "email@email.com",
            name: "Client Name",
            address: "Address"
        })
        const result = await repo.find({ id: "1" });
        expect(result.id.toString()).toStrictEqual("1");
        expect(result.name).toStrictEqual("Client Name");
        expect(result.address).toStrictEqual("Address");
        expect(result.email).toStrictEqual("email@email.com");
        expect(result.createdAt).toBeInstanceOf(Date);
        expect(result.updatedAt).toBeInstanceOf(Date);
    })
})
