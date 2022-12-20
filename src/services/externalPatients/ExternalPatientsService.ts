import { inject, injectable } from "inversify";
import { IOCServiceTypes } from "../../inversify/iocTypes";

@injectable()
export class ExternalPatientsService implements IExternalPatientsService {

    constructor() { }

    public searchFromUno = async (params: IPatientSearchParams) => {
        throw new Error("not implemented");

    }
    public getFromUno = async (patientId: string) => {
        throw new Error("not implemented");
    }

}