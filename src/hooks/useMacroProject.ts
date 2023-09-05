import { useStore } from "@nanostores/react";
import { atom } from "nanostores";
import React from "react";
import { IOCServiceTypes } from "../inversify/iocTypes";
import { useService } from "../inversify/useService";
import { defaultMacroProject } from "../services/defaultValues/defaultMacroProject";

const macroProjectStore = atom<IMacroProject>(defaultMacroProject());
// const selectedVisitStore = atom<IVisit | undefined>(undefined);
const loadingMacroProjectStore = atom<boolean>(false)

const fetchingId = {
    current: 'none'
}
const abortController = {
    current: new AbortController()
}


export const useMacroProject = (projectId: string) => {

    const httpService = useService<IHttpService>(IOCServiceTypes.HttpService)
    const macroProject = useStore(macroProjectStore);
    // const selectedVisit = useStore(selectedVisitStore);
    const loadingMacroProject = useStore(loadingMacroProjectStore);

    React.useEffect(() => {

        // console.info('useProject effect', fetchingId, projectId, project);

        if (projectId && (fetchingId.current != projectId) && (macroProject.id != projectId)) {

            if (abortController.current) {
                abortController.current.abort();
                abortController.current = new AbortController();
            }

            fetchingId.current = projectId;
            loadingMacroProjectStore.set(true);

            httpService.get<IMacroProject>(`/api/protected/macroprojects/${projectId}`, { signal: abortController.current.signal }).then(d => {

                const proj = d.data;

                macroProjectStore.set(proj);
            })
                .catch(err => {
                    macroProjectStore.set(defaultMacroProject());
                })
                .finally(() => {
                    loadingMacroProjectStore.set(false);
                })

            return () => { }
        }
    }, [projectId, macroProject])



    const saveNote = async (note: INote) => {

        const curr = macroProjectStore.get();
        if (!curr) {
            return;
        }

        if (!curr.notes) {
            curr.notes = [note]
        } else {
            const idx = curr.notes.findIndex(v => v.id === note.id)
            if (idx >= 0) {
                curr.notes.splice(idx, 1, note)
            } else {
                curr.notes.push(note)
            }
        }

        return await saveMacroProject(curr);
    }

    const removeNote = async (note: INote) => {

        const curr = macroProjectStore.get();
        if (!curr) {
            return;
        }
        if (curr.notes) {
            const idx = curr.notes.findIndex(v => v.id === note.id)
            if (idx >= 0) {
                curr.notes.splice(idx, 1)
            }
        }

        return await saveMacroProject(curr);
    }

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
                macroProjectStore.set(proj);
            })
    }

    // const setSelectedVisit = (visit: IVisit | undefined) => {
    //     selectedVisitStore.set(visit);
    // }


    const addProject = async (proj: IProject) => {
        const curr = macroProjectStore.get();
        if (!curr) {
            return;
        }

        if (!curr.projects) {
            curr.projects = [proj]
        } else {
            const idx = (curr.projects || []).findIndex(v => v.id === proj.id)
            if (idx >= 0) {
                (curr.projects || []).splice(idx, 1, proj)
            } else {
                (curr.projects || []).push(proj)
            }
        }

        return await saveMacroProject(curr);
    }
    const removeProject = async (proj: IProject) => {
        const curr = macroProjectStore.get();
        if (!curr) {
            return;
        }
        if (curr.notes) {
            const idx = (curr.projects || []).findIndex(v => v.id === proj.id)
            if (idx >= 0) {
                (curr.projects || []).splice(idx, 1)
            }
        }

        return await saveMacroProject(curr);
    }



    return {
        macroProject,
        loadingMacroProject,
        saveMacroProject,
        saveNote,
        removeNote,
        addProject,
        removeProject
    };
}