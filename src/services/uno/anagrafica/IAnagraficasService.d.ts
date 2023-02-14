import { AAnagrafica } from "src/repository/unoEntities/entities/AAnagrafica"

type IAnagraficasService = {
    find: (searchParams: IUnoAnagraficaSearchParams) => Promise<AAnagrafica[]>
}