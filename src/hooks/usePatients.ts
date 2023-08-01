// 'use client'
import { useStore } from '@nanostores/react';
import { atom } from 'nanostores';
import { useEffect } from 'react';
import { IOCServiceTypes } from "../inversify/iocTypes";
import { useService } from "../inversify/useService";
import { AAnagrafica } from '../repository/unoEntities/entities/AAnagrafica';
import { convertPropsToDayjs, convertPropsToDayjsArr } from '../utils/convertPropsToDayjs';
import { useAuthSession } from './useAuthSession';
import { useWebLogger } from './useWebLogger';

const patientsStore = atom<IPatient[]>([]);
const loadingPatientsStore = atom<boolean>(false)

const initialized = { current: false };

const abortController = {
    current: new AbortController()
}

export const usePatients = () => {
    const logger = useWebLogger();
    // const [patients, setPatients] = React.useState<IPatient[]>([])
    // const [loading, setLoading] = React.useState<boolean>(false)
    const httpService = useService<IHttpService>(IOCServiceTypes.HttpService)
    const patients = useStore(patientsStore);
    const loadingPatients = useStore(loadingPatientsStore);

    const { isLoggedIn } = useAuthSession();

    useEffect(() => {

        if (!initialized.current && isLoggedIn) {
            initialized.current = true;

            if (abortController.current) {
                abortController.current.abort();
                abortController.current = new AbortController();
            }

            fetchFilteredPatients({}, abortController.current);

            return () => {

                // initialized.current = false;
            }
        }

    }, [isLoggedIn])


    const fetchFilteredPatients = (params: IPatientSearchParams, controller?: AbortController) => {
        // const controller = new AbortController()
        loadingPatientsStore.set(true);
        const { fromVisitDate, toVisitDate, ...rest } = params
        let p: any = rest;
        if (fromVisitDate)
            p.fromVisitDate = fromVisitDate.toISOString()

        if (toVisitDate)
            p.toVisitDate = toVisitDate.toISOString()

        const pars = new URLSearchParams(p);
        return httpService.get<IPatient[]>(`/api/protected/patients?${pars.toString()}`, { signal: controller?.signal })
            .then(d => {
                patientsStore.set(convertPropsToDayjsArr(['dateOfBirth'], d.data));
            })
            .catch(() => {
                patientsStore.set([]);

            })
            .finally(() => {
                loadingPatientsStore.set(false);
            })
        // return controller;
    }

    const createPatient = async (p: IPatient) => {
        loadingPatientsStore.set(true);
        if (p.tags) {
            p.tags.forEach(t => {
                t.patients = undefined;
                t.projects = undefined;
                t.visits = undefined;
            })
        }
        httpService.post<IPatient>(`/api/protected/patients`, p).then(d => {
            const curr = patientsStore.get();
            patientsStore.set([...curr, convertPropsToDayjs(['dateOfBirth'], d.data)]);
        }).finally(() => {
            loadingPatientsStore.set(false);
        })
    }

    const savePatient = async (p: IPatient) => {
        loadingPatientsStore.set(true);

        httpService.put<IPatient>(`/api/protected/patients/${p.id}`, p).then(d => {
            const curr = [...patientsStore.get()];
            const ind = curr.findIndex(c => c.id === p.id);
            curr.splice(ind, 1, p)
            patientsStore.set(curr);
        }).finally(() => {
            loadingPatientsStore.set(false);
        })
    }

    const searchExternalAnagrafica = async (search: IUnoAnagraficaSearchParams) => {
        const pars = new URLSearchParams(search)
        return httpService.get<UnoAnagraficaEntity[]>(`/api/protected/uno/anagrafica?${pars.toString()}`)
            .then(res => res.data)
            .catch(err => {
                logger.error('usePatients searchExternalAnagrafica err', err);
                return []
            })
    }

    const importExternalAnagrafica = async (users: AAnagrafica[]) => {
        return httpService.post<IPatient[]>(`/api/protected/uno/import`, users)
            .then(res => res.data)
            .catch(err => {
                logger.error('usePatients importExternalAnagrafica err', err);
                throw err;
            })
    }

    return { patients, loadingPatients, fetchFilteredPatients, createPatient, savePatient, searchExternalAnagrafica, importExternalAnagrafica };
}
