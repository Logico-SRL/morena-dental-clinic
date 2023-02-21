import { UnoAgImpegni } from "src/repository/unoEntities/index"
import { PatientEntity } from 'src/repository/entities'

type IImpegniService = {
    find: (take: number) => Promise<IAppointment[]>
}