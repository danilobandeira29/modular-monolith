import {ClientAdmFacadeInterface, InputAddClientFacade, OutputFindClientFacade} from "./client-adm.facade.interface";
import AddClientUseCase from "../usecase/add-client/add-client.usecase";
import FindClientUseCase from "../usecase/find-client/find-client.usecase";

export default class ClientAdmFacade implements ClientAdmFacadeInterface {

    constructor(private readonly _useCases: { addClient: AddClientUseCase; find: FindClientUseCase }) {
    }

    async addClient(input: InputAddClientFacade): Promise<void> {
        await this._useCases.addClient.execute(input);
    }

    async find(input: { id: string }): Promise<OutputFindClientFacade> {
        return this._useCases.find.execute(input);
    }

}