import { inject, injectable } from "inversify";
import { PatientEntity } from "src/repository/entities";
import { repoPatientToPatient } from "src/services/converters";
import { IsNull, MoreThanOrEqual, Not, Repository } from "typeorm";
import { ulid } from "ulid";
import { IOCServiceTypes } from "../../../inversify/iocTypes";
import { Sorter } from "../../../utils/sorter";
import { IImpegniService } from "./IImpegniService";

@injectable()
export class ImpegniService implements IImpegniService {

    private readonly UnoDbService: IUnoDbService;
    private readonly DbService: IDbService;
    private readonly loggerServ: ILogger;

    private get getRepoImpegni() { return this.UnoDbService.impegniRepo() as Promise<Repository<UnoAgImpegni>> }
    private get getRepoAnagrafica() { return this.UnoDbService.anagraficaRepo() as Promise<Repository<UnoAnagrafica>> }
    private get getRepoPostazioni() { return this.UnoDbService.postazioniRepo() as Promise<Repository<UnoTabPostazioni>> }
    private get getRepoPatients() { return this.DbService.patientsRepo() as Promise<Repository<PatientEntity>> }

    constructor(
        @inject(IOCServiceTypes.UnoDbService) UnoDbService: IUnoDbService,
        @inject(IOCServiceTypes.DbService) dbService: IDbService,
        @inject(IOCServiceTypes.LoggerService) loggerServ: ILogger) {
        this.UnoDbService = UnoDbService;
        this.DbService = dbService;
        this.loggerServ = loggerServ;
    }

    find = async (take: number) => {
        const repoImpegni = await this.getRepoImpegni;
        const repoPatients = await this.getRepoPatients;
        //
        const data = await repoImpegni.find({
            take: take,
            where: {
                dataOra: MoreThanOrEqual(new Date()),
                idAnagrafica: Not(IsNull())

            },
            order: { dataOra: "ASC" }
        });
        const res: IAppointment[] = [];
        //
        await Promise.all(data.map(async (unAppuntamento) => {
            if (unAppuntamento.idAnagrafica != null) {
                //
                let descrizionePostazione = 'N/A'
                if (unAppuntamento.idPostazione != null) {
                    let postazione = await this._findPostazioneUno(unAppuntamento.idPostazione)
                    if (postazione != null && postazione.descrizione != null) {
                        descrizionePostazione = postazione.descrizione
                    }
                }
                //
                const patient = await this._findPatient(unAppuntamento.idAnagrafica.toString());
                if (patient.length === 0) {
                    let RecordUno = await this._findAnagraficaUno(unAppuntamento.idAnagrafica);
                    if (RecordUno != null) {
                        let toBeInsered = new PatientEntity;
                        toBeInsered.id = ulid();
                        toBeInsered.firstName = RecordUno.nome || undefined;
                        toBeInsered.familyName = RecordUno.cognome || undefined;
                        toBeInsered.fiscalCode = RecordUno.codiceFiscale || undefined;
                        toBeInsered.externalId = RecordUno.id.toString();
                        toBeInsered.age = undefined;
                        toBeInsered.gender = RecordUno.sesso || undefined;
                        toBeInsered.dateOfBirth = RecordUno.dataNascita || undefined;
                        toBeInsered.emergencyPhone = undefined;
                        toBeInsered.bloodGroup = undefined;
                        toBeInsered.notes = undefined;
                        let inserito = await repoPatients.save(toBeInsered);
                        const appendere: IAppointment = {
                            ...unAppuntamento,
                            idPostazione: { key: String(unAppuntamento.idPostazione), value: descrizionePostazione },
                            statoRecord: { key: String(unAppuntamento.statoRecord), value: 'statoRecord' },
                            tipoImpegno: { key: String(unAppuntamento.tipoImpegno), value: 'tipoImpegno' },
                            categoria: { key: String(unAppuntamento.categoria), value: 'categoria' },
                            colore: { key: String(unAppuntamento.colore), value: 'colore' },
                            patient: repoPatientToPatient(toBeInsered)
                        }
                        res.push(appendere)
                    }
                    else {
                        this.loggerServ.error('Errore nella ricerca su UNO del Paziente' + unAppuntamento.idAnagrafica)
                    }
                }
                else {
                    const appendere: IAppointment = {
                        ...unAppuntamento,
                        idPostazione: { key: String(unAppuntamento.idPostazione), value: descrizionePostazione },
                        statoRecord: { key: String(unAppuntamento.statoRecord), value: 'statoRecord' },
                        tipoImpegno: { key: String(unAppuntamento.tipoImpegno), value: 'tipoImpegno' },
                        categoria: { key: String(unAppuntamento.categoria), value: 'categoria' },
                        colore: { key: String(unAppuntamento.colore), value: 'colore' },
                        patient: repoPatientToPatient(patient[0])
                    }
                    res.push(appendere)
                }
            }
            else {
                this.loggerServ.error('Paziente non valorizzato su Appuntamento con id ' + unAppuntamento.id)
            }
        }));
        return res.sort(new Sorter<IAppointment>('dataOra').sortAsc);
    };

    private _findPatient = async (idUno: string) => {
        const repoPatients = await this.getRepoPatients;
        const res = await repoPatients.find({
            where: {
                externalId: idUno,
            }
        })
        return res;
    }

    private _findAnagraficaUno = async (id: number) => {
        const repoAnagrafica = await this.getRepoAnagrafica;
        const res = await repoAnagrafica.findOne({
            where: {
                'id': id
            }
        })
        return res;
    };

    private _findPostazioneUno = async (id: number) => {
        const repoPostazioni = await this.getRepoPostazioni
        const res = await repoPostazioni.findOne({
            where: {
                'id': id
            }
        })
        return res;
    }
}