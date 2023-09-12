import { inject, injectable } from "inversify";
import { IOCServiceTypes } from "../../inversify/iocTypes";
import { BaseController } from "../baseController";

@injectable()
export class PatientController extends BaseController {
    private cacheService: ICacheService<UnoAnagrafica>;
    private patientsService: IPatientsService;
    private unoDbService: IUnoDbService;

    private get patientId() { return (this.req.query as { values: string[] }).values[0] }
    private get db() { return (this.req.query as { values: string[] }).values.length > 1 ? 'uno' : 'local' }

    private unoUserKey = (id: string) => { return `uno.db.anagrafica.${id}` }

    constructor(
        @inject(IOCServiceTypes.CacheService) cacheServ: ICacheService,
        @inject(IOCServiceTypes.PatientsService) serv: IPatientsService,
        @inject(IOCServiceTypes.UnoDbService) dbServ: IUnoDbService) {
        super();
        this.cacheService = cacheServ;
        this.patientsService = serv;
        this.unoDbService = dbServ;
    }

    GET = async () => {
        let result = await this.patientsService.get(this.patientId);
        if (this.db === 'local') {
            return this.res.status(200).json(result)
        } else {
            if (!result) {
                throw new Error(`patient id ${this.patientId} not found`);
            }
            const repo = await this.unoDbService.anagraficaRepo();
            const unoId = result.externalId;

            let res: any = this.cacheService.get(this.unoUserKey(unoId));

            if (!res) {
                console.info(`res for id ${unoId} not found in cache`)

                const a = await repo.findOne({
                    where: {
                        'id': +unoId
                    },
                    relations: {
                        aAnagraficaFamiglias: true,
                        aAnagraficaIndirizzis: true,
                        aAnagraficaRecapitis: true,
                        // agImpegnis: true,
                        // // aPazienti: true,
                        // // aPazientiAnamnesis: true,
                        // mCureTestatas: {
                        //     // mCureAllegatis: true,
                        //     mCureChecklists: true,
                        //     mCureRighes: true,
                        //     mCureSedutes: true,
                        //     mPrescrizionis: true,
                        //     mSterilizzazioneTrays: true
                        // },
                        // mDiarioAnnotazionis: true,
                        // // mDocumentiTs: true,
                        // // mIgieneTestatas: true,
                        // // mImpiantiTestatas: true,
                        // // mOrtoTestatas: true,
                        // // mPerioTestatas: true,
                        // // mRichiamis: true,
                        // // mSituazioneDentes: true,
                    }
                });
                const b = await repo.findOne({
                    where: {
                        'id': +unoId
                    },
                    relations: {
                        agImpegnis: true,
                        mDiarioAnnotazionis: true,
                    }

                });

                const c = await repo.findOne({
                    where: {
                        'id': +unoId
                    },
                    relations: {
                        mCureTestatas: {
                            mCureAllegatis: true,
                            mCureChecklists: true,
                            mCureRighes: true,
                            mCureSedutes: true,
                            mPrescrizionis: true,
                            mSterilizzazioneTrays: true
                        },
                    }

                });

                // const { aAnagraficaFamiglias2, aAnagraficaIndirizzis, aAnagraficaRecapitis } = a as UnoAnagrafica
                const { agImpegnis, mDiarioAnnotazionis } = b as UnoAnagrafica
                const { mCureTestatas } = c as UnoAnagrafica
                res = {
                    ...a, agImpegnis, mDiarioAnnotazionis, mCureTestatas
                }

                this.cacheService.set(this.unoUserKey(unoId), res);
            } else {
                console.info(`res for id ${unoId} found in cache`)
            }

            return this.res.status(200).json(res)
        }
    }

    PUT = async () => {
        const p = this.req.body as IPatient
        const ret = await this.patientsService.save(p);
        return this.res.status(200).json(ret)
    }

}