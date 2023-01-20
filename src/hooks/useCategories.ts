// 'use client'
import { useStore } from '@nanostores/react';
import { atom } from 'nanostores';
import { useEffect } from 'react';
import { IOCServiceTypes } from "../inversify/iocTypes";
import { useService } from "../inversify/useService";


const categoriesStore = atom<IProjectCategory[]>([]);
const initializing = { current: false };
// const loadingPatientsStore = atom<boolean>(false)

export const useCategories = () => {
    // const [patients, setPatients] = React.useState<IPatient[]>([])
    // const [loading, setLoading] = React.useState<boolean>(false)
    const httpService = useService<IHttpService>(IOCServiceTypes.HttpService)
    const categories = useStore(categoriesStore);
    // const loadingPatients = useStore(loadingPatientsStore);

    useEffect(() => {

        // console.info('usePatients patients', patients);

        if (!initializing.current) {
            initializing.current = true;
            const controller = fetchAllCategories()
            return () => {
                controller.abort();
                initializing.current = false;
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

    const callCreateCategoryApi = async (p: IProjectCategory) => {
        return httpService.post<IProjectCategory>(`/api/protected/projectscategories`, p);
    }

    const createCategory = async (p: IProjectCategory) => {
        const res = await callCreateCategoryApi(p)
        const curr = categoriesStore.get();
        categoriesStore.set([...curr, res.data]);

    }

    const createSubCategory = async (p: IProjectCategory) => {
        const res = await callCreateCategoryApi(p)
        const curr = categoriesStore.get();
        const el = curr.find(c => c.id == p.parentCategory?.id)
        if (el) {
            if (!el.childrenCategories) {
                el.childrenCategories = []
            }

            el.childrenCategories.push(res.data)
        }
        categoriesStore.set([...curr]);
    }

    return { categories, createCategory, createSubCategory };
}
