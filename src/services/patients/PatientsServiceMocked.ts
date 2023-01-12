import { injectable } from "inversify";
import { v1 } from 'uuid';

const externalPatients: IExternalPatient[] = [
    {
        id: 'a',
        name: 'mario',
        surname: 'rossi'
    },
    {
        id: 'b',
        name: 'gianni',
        surname: 'pinotto'
    }, {
        id: 'c',
        name: 'stanlio',
        surname: 'olio'
    }
]

const patients: IPatient[] = [
    {
        id: '1',
        firstName: 'pippo'
    },
    {
        id: '2',
        firstName: 'paperino'
    }, {
        id: '3',
        firstName: 'pluto'
    }
]

@injectable()
export class PatientsServiceMocked implements IPatientsService {

    constructor() { }

    public import = async (externalPatient: IExternalPatient) => {
        const p: IPatient = {
            id: v1(),
            firstName: externalPatient.name,
            externalId: externalPatient.id
        }

        return p;

    }

    public searchExternal = async (params: IPatientSearchParams) => {

        const reg = new RegExp(params.fullText, 'i');
        let ret = externalPatients.filter(a => reg.test(a.name))
        ret = ret.concat(externalPatients.filter(a => reg.test(a.surname)))

        return ret;
    }

    public save = async (patient: IPatient) => {
        throw new Error("not implemented");
    }

    public find = async (patientId: string) => {
        return patients.find(p => p.id === patientId)
    }

    public list = async () => {
        return patients;
    }

}