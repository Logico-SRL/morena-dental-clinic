import { useStore } from "@nanostores/react";
import { atom } from "nanostores";
import React from "react";
import { IOCServiceTypes } from "../inversify/iocTypes";
import { useService } from "../inversify/useService";
import { defaultMacroProject } from "../services/defaultValues/defaultMacroProject";

const projectStore = atom<IMacroProject>(defaultMacroProject());
// const selectedVisitStore = atom<IVisit | undefined>(undefined);
const loadingProjectStore = atom<boolean>(false)

const fetchingId = {
    current: 'none'
}
const abortController = {
    current: new AbortController()
}


export const useMacroProject = (projectId: string) => {

    const httpService = useService<IHttpService>(IOCServiceTypes.HttpService)
    const macroProject = useStore(projectStore);
    // const selectedVisit = useStore(selectedVisitStore);
    const loadingMacroProject = useStore(loadingProjectStore);

    React.useEffect(() => {

        // console.info('useProject effect', fetchingId, projectId, project);

        if (projectId && (fetchingId.current != projectId) && (macroProject.id != projectId)) {

            if (abortController.current) {
                abortController.current.abort();
                abortController.current = new AbortController();
            }

            fetchingId.current = projectId;
            loadingProjectStore.set(true);

            httpService.get<IMacroProject>(`/api/protected/macroprojects/${projectId}`, { signal: abortController.current.signal }).then(d => {

                const proj = d.data;

                projectStore.set(proj);
            })
                .catch(err => {
                    projectStore.set(defaultMacroProject());
                })
                .finally(() => {
                    loadingProjectStore.set(false);
                })

            return () => { }
        }
    }, [projectId, macroProject])

    // const setVisit = (visit: IVisit) => {

    //     const curr = projectStore.get();
    //     if (!curr) {
    //         return;
    //     }
    //     if (!curr.visits) {
    //         curr.visits = [visit]
    //     } else {
    //         const idx = curr.visits.findIndex(v => v.id === visit.id)
    //         if (idx >= 0) {
    //             curr.visits.splice(idx, 1, visit)
    //         } else {
    //             curr.visits.push(visit)
    //         }
    //     }

    //     projectStore.set(curr);
    // }

    // const removeVisit = (visit: IVisit) => {

    //     const curr = projectStore.get();
    //     if (!curr) {
    //         return;
    //     }
    //     if (curr.visits) {
    //         const idx = curr.visits.findIndex(v => v.id === visit.id)
    //         if (idx >= 0) {
    //             curr.visits.splice(idx, 1)
    //         }
    //     }

    //     projectStore.set(curr);
    // }

    const saveMacroProject = async (p: IMacroProject) => {
        // if (p.tags) {
        //     p.tags.forEach(t => {
        //         t.patients = undefined;
        //         t.projects = undefined;
        //         t.visits = undefined;
        //     })
        // }

        httpService.put<IMacroProject>(`/api/protected/macroprojects/${projectId}`, p)
            .then(d => {
                const proj = d.data;
                projectStore.set(proj);

            })
    }

    // const setSelectedVisit = (visit: IVisit | undefined) => {
    //     selectedVisitStore.set(visit);
    // }





    return {
        macroProject,
        loadingMacroProject,
        saveMacroProject,
        // setVisit,
        // selectedVisit,
        // setSelectedVisit,
        // removeVisit,
    };
}