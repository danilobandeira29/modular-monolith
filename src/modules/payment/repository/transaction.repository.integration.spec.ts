import { Sequelize } from "sequelize-typescript";
import Transaction from "../domain/transaction";
import { TransactionModel } from "./transaction.model";
import TransactionRepository from "./transaction.repository";
import Id from "../../@shared/domain/value-object/id-object";

describe("TransactionRepository test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });
        await sequelize.addModels([TransactionModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should save a transaction", async () => {
        const transaction = new Transaction({
            id: new Id("1"),
            amount: 100,
            orderId: "1",
        });
        transaction.approve();
        const repository = new TransactionRepository();
        const result = await repository.save(transaction);
        expect(result.id.toString()).toBe(transaction.id.toString());
        expect(result.status).toBe("approved");
        expect(result.amount).toBe(transaction.amount);
        expect(result.orderId).toBe(transaction.orderId);
    });
});