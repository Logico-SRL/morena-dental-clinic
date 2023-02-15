import { inject, injectable } from "inversify";
import { UnoAnagraficaEntity } from "src/repository/unoEntities/index"
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
        const anagrafiche = this.req.body as UnoAnagraficaEntity[];
        const result = await this.anagraficaImportService.importData(anagrafiche);
        return this.res.status(200).json(result)
    }
}