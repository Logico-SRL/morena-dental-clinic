// 'use client'
import { useStore } from '@nanostores/react';
import { atom } from 'nanostores';
import { IOCServiceTypes } from "../inversify/iocTypes";
import { useService } from "../inversify/useService";


// type PatientsStoreType = {
//     patients: IPatient[],
//     loadingPatients: boolean
// }

// const patientsStore = map<PatientsStoreType>({
//     patients: [],
//     loadingPatients: false
// })

const patientsStore = atom<IPatient[]>([]);
const loadingPatientsStore = atom<boolean>(false)

export const usePatients = () => {
    // const [patients, setPatients] = React.useState<IPatient[]>([])
    // const [loading, setLoading] = React.useState<boolean>(false)
    const httpService = useService<IHttpService>(IOCServiceTypes.HttpService)
    const patients = useStore(patientsStore);
    const loadingPatients = useStore(loadingPatientsStore);

    // React.useEffect(() => {

    //     // console.info('usePatients patients', patients);

    //     if (patients.length == 0) {
    //         const controller = getFilteredPatients({})
    //         return () => {
    //             controller.abort();
    //         }
    //     }

    // }, [patients])

    const fetchAllPatients = () => {
        return fetchFilteredPatients({})

    }


    const fetchFilteredPatients = (params: IPatientSearchParams) => {
        const controller = new AbortController()
        loadingPatientsStore.set(true);
        const pars = new URLSearchParams(params);
        httpService.get<IPatient[]>(`/api/patients?${pars.toString()}`, { AbortSignal: controller.signal }).then(d => {
            patientsStore.set(d.data);
        }).finally(() => {
            loadingPatientsStore.set(false);
        })
        return controller;
    }

    const createPatient = async (p: IPatient) => {
        loadingPatientsStore.set(true);
        httpService.post<IPatient>(`/api/patients`, p).then(d => {
            const curr = patientsStore.get();
            patientsStore.set([...curr, d.data]);
        }).finally(() => {
            loadingPatientsStore.set(false);
        })

    }

    return { patients, loadingPatients, fetchAllPatients, fetchFilteredPatients, createPatient };
}
