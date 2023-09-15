import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
    tableName: "products",
    timestamps: false,
})
export class ProductCatalogModel extends Model {
    @PrimaryKey
    @Column({ allowNull: false })
    declare     id: string;

    @Column({ allowNull: false })
    declare     name: string;

    @Column({ allowNull: false })
    declare     description: string;

    // @TODO: salesPrice maybe is different of purchasePrice. you should create another column or table to handler this
    @Column({ allowNull: false, field: 'purchasePrice' })
    declare     salesPrice: number;
}
