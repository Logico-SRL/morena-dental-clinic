// 'use client'
import { useStore } from '@nanostores/react';
import { atom } from 'nanostores';
import React from "react";
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

    React.useEffect(() => {

        // console.info('usePatients patients', patients);

        if (patients.length == 0) {
            const controller = getFilteredPatients({})
            return () => {
                controller.abort();
            }
        }

    }, [patients])

    const getFilteredPatients = (params: IPatientSearchParams) => {
        const controller = new AbortController()
        loadingPatientsStore.set(true);
        // setLoading(true)
        const pars = new URLSearchParams(params);
        httpService.get<IPatient[]>(`/api/patients?${pars.toString()}`, { AbortSignal: controller.signal }).then(d => {
            // console.info('/api/patients p', d)
            // setPatients(d.data);
            patientsStore.set(d.data);
        }).finally(() => {
            // patientsStore.setKey('loadingPatients', false);
            loadingPatientsStore.set(false);
            // setLoading(false)
        })
        return controller;
    }

    return { patients, loadingPatients, getFilteredPatients };
}
