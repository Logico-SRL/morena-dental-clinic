import { inject, injectable } from "inversify";
import { PatientEntity } from "src/repository/entities";
import { UnoAnagraficaEntity } from "src/repository/unoEntities/index"
import { DbService } from "src/services/db/DbService";
import { Like, Repository } from "typeorm";
import { ulid } from "ulid";
import { IOCServiceTypes } from "../../../inversify/iocTypes";
import { IAnagraficaImportService } from "./IAnagraficaImportService";

@injectable()
export class AnagraficaImportService implements IAnagraficaImportService {

    private readonly UnoDbService: IUnoDbService;
    private readonly DbService: IDbService;

    private get getRepo() { return this.DbService.patientsRepo() as Promise<Repository<PatientEntity>> }
    private get getRepoUno() { return this.UnoDbService.anagraficaRepo() as Promise<Repository<UnoAnagraficaEntity>> }

    constructor(
        @inject(IOCServiceTypes.UnoDbService) UnoDbService: IUnoDbService,
        @inject(IOCServiceTypes.DbService) dbService: IDbService) {
        this.UnoDbService = UnoDbService;
        this.DbService = dbService;
    }

    importData = async (importParams: UnoAnagraficaEntity[]) => {

        const repo = await this.getRepo;
        const repoUno = await this.getRepoUno;
        let returnValues: PatientEntity[] = [];

        for (let i = 0; i < importParams.length; i++) {
            // console.log(importParams[i].codice);
            let codiceUNO = importParams[i].codice || 'codiceinesistente';
            const check = await repo.findOne({ where: { 'externalId': codiceUNO } });
            if (check != null) {
                let toBeUpdate = new PatientEntity;
                toBeUpdate.id = check.id;
                toBeUpdate.firstName = importParams[i].nome || undefined;
                toBeUpdate.familyName = importParams[i].cognome || undefined;
                toBeUpdate.fiscalCode = importParams[i].codiceFiscale || undefined;
                toBeUpdate.externalId = codiceUNO;
                toBeUpdate.age = undefined;
                toBeUpdate.gender = importParams[i].sesso || undefined;
                toBeUpdate.dateOfBirth = importParams[i].dataNascita || undefined;
                toBeUpdate.emergencyPhone = undefined;
                toBeUpdate.bloodGroup = undefined;
                toBeUpdate.notes = undefined;
                await repo.save({
                    ...check,      // existing fields
                    ...toBeUpdate // updated fields
                });
                returnValues.push(toBeUpdate);
            }
            else {
                let toBeInsered = new PatientEntity;
                toBeInsered.id = ulid();
                toBeInsered.firstName = importParams[i].nome || undefined;
                toBeInsered.familyName = importParams[i].cognome || undefined;
                toBeInsered.fiscalCode = importParams[i].codiceFiscale || undefined;
                toBeInsered.externalId = importParams[i].id.toString();
                toBeInsered.age = undefined;
                toBeInsered.gender = importParams[i].sesso || undefined;
                toBeInsered.dateOfBirth = importParams[i].dataNascita || undefined;
                toBeInsered.emergencyPhone = undefined;
                toBeInsered.bloodGroup = undefined;
                toBeInsered.notes = undefined;
                const toSave = repo.create(toBeInsered);
                await repo.save(toSave);
                returnValues.push(toBeInsered);
            }
        }
        return returnValues;
    }
}