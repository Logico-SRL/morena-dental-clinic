import { useStore } from '@nanostores/react';
import { atom } from 'nanostores';
import { useEffect } from 'react';
import { IOCServiceTypes } from "../inversify/iocTypes";
import { useService } from "../inversify/useService";
import { useAuthSession } from './useAuthSession';

const macroProjectsStore = atom<IMacroProject[]>([]);
const filteredMacroProjectsStore = atom<IMacroProject[]>([]);
const loadingMacroProjectsStore = atom<boolean>(false)
const loadingFilteredMacroProjectsStore = atom<boolean>(false)
const creatingMacroProjectStore = atom<boolean>(false)
const initialized = { current: false };

const abortController = {
    current: new AbortController()
}

export const useMacroProjects = () => {

    const httpService = useService<IHttpService>(IOCServiceTypes.HttpService)
    const allMacroProjects = useStore(macroProjectsStore);
    const filteredMacroProjects = useStore(filteredMacroProjectsStore);
    const loadingMacroProjects = useStore(loadingMacroProjectsStore);
    const loadingFilteredMacroProjects = useStore(loadingFilteredMacroProjectsStore);
    const creatingMacroProject = useStore(creatingMacroProjectStore);
    const { isLoggedIn } = useAuthSession();

    useEffect(() => {


        if (!initialized.current && isLoggedIn) {
            initialized.current = true;
            // console.info('useProjects', initialized.current);

            // initialized = true;
            if (abortController.current) {
                abortController.current.abort();
                abortController.current = new AbortController();
            }

            fetchAllProjects(abortController.current);

            return () => {
                // console.info('useProjects dismounting');
                // controller.abort();
                // initialized.current = false;
            }
        }

    }, [isLoggedIn])

    const fetchAllProjects = (controller: AbortController) => {
        loadingMacroProjectsStore.set(true)
        return fetchFilteredMacroProjects({}, controller)
            .then(all => {
                macroProjectsStore.set(all);
            }).finally(() => {
                loadingMacroProjectsStore.set(false)
            })
    }

    const fetchFilteredMacroProjects = (params: IMacroProjectSearchParams, controller?: AbortController): Promise<IMacroProject[]> => {

        loadingFilteredMacroProjectsStore.set(true);

        return httpService.get<IMacroProject[]>(`/api/protected/macroprojects`, { signal: controller?.signal })
            .then(d => {
                filteredMacroProjectsStore.set(d.data);
                return d.data;
            })
            .catch(() => {
                filteredMacroProjectsStore.set([]);
                return [];
            })
            .finally(() => {
                loadingFilteredMacroProjectsStore.set(false);
            })
    }



    const createMacroProject = async (p: IMacroProject): Promise<IMacroProject | null> => {

        creatingMacroProjectStore.set(true);
        return httpService.post<IMacroProject>(`/api/protected/macroprojects`, p)
            .then(d => {
                macroProjectsStore.set([...allMacroProjects, d.data]);
                return d.data;
            })
            .catch(() => {
                macroProjectsStore.set([]);
                return null;
            })
            .finally(() => {
                creatingMacroProjectStore.set(false);
            })
    }

    return { allMacroProjects, loadingMacroProjects, filteredMacroProjects, loadingFilteredMacroProjects, fetchFilteredMacroProjects, createMacroProject, creatingMacroProject };
}
