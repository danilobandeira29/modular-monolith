import {Sequelize} from "sequelize-typescript";
import {ClientModel} from "./client.model";
import {Client} from "../domain/client.entity";
import ClientRepository from "./client.repository";
import Id from "../../@shared/domain/value-object/id-object";
import Address from "../domain/address";

describe("Client Repository Integration Tests", () => {
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

    it("should find a client", async () => {
        const model = await ClientModel.create({
            id: "1",
            email: "email@email.com",
            address: "Address",
            name: "Client Name",
            createdAt: new Date(),
            updatedAt: new Date()
        });
        const result = await new ClientRepository().find({ id: "1" });
        expect(result.id.toString()).toStrictEqual("1");
        expect(result.email).toStrictEqual("email@email.com");
        expect(result.address).toStrictEqual("Address");
        expect(result.name).toStrictEqual("Client Name");
        expect(result.createdAt).toBeInstanceOf(Date);
        expect(result.updatedAt).toBeInstanceOf(Date);
    });


    it("should add client", async () => {
        const client = new Client({
            id: new Id("1"),
            name: "Client Name",
            document: '1',
            address: new Address({ street: 'street', zipCode: '1', city: 'city', complement: 'complement', number: '1', state: 'state' }),
            email: "email@email.com"
        })
        await new ClientRepository().add(client);
        const model = await ClientModel.findByPk("1");
        expect(model!.id.toString()).toStrictEqual("1");
        expect(model!.email).toStrictEqual("email@email.com");
        expect(model!.street).toStrictEqual("street");
        expect(model!.name).toStrictEqual("Client Name");
        expect(model!.createdAt).toBeInstanceOf(Date);
        expect(model!.updatedAt).toBeInstanceOf(Date);
    })
})