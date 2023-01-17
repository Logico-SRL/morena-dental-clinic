// 'use client'
import { useStore } from '@nanostores/react';
import { atom } from 'nanostores';
import { useEffect } from 'react';
import { IOCServiceTypes } from "../inversify/iocTypes";
import { useService } from "../inversify/useService";


const categoriesStore = atom<IProjectCategory[]>([]);
let initialized = false;
// const loadingPatientsStore = atom<boolean>(false)

export const useCategories = () => {
    // const [patients, setPatients] = React.useState<IPatient[]>([])
    // const [loading, setLoading] = React.useState<boolean>(false)
    const httpService = useService<IHttpService>(IOCServiceTypes.HttpService)
    const categories = useStore(categoriesStore);
    // const loadingPatients = useStore(loadingPatientsStore);

    useEffect(() => {

        // console.info('usePatients patients', patients);

        if (!initialized) {
            initialized = true;
            const controller = fetchAllCategories()
            return () => {
                controller.abort();
            }
        }

    }, [])

    const fetchAllCategories = () => {
        return fetchFilteredCategories({})

    }


    const fetchFilteredCategories = (params: {}) => {
        const controller = new AbortController()

        httpService.get<IProjectCategory[]>(`/api/protected/projectscategories`, { AbortSignal: controller.signal })
            .then(d => {
                categoriesStore.set(d.data);
            })
            .catch(() => {
                categoriesStore.set([]);

            })
            .finally(() => {
                // loadingPatientsStore.set(false);
            })
        return controller;
    }

    const createCategory = async (p: IProjectCategory) => {
        // loadingPatientsStore.set(true);
        httpService.post<IProjectCategory>(`/api/protected/projectscategories`, p).then(d => {
            const curr = categoriesStore.get();
            categoriesStore.set([...curr, d.data]);
        }).finally(() => {
            // loadingPatientsStore.set(false);
        })
    }

    // const savePatient = async (p: IPatient) => {
    //     loadingPatientsStore.set(true);
    //     httpService.put<IPatient>(`/api/protected/patients/${p.id}`, p).then(d => {
    //         const curr = [...categoriesStore.get()];
    //         const ind = curr.findIndex(c => c.id === p.id);
    //         curr.splice(ind, 1, p)
    //         categoriesStore.set(curr);
    //     }).finally(() => {
    //         loadingPatientsStore.set(false);
    //     })
    // }

    return { categories, createCategory };
}
