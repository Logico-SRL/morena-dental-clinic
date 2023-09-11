import { inject, injectable } from "inversify";
import type { IAnagraficaImportService } from "src/services/uno/import/IAnagraficaImportService";
import { IOCServiceTypes } from "../../../inversify/iocTypes";
import { BaseController } from "../../baseController";


type QueryType = {
    search: string
}

@injectable()
export class AnagraficaImportController extends BaseController {

    private anagraficaImportService: IAnagraficaImportService;
    constructor(@inject(IOCServiceTypes.AnagraficaImportService) serv: IAnagraficaImportService) {
        super();
        this.anagraficaImportService = serv;
    }

    POST = async () => {
        const anagrafiche = this.req.body as UnoAnagrafica[];
        const result = await this.anagraficaImportService.importData(anagrafiche);
        return this.res.status(200).json(result)
    }
}