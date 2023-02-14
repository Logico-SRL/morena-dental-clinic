import { inject, injectable } from "inversify";
import type { IAnagraficasService } from "src/services/uno/anagrafica/IAnagraficasService";
import { IOCServiceTypes } from "../../../inversify/iocTypes";
import { BaseController } from "../../baseController";


type QueryType = {
    search: string
}

@injectable()
export class AnagraficasController extends BaseController {

    private anagraficasService: IAnagraficasService;

    private get nome() { return (this.req.query as { nome: string }).nome }
    private get cognome() { return (this.req.query as { cognome: string }).cognome }
    private get codiceFiscale() { return (this.req.query as { codiceFiscale: string }).codiceFiscale }

    constructor(@inject(IOCServiceTypes.AnagraficasService) serv: IAnagraficasService) {
        super();
        this.anagraficasService = serv;
    }

    GET = async () => {
        const params: IUnoAnagraficaSearchParams = {
            nome: this.nome,
            cognome: this.cognome,
            codiceFiscale: this.codiceFiscale
        }
        console.log('------------------------------------------');
        console.log(params);
        const data = await this.anagraficasService.find(params)
        console.log('------------------------------------------');
        return this.res.status(200).json(data);
    }
}