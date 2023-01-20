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
const fetchingId = { current: '' };


export const useProject = (projectId: string) => {
    // const [patient, setPatient] = React.useState<IPatient>()
    // const [loading, setLoading] = React.useState<boolean>(false)
    const httpService = useService<IHttpService>(IOCServiceTypes.HttpService)
    const project = useStore(projectStore);
    const selectedVisit = useStore(selectedVisitStore);
    const loadingProject = useStore(loadingProjectStore);

    React.useEffect(() => {

        if (fetchingId.current != projectId && projectId && (project.id != projectId)) {

            fetchingId.current = projectId;
            // console.info(`loadingProject ${loadingProject}, projectId: ${projectId}, project.id ${project.id}`)
            loadingProjectStore.set(true);
            projectStore.set(defaultProject());

            const controller = new AbortController()
            httpService.get<IProject>(`/api/protected/projects/${projectId}`, { AbortSignal: controller.signal }).then(d => {

                const proj = d.data;
                console.info('proj.visits', proj.visits)
                if (proj.patient) {
                    proj.patient = convertPropsToDayjs(['dateOfBirth'], proj.patient)
                }

                if (selectedVisit && (!proj.visits || !proj.visits.find(v => v.id === selectedVisit?.id))) {
                    setSelectedVisit(undefined);
                }
                projectStore.set(proj);
            })
                .finally(() => {
                    loadingProjectStore.set(false);
                    fetchingId.current = '';
                    // setLoading(false);
                })

            return () => {
                controller.abort();
            }
        }
    }, [projectId, project, selectedVisit])

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

    const setSelectedVisit = (visit: IVisit | undefined) => {
        selectedVisitStore.set(visit);
    }

    return { project, loadingProject, saveProject, setVisit, selectedVisit, setSelectedVisit };
}