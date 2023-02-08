import { useStore } from "@nanostores/react";
import { atom } from "nanostores";
import React from "react";
import { IOCServiceTypes } from "../inversify/iocTypes";
import { useService } from "../inversify/useService";
import { defaultVisit } from "../services/defaultValues";
import { convertPropsToDayjs } from "../utils/convertPropsToDayjs";

const visitStore = atom<IVisit>(defaultVisit());
const loadingVisitStore = atom<boolean>(false)
const fetchingId = { current: '' };
const abortController = {
    current: new AbortController()
}

export const useVisit = (projectId: string, visitId: string | undefined) => {

    const httpService = useService<IHttpService>(IOCServiceTypes.HttpService)
    const visit = useStore(visitStore);
    const loadingVisit = useStore(loadingVisitStore);

    React.useEffect(() => {

        if (!visitId) {
            visitStore.set(defaultVisit())
        }
        else if (fetchingId.current != visitId && projectId && visitId && (visit.id != visitId)) {

            fetchingId.current = visitId;

            if (abortController.current) {
                abortController.current.abort();
                abortController.current = new AbortController();
            }

            loadingVisitStore.set(true);
            httpService.get<IVisit>(`/api/protected/projects/${projectId}/visits/${visitId}`, { signal: abortController.current.signal }).then(d => {

                const vis = convertPropsToDayjs(['visitDate'], d.data);
                visitStore.set(vis);
                // return vis;
            })
                .finally(() => {
                    loadingVisitStore.set(false);
                    fetchingId.current = '';
                    // setLoading(false);
                })

            return () => {
                // controller.abort();
            }
        }
    }, [projectId, visitId])

    const saveVisit = async (projectId: string, visit: IVisit) => {
        // if (visit.tags) {
        //     visit.tags.forEach(t => {
        //         t.patients = undefined;
        //         t.projects = undefined;
        //         t.visits = undefined;
        //     })
        // }

        return httpService.put<IVisit>(`/api/protected/projects/${projectId}/visits/${visit.id}`, visit)
            .then(d => {
                const vis = convertPropsToDayjs(['visitDate'], d.data);
                visitStore.set(vis);
                return vis;
            })
    }

    const deleteVisit = async (projectId: string, visitId: string) => {
        return httpService.delete<IVisit>(`/api/protected/projects/${projectId}/visits/${visitId}`)
    }

    const addMediaToVisit = (media: IMedia) => {
        const v = visitStore.get();
        if (v) {
            if (!v.media) {
                v.media = [media]
            } else {
                v.media = [...v.media, media]
            }
            visitStore.set({ ...v });
        }

        // addMediaToProjectVisit(selectedVisit, media);
    }

    const removeMediaFromVisit = (mediaId: string) => {

        const v = visitStore.get();
        if (v) {
            v.media = v.media?.filter(m => m.id !== mediaId)
            visitStore.set({ ...v });
            // removeMediaFromProjectVisit(v, mediaId)
        }
    }

    const updateMediaToVisit = (media: IMedia) => {

        const v = visitStore.get();
        if (v && v.media) {
            const ind = v.media.findIndex(m => m.id === media.id)
            v.media.splice(ind, 1, media);
            visitStore.set(v);
            // updateMediaToProjectVisit(v, media)
        }
    }

    return { visit, loadingVisit, saveVisit, deleteVisit, addMediaToVisit, removeMediaFromVisit, updateMediaToVisit };
}