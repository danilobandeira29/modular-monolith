import {Sequelize} from "sequelize-typescript";
import {ClientModel} from "../../client-adm/repository/client.model";
import ClientAdmFacadeFactory from "../../client-adm/factory/client-adm.facade.factory";
import Id from "../../@shared/domain/value-object/id-object";
import PlaceOrderUseCase from "./place-order.usecase";
import ProductAdmFactoryFacade from "../../product-adm/factory/product-adm.factory.facade";
import { ProductCatalogModel as ProductCatalogModel } from "../../store-catalog/repository/product-catalog.model";
import StoreCatalogFactoryFacade from "../../store-catalog/factory/store-catalog.factory";
import {ProductModel} from "../../product-adm/repository/product.model";
import PaymentFactory from "../../payment/factory/payment.factory";
import InvoiceRepository from "../../invoice/repository/invoice.repository";
import OrderRepository from "../repository/order.repository";
import {TransactionModel} from "../../payment/repository/transaction.model";
import InvoiceModel from "../../invoice/repository/invoice.model";
import InvoiceItemsModel from "../../invoice/repository/invoice-items.model";
import {OrderModel} from "../repository/order.model";

describe("Place Order Integration Tests", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });
        sequelize.addModels([ClientModel, ProductCatalogModel, ProductModel, TransactionModel, InvoiceModel, InvoiceItemsModel, OrderModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should place a order and status be 'approved' because order's total is more or equal to one hundred and contains invoiceId", async () => {
        const clientAdm = ClientAdmFacadeFactory.create();
        const clientId = new Id().toString();
        await clientAdm.addClient({ id: clientId, document: '1' ,name: 'Danilo Bandeira', email: 'email@email.com', address: { street: 'street', zipCode: '1', number: '1', state: 'state', complement: 'complement', city: 'city' } });
        const productAdm = ProductAdmFactoryFacade.create();
        const productId = new Id().toString();
        const productId2 = new Id().toString();
        const productId3 = new Id().toString();
        const productId4 = new Id().toString();
        await productAdm.addProduct({ id: productId, name: '', stock: 1, purchasePrice: 100, description: '' });
        await productAdm.addProduct({ id: productId2, name: '', stock: 2, purchasePrice: 100, description: '' });
        await productAdm.addProduct({ id: productId3, name: '', stock: 10, purchasePrice: 100, description: '' });
        await productAdm.addProduct({ id: productId4, name: '', stock: 200, purchasePrice: 100, description: '' });
        const storeCatalogAdm = StoreCatalogFactoryFacade.create();
        const payment = PaymentFactory.create();
        const invoice = new InvoiceRepository();
        const order = new OrderRepository();
        const useCase = new PlaceOrderUseCase({ clientAdm, productAdm, storeCatalogAdm, payment, invoice, order });
        const result = await useCase.execute({ clientId: clientId, products: [{productId}, {productId: productId2}, {productId: productId3}, {productId: productId4}] });
        expect(result).toStrictEqual({
            id: expect.any(String),
            invoiceId: expect.any(String),
            products: [
                {
                    productId: productId
                },
                {
                    productId: productId2
                },
                {
                    productId: productId3
                },
                {
                    productId: productId4
                },
            ],
            status: "approved",
            total: 400
        });
    })

    it("should place a order and status be 'pending' because order's total is below one hundred and invoiceId be null", async () => {
        const clientAdm = ClientAdmFacadeFactory.create();
        const clientId = new Id().toString();
        await clientAdm.addClient({ id: clientId, document: '1' ,name: 'Danilo Bandeira', email: 'email@email.com', address: { street: 'street', zipCode: '1', number: '1', state: 'state', complement: 'complement', city: 'city' } });
        const productAdm = ProductAdmFactoryFacade.create();
        const productId = new Id().toString();
        const productId2 = new Id().toString();
        const productId3 = new Id().toString();
        const productId4 = new Id().toString();
        await productAdm.addProduct({ id: productId, name: '', stock: 1, purchasePrice: 10, description: '' });
        await productAdm.addProduct({ id: productId2, name: '', stock: 2, purchasePrice: 5, description: '' });
        await productAdm.addProduct({ id: productId3, name: '', stock: 10, purchasePrice: 2, description: '' });
        await productAdm.addProduct({ id: productId4, name: '', stock: 200, purchasePrice: 3, description: '' });
        const storeCatalogAdm = StoreCatalogFactoryFacade.create();
        const payment = PaymentFactory.create();
        const invoice = new InvoiceRepository();
        const order = new OrderRepository();
        const useCase = new PlaceOrderUseCase({ clientAdm, productAdm, storeCatalogAdm, payment, invoice, order });
        const result = await useCase.execute({ clientId: clientId, products: [{productId}, {productId: productId2}, {productId: productId3}, {productId: productId4}] });
        expect(result).toStrictEqual({
            id: expect.any(String),
            invoiceId: null,
            products: [
                {
                    productId: productId
                },
                {
                    productId: productId2
                },
                {
                    productId: productId3
                },
                {
                    productId: productId4
                },
            ],
            status: "pending",
            total: 20
        });
    })


    it("should throw errors when products are empty", async () => {
        const clientAdm = ClientAdmFacadeFactory.create();
        const clientId = new Id().toString();
        await clientAdm.addClient({ id: clientId, document:'1',name: 'Danilo Bandeira', email: 'email@email.com', address: { street: 'street', zipCode: '1', number: '1', state: 'state', complement: 'complement', city: 'city' } });
        const productAdm = ProductAdmFactoryFacade.create();
        const storeCatalogAdm = StoreCatalogFactoryFacade.create();
        const payment = PaymentFactory.create();
        const invoice = new InvoiceRepository();
        const order = new OrderRepository();
        const useCase = new PlaceOrderUseCase({ clientAdm, productAdm, storeCatalogAdm, payment, invoice, order });
        await expect((() => useCase.execute({ clientId: clientId, products: [] }))).rejects.toThrowError("Products should be in Stock and Price greater than zero");
    })

    it("should throw errors when products are not in Stock", async () => {
        const clientAdm = ClientAdmFacadeFactory.create();
        const clientId = new Id().toString();
        await clientAdm.addClient({ id: clientId, document: '1', name: 'Danilo Bandeira', email: 'email@email.com', address: { street: 'street', zipCode: '1', number: '1', state: 'state', complement: 'complement', city: 'city' } });
        const productAdm = ProductAdmFactoryFacade.create();
        const storeCatalogAdm = StoreCatalogFactoryFacade.create();
        const payment = PaymentFactory.create();
        const invoice = new InvoiceRepository();
        const order = new OrderRepository();
        const useCase = new PlaceOrderUseCase({ clientAdm, productAdm, storeCatalogAdm, order, invoice, payment });
        const productId = new Id().toString();
        const productId2 = new Id().toString();
        const productId3 = new Id().toString();
        const productId4 = new Id().toString();
        await productAdm.addProduct({ id: productId, name: '', stock: 0, purchasePrice: 100, description: '' });
        await productAdm.addProduct({ id: productId2, name: '', stock: 0, purchasePrice: 100, description: '' });
        await productAdm.addProduct({ id: productId3, name: '', stock: 0, purchasePrice: 100, description: '' });
        await productAdm.addProduct({ id: productId4, name: '', stock: 0, purchasePrice: 100, description: '' });
        await expect((() => useCase.execute({ clientId: clientId, products: [{ productId }, { productId: productId2 }, { productId: productId3 }, { productId: productId4 }] }))).rejects.toThrowError(/must be in Stock/);
    })
})