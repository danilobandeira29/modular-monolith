import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
    tableName: "orders",
    timestamps: false,
})
export class OrderModel extends Model {
    @PrimaryKey
    @Column({ allowNull: false })
    declare     id: string;

    @Column({ allowNull: false })
    declare     status: string;

    @Column({ allowNull: false })
    declare     createdAt: Date;

    @Column({ allowNull: false })
    declare     updatedAt: Date;
}