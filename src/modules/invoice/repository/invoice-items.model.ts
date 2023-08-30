import {BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table} from "sequelize-typescript";
import InvoiceModel from "./invoice.model";
import Invoice from "../domain/invoice";

@Table({
    tableName: "invoice_items",
    timestamps: false,
})
export default class InvoiceItemsModel extends Model {
    @PrimaryKey
    @Column({ allowNull: false })
    declare     id: string;

    @Column({ allowNull: false })
    declare     name: string;

    @Column({ allowNull: false })
    declare price: number;

    @BelongsTo(() => InvoiceModel)
    declare invoice: Invoice;

    @ForeignKey(() => InvoiceModel)
    @Column
    declare invoice_id: string;

    @Column({ allowNull: false })
    declare     createdAt: Date;

    @Column({ allowNull: false })
    declare     updatedAt: Date;
}