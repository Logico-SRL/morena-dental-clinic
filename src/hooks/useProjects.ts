import { useStore } from '@nanostores/react';
import { atom } from 'nanostores';
import { IOCServiceTypes } from "../inversify/iocTypes";
import { useService } from "../inversify/useService";

const projectsStore = atom<IProject[]>([]);
const loadingProjectssStore = atom<boolean>(false)

export const useProjects = () => {
    const httpService = useService<IHttpService>(IOCServiceTypes.HttpService)
    const projects = useStore(projectsStore);
    const loadingProjects = useStore(loadingProjectssStore);

    const fetchAllProjects = () => {
        return fetchFilteredProjects({})
    }

    const fetchFilteredProjects = (params: IProjectSearchParams) => {
        const controller = new AbortController()
        loadingProjectssStore.set(true);

        httpService.get<IProject[]>(`/api/protected/projects`, { AbortSignal: controller.signal })
            .then(d => {
                projectsStore.set(d.data);
            })
            .catch(() => {
                projectsStore.set([]);

            })
            .finally(() => {
                loadingProjectssStore.set(false);
            })
        return controller;
    }



    return { projects, loadingProjects, fetchAllProjects, fetchFilteredProjects };
}
