import { useStore } from '@nanostores/react';
import { atom } from 'nanostores';
import { IOCServiceTypes } from "../inversify/iocTypes";
import { useService } from "../inversify/useService";

const projectsStore = atom<IProject[]>([]);
// const projectStore = atom<IProject | undefined>(undefined);
const loadingProjectsStore = atom<boolean>(false)
const creatingProjectsStore = atom<boolean>(false)
// const loadingProjectStore = atom<boolean>(false)

export const useProjects = () => {
    const httpService = useService<IHttpService>(IOCServiceTypes.HttpService)
    const projects = useStore(projectsStore);
    // const project = useStore(projectsStore);
    const loadingProjects = useStore(loadingProjectsStore);
    const creatingProjects = useStore(creatingProjectsStore);

    const fetchAllProjects = () => {
        return fetchFilteredProjects({})
    }

    const fetchFilteredProjects = (params: IProjectSearchParams) => {
        const controller = new AbortController()
        loadingProjectsStore.set(true);

        httpService.get<IProject[]>(`/api/protected/projects`, { AbortSignal: controller.signal })
            .then(d => {
                projectsStore.set(d.data);
            })
            .catch(() => {
                projectsStore.set([]);

            })
            .finally(() => {
                loadingProjectsStore.set(false);
            })
        return controller;
    }



    const createProject = async (project: IProject) => {
        creatingProjectsStore.set(true);
        httpService.post<IProject>(`/api/protected/projects`, project)
            .then(d => {
                projectsStore.set([...projects, d.data]);
            })
            .catch(() => {
                projectsStore.set([]);

            })
            .finally(() => {
                creatingProjectsStore.set(false);
            })
    }

    return { projects, loadingProjects, fetchAllProjects, fetchFilteredProjects, createProject, creatingProjects };
}
