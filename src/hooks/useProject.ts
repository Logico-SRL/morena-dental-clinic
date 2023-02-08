import { useStore } from "@nanostores/react";
import { atom } from "nanostores";
import React from "react";
import { IOCServiceTypes } from "../inversify/iocTypes";
import { useService } from "../inversify/useService";
import { defaultProject } from "../services/defaultValues";
import { convertPropsToDayjs } from "../utils/convertPropsToDayjs";

const projectStore = atom<IProject>(defaultProject());
const selectedVisitStore = atom<IVisit | undefined>(undefined);
const loadingProjectStore = atom<boolean>(false)

const fetchingId = {
    current: 'none'
}
const abortController = {
    current: new AbortController()
}


export const useProject = (projectId: string) => {


    const httpService = useService<IHttpService>(IOCServiceTypes.HttpService)
    const project = useStore(projectStore);
    const selectedVisit = useStore(selectedVisitStore);
    const loadingProject = useStore(loadingProjectStore);

    React.useEffect(() => {

        console.info('useProject effect', fetchingId, projectId, project);

        if (projectId && (fetchingId.current != projectId) && (project.id != projectId)) {

            selectedVisitStore.set(undefined)

            if (abortController.current) {
                abortController.current.abort();
                abortController.current = new AbortController();
            }

            console.info(`fetchingIdStore.set(${projectId})`);
            fetchingId.current = projectId;
            console.info(`fetching project ${projectId}`);

            // console.info(`loadingProject ${loadingProject}, projectId: ${projectId}, project.id ${project.id}`)
            loadingProjectStore.set(true);
            // projectStore.set(defaultProject());

            // const controller = new AbortController()

            httpService.get<IProject>(`/api/protected/projects/${projectId}`, { signal: abortController.current.signal }).then(d => {

                const proj = d.data;
                console.info('proj', proj)

                if (proj.patient) {
                    proj.patient = convertPropsToDayjs(['dateOfBirth'], proj.patient)
                }

                // if (selectedVisit && (!proj.visits || !proj.visits.find(v => v.id === selectedVisit?.id))) {
                //     setSelectedVisit(undefined);
                // }
                projectStore.set(proj);
            })
                .catch(err => {
                    projectStore.set(defaultProject());
                })
                .finally(() => {
                    loadingProjectStore.set(false);
                    // fetchingId.current = '';
                    // setLoading(false);
                })

            return () => {
                // console.info('calling controller abort')
                // controller.abort();
            }
        }
    }, [projectId, project])

    const setVisit = (visit: IVisit) => {

        const curr = projectStore.get();
        if (!curr) {
            return;
        }
        if (!curr.visits) {
            curr.visits = [visit]
        } else {
            const idx = curr.visits.findIndex(v => v.id === visit.id)
            if (idx >= 0) {
                curr.visits.splice(idx, 1, visit)
            } else {
                curr.visits.push(visit)
            }
        }

        projectStore.set(curr);
    }

    const removeVisit = (visit: IVisit) => {

        const curr = projectStore.get();
        if (!curr) {
            return;
        }
        if (curr.visits) {
            const idx = curr.visits.findIndex(v => v.id === visit.id)
            if (idx >= 0) {
                curr.visits.splice(idx, 1)
            }
        }

        projectStore.set(curr);
    }

    const saveProject = async (p: IProject) => {
        // if (p.tags) {
        //     p.tags.forEach(t => {
        //         t.patients = undefined;
        //         t.projects = undefined;
        //         t.visits = undefined;
        //     })
        // }

        httpService.put<IProject>(`/api/protected/projects/${projectId}`, p)
            .then(d => {
                const proj = d.data;
                if (proj.patient) {
                    proj.patient = convertPropsToDayjs(['dateOfBirth'], proj.patient)
                }
                projectStore.set(proj);

            })
    }

    const setSelectedVisit = (visit: IVisit | undefined) => {
        selectedVisitStore.set(visit);
    }

    // const addMediaToProjectVisit = (v: IVisit | undefined, media: IMedia) => {
    //     const p = projectStore.get()
    //     if (v) {
    //         const found = p.visits?.find(vis => vis.id === v.id)
    //         if (found) {
    //             found.media = [...(found.media || []), media]
    //             projectStore.set({ ...p })
    //         }
    //     }
    // }

    // const updateMediaToProjectVisit = (v: IVisit | undefined, media: IMedia) => {
    //     const p = projectStore.get()
    //     if (v) {
    //         const found = p.visits?.find(vis => vis.id === v.id)
    //         if (found && found.media) {
    //             const ind = found.media.findIndex(m => m.id === media.id)
    //             found.media.splice(ind, 1, media);
    //             projectStore.set({ ...p })
    //         }
    //     }
    // }

    // const removeMediaFromProjectVisit = (v: IVisit | undefined, mediaId: string) => {
    //     const p = projectStore.get()
    //     if (v) {
    //         const found = p.visits?.find(vis => vis.id === v.id)
    //         if (found && found.media) {
    //             found.media = found.media.filter(m => m.id !== mediaId)
    //             projectStore.set({ ...p })
    //         }
    //     }
    // }





    return {
        project,
        loadingProject,
        saveProject,
        setVisit,
        selectedVisit,
        setSelectedVisit,
        removeVisit,
    };
}