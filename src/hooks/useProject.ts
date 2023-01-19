import { useStore } from "@nanostores/react";
import { atom } from "nanostores";
import React from "react";
import { IOCServiceTypes } from "../inversify/iocTypes";
import { useService } from "../inversify/useService";
import { convertPropsToDayjs } from "../utils/convertPropsToDayjs";

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


                const proj = d.data;
                console.info('proj.visits', proj.visits)
                if (proj.patient) {
                    proj.patient = convertPropsToDayjs(['dateOfBirth'], proj.patient)
                }
                projectStore.set(proj);
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
                const proj = d.data;
                if (proj.patient) {
                    proj.patient = convertPropsToDayjs(['dateOfBirth'], proj.patient)
                }
                projectStore.set(proj);

            })
    }

    return { project, loadingProject, saveProject };
}