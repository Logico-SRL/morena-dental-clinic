import { useStore } from '@nanostores/react';
import { atom } from 'nanostores';
import { useEffect } from 'react';
import { IOCServiceTypes } from "../inversify/iocTypes";
import { useService } from "../inversify/useService";
import { useAuthSession } from './useAuthSession';

const projectsStore = atom<IProject[]>([]);
const filteredProjectsStore = atom<IProject[]>([]);
const loadingProjectsStore = atom<boolean>(false)
const loadingFilteredProjectsStore = atom<boolean>(false)
const creatingProjectStore = atom<boolean>(false)
const initialized = { current: false };

const abortController = {
    current: new AbortController()
}

export const useProjects = () => {
    const httpService = useService<IHttpService>(IOCServiceTypes.HttpService)
    const allProjects = useStore(projectsStore);
    const filteredProjects = useStore(filteredProjectsStore);
    const loadingProjects = useStore(loadingProjectsStore);
    const loadingFilteredProjects = useStore(loadingFilteredProjectsStore);
    const creatingProjects = useStore(creatingProjectStore);
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

            fetchAllProjects(abortController.current)
                ;

            return () => {
                // console.info('useProjects dismounting');
                // controller.abort();
                // initialized.current = false;
            }
        }

    }, [isLoggedIn])

    const fetchAllProjects = (controller: AbortController) => {
        loadingProjectsStore.set(true)
        return fetchFilteredProjects({}, controller)
            .then(all => {
                projectsStore.set(all);
            }).finally(() => {
                loadingProjectsStore.set(false)
            })
    }

    const fetchFilteredProjects = (params: IProjectSearchParams, controller?: AbortController): Promise<IProject[]> => {

        loadingFilteredProjectsStore.set(true);

        return httpService.get<IProject[]>(`/api/protected/projects`, { signal: controller?.signal })
            .then(d => {
                filteredProjectsStore.set(d.data);
                return d.data;
            })
            .catch(() => {
                filteredProjectsStore.set([]);
                return [];
            })
            .finally(() => {
                loadingFilteredProjectsStore.set(false);
            })
    }



    const createProject = async (p: IProject) => {

        creatingProjectStore.set(true);
        httpService.post<IProject>(`/api/protected/projects`, p)
            .then(d => {
                projectsStore.set([...allProjects, d.data]);
            })
            .catch(() => {
                projectsStore.set([]);

            })
            .finally(() => {
                creatingProjectStore.set(false);
            })
    }

    return { allProjects, loadingProjects, filteredProjects, loadingFilteredProjects, fetchFilteredProjects, createProject, creatingProjects };
}
