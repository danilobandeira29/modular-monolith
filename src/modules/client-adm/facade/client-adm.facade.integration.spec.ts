import {Sequelize} from "sequelize-typescript";
import {ClientModel} from "../repository/client.model";
import ClientRepository from "../repository/client.repository";
import ClientAdmFacadeFactory from "../factory/client-adm.facade.factory";

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
        const facade = ClientAdmFacadeFactory.create();
        await facade.addClient({
            id: "1",
            email: "email@email.com",
            name: "Client Name",
            address: "Address"
        })
        const repo = new ClientRepository();
        const result = await repo.find({ id: "1" });
        expect(result!.id.toString()).toStrictEqual("1");
        expect(result!.name).toStrictEqual("Client Name");
        expect(result!.address).toStrictEqual("Address");
        expect(result!.email).toStrictEqual("email@email.com");
        expect(result!.createdAt).toBeInstanceOf(Date);
        expect(result!.updatedAt).toBeInstanceOf(Date);
    })

    it("should find a Client", async () => {
        const facade = ClientAdmFacadeFactory.create();
        await facade.addClient({
            id: "1",
            email: "email@email.com",
            name: "Client Name",
            address: "Address"
        })
        const result = await facade.find({ id: "1" });
        expect(result!.id.toString()).toStrictEqual("1");
        expect(result!.name).toStrictEqual("Client Name");
        expect(result!.address).toStrictEqual("Address");
        expect(result!.email).toStrictEqual("email@email.com");
        expect(result!.createdAt).toBeInstanceOf(Date);
        expect(result!.updatedAt).toBeInstanceOf(Date);
    })
})
