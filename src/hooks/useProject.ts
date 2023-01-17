import { useStore } from "@nanostores/react";
import { atom } from "nanostores";
import React from "react";
import { IOCServiceTypes } from "../inversify/iocTypes";
import { useService } from "../inversify/useService";

const projectStore = atom<IProject | undefined>(undefined);
const loadingProjectStore = atom<boolean>(false)

export const useProject = (projectId: string) => {
    // const [patient, setPatient] = React.useState<IPatient>()
    // const [loading, setLoading] = React.useState<boolean>(false)
    const httpService = useService<IHttpService>(IOCServiceTypes.HttpService)
    const project = useStore(projectStore);
    const loadingProject = useStore(loadingProjectStore);

    React.useEffect(() => {

        if (projectId && (!project || project.id != projectId)) {

            const controller = new AbortController()
            loadingProjectStore.set(true);
            httpService.get<IProject>(`/api/protected/projects/${projectId}`, { AbortSignal: controller.signal }).then(d => {
                // console.info(`/api/protected/patients/${patientId}`, d)
                projectStore.set(d.data);
            })
                .finally(() => {
                    loadingProjectStore.set(false);
                    // setLoading(false);
                })

            return () => {
                controller.abort();
            }
        }
    }, [projectId, project])

    const saveProject = async (project: IProject) => {
        httpService.put<IProject>(`/api/protected/projects/${projectId}`, project)
            .then(d => {
                projectStore.set(d.data);
            })
    }

    return { project, loadingProject, saveProject };
}