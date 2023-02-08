import { useStore } from '@nanostores/react';
import { atom } from 'nanostores';
import { IOCServiceTypes } from "../inversify/iocTypes";
import { useService } from "../inversify/useService";
import { convertPropsToDayjs } from '../utils/convertPropsToDayjs';

// const projectsStore = atom<IProject[]>([]);
const savingVisitStore = atom<boolean>(false)
// const creatingProjectsStore = atom<boolean>(false)
// const loadingProjectStore = atom<boolean>(false)

export const useVisits = () => {
    const httpService = useService<IHttpService>(IOCServiceTypes.HttpService)
    // const projects = useStore(projectsStore);
    // const project = useStore(projectsStore);
    const loadingProjects = useStore(savingVisitStore);
    // const creatingProjects = useStore(creatingProjectsStore);

    // const fetchAllProjects = () => {
    //     return fetchFilteredProjects({})
    // }

    // const fetchFilteredProjects = (params: IProjectSearchParams) => {
    //     const controller = new AbortController()
    //     loadingProjectsStore.set(true);

    //     httpService.get<IProject[]>(`/api/protected/projects`, { AbortSignal: controller.signal })
    //         .then(d => {
    //             projectsStore.set(d.data);
    //         })
    //         .catch(() => {
    //             projectsStore.set([]);

    //         })
    //         .finally(() => {
    //             loadingProjectsStore.set(false);
    //         })
    //     return controller;
    // }



    const createVisit = async (projectId: string, visit: IVisit) => {
        savingVisitStore.set(true);
        // if (visit.tags) {
        //     visit.tags.forEach(t => {
        //         t.patients = undefined;
        //         t.projects = undefined;
        //         t.visits = undefined;
        //     })
        // }
        return httpService.post<IVisit>(`/api/protected/projects/${projectId}/visits`, visit)
            .then(d => {
                const vis = convertPropsToDayjs(['visitDate'], d.data);
                return vis;
                // projectsStore.set([...projects, d.data]);
            })
            // .catch(() => {
            //     projectsStore.set([]);

            // })
            .finally(() => {
                savingVisitStore.set(false);
            })
    }

    return { createVisit };
}
