// 'use client'
import { useStore } from '@nanostores/react';
import { atom } from 'nanostores';
import { useEffect } from 'react';
import { IOCServiceTypes } from "../inversify/iocTypes";
import { useService } from "../inversify/useService";
import { convertPropsToDayjs, convertPropsToDayjsArr } from '../utils/convertPropsToDayjs';


// type PatientsStoreType = {
//     patients: IPatient[],
//     loadingPatients: boolean
// }

// const patientsStore = map<PatientsStoreType>({
//     patients: [],
//     loadingPatients: false
// })

const patientsStore = atom<IPatient[]>([]);
let initialized = false;
const loadingPatientsStore = atom<boolean>(false)

export const usePatients = () => {
    // const [patients, setPatients] = React.useState<IPatient[]>([])
    // const [loading, setLoading] = React.useState<boolean>(false)
    const httpService = useService<IHttpService>(IOCServiceTypes.HttpService)
    const patients = useStore(patientsStore);
    const loadingPatients = useStore(loadingPatientsStore);

    useEffect(() => {

        // console.info('usePatients patients', patients);

        if (!initialized) {
            initialized = true;
            const controller = fetchAllPatients()
            return () => {
                controller.abort();
            }
        }

    }, [])

    const fetchAllPatients = () => {
        return fetchFilteredPatients({})

    }


    const fetchFilteredPatients = (params: IPatientSearchParams) => {
        const controller = new AbortController()
        loadingPatientsStore.set(true);
        const { fromVisitDate, toVisitDate, ...rest } = params
        let p: any = rest;
        if (fromVisitDate)
            p.fromVisitDate = fromVisitDate.toISOString()

        if (toVisitDate)
            p.toVisitDate = toVisitDate.toISOString()

        const pars = new URLSearchParams(p);
        httpService.get<IPatient[]>(`/api/protected/patients?${pars.toString()}`, { AbortSignal: controller.signal })
            .then(d => {
                patientsStore.set(convertPropsToDayjsArr(['dateOfBirth'], d.data));
            })
            .catch(() => {
                patientsStore.set([]);

            })
            .finally(() => {
                loadingPatientsStore.set(false);
            })
        return controller;
    }

    const createPatient = async (p: IPatient) => {
        loadingPatientsStore.set(true);
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

    return { patients, loadingPatients, fetchFilteredPatients, createPatient, savePatient };
}
