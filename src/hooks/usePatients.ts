// 'use client'
import { useStore } from '@nanostores/react';
import { atom } from 'nanostores';
import { useEffect } from 'react';
import { IOCServiceTypes } from "../inversify/iocTypes";
import { useService } from "../inversify/useService";
import { convertPropsToDayjs, convertPropsToDayjsArr } from '../utils/convertPropsToDayjs';

const patientsStore = atom<IPatient[]>([]);
const loadingPatientsStore = atom<boolean>(false)
const initializing = { current: false };

export const usePatients = () => {
    // const [patients, setPatients] = React.useState<IPatient[]>([])
    // const [loading, setLoading] = React.useState<boolean>(false)
    const httpService = useService<IHttpService>(IOCServiceTypes.HttpService)
    const patients = useStore(patientsStore);
    const loadingPatients = useStore(loadingPatientsStore);

    useEffect(() => {

        // console.info('usePatients patients', patients);

        if (!initializing.current) {
            initializing.current = true;
            // initialized = true;
            const controller = new AbortController();
            fetchAllPatients(controller)
                .then(() => {
                    // initializing.current = true;
                })
            return () => {
                controller.abort();
                initializing.current = false;
            }
        }

    }, [])

    const fetchAllPatients = (controller?: AbortController) => {
        return fetchFilteredPatients({}, controller)

    }


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
        return httpService.get<IPatient[]>(`/api/protected/patients?${pars.toString()}`, { AbortSignal: controller?.signal })
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
