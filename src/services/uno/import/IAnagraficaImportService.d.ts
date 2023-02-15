import { UnoAnagraficaEntity } from "src/repository/unoEntities/index"
import { PatientEntity } from 'src/repository/entities'

type IAnagraficaImportService = {
    importData: (importParams: UnoAnagraficaEntity[]) => Promise<PatientEntity[]>
}