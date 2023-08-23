import ClientAdmFacade from "../facade/client-adm.facade";
import ClientRepository from "../repository/client.repository";
import FindClientUseCase from "../usecase/find-client/find-client.usecase";
import AddClientUseCase from "../usecase/add-client/add-client.usecase";
import {ClientAdmFacadeInterface} from "../facade/client-adm.facade.interface";

export default class ClientAdmFacadeFactory {
    static create(): ClientAdmFacadeInterface {
        const repo = new ClientRepository();
        const find = new FindClientUseCase(repo);
        const addClient = new AddClientUseCase(repo);
        return new ClientAdmFacade({ addClient, find });
    }
}