import { useStore } from "@nanostores/react";
import { atom } from "nanostores";
import React from "react";
import { IOCServiceTypes } from "../inversify/iocTypes";
import { useService } from "../inversify/useService";
import { convertPropsToDayjs } from "../utils/convertPropsToDayjs";

const visitStore = atom<IVisit | undefined>(undefined);
const loadingVisitStore = atom<boolean>(false)

export const useVisit = (projectId: string, visitId: string) => {
    const httpService = useService<IHttpService>(IOCServiceTypes.HttpService)
    const visit = useStore(visitStore);
    const loadingVisit = useStore(loadingVisitStore);

    React.useEffect(() => {

        if (projectId && visitId && (!visit || visit.id != visitId)) {

            const controller = new AbortController()
            loadingVisitStore.set(true);
            httpService.get<IVisit>(`/api/protected/projects/${projectId}/visits/${visitId}`, { AbortSignal: controller.signal }).then(d => {


                const vis = convertPropsToDayjs(['visitDate'], d.data);
                visitStore.set(vis);
                // return vis;
            })
                .finally(() => {
                    loadingVisitStore.set(false);
                    // setLoading(false);
                })

            return () => {
                controller.abort();
            }
        }
    }, [projectId, visitId])

    const saveVisit = async (projectId: string, visit: IVisit) => {
        return httpService.put<IVisit>(`/api/protected/projects/${projectId}/visits/${visit.id}`, visit)
            .then(d => {
                const vis = convertPropsToDayjs(['visitDate'], d.data);
                visitStore.set(vis);
                return vis;
            })
    }

    return { visit, loadingVisit, saveVisit };
}