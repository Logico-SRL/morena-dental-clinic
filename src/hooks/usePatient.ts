import { useStore } from "@nanostores/react";
import { atom } from "nanostores";
import React from "react";
import { IOCServiceTypes } from "../inversify/iocTypes";
import { useService } from "../inversify/useService";
import { convertPropsToDayjs } from "../utils/convertPropsToDayjs";

const patientStore = atom<IPatient | undefined>(undefined);
const loadingPatientStore = atom<boolean>(false)

export const usePatient = (patientId: string) => {
    // const [patient, setPatient] = React.useState<IPatient>()
    // const [loading, setLoading] = React.useState<boolean>(false)
    const httpService = useService<IHttpService>(IOCServiceTypes.HttpService)
    const patient = useStore(patientStore);
    const loadingPatient = useStore(loadingPatientStore);

    React.useEffect(() => {

        if (patientId && (!patient || patient.id != patientId)) {

            const controller = new AbortController()
            loadingPatientStore.set(true);
            httpService.get<IPatient>(`/api/protected/patients/${patientId}`, { AbortSignal: controller.signal }).then(d => {
                // console.info(`/api/protected/patients/${patientId}`, d)
                patientStore.set(convertPropsToDayjs(['dateOfBirth'], d.data));
            })
                .finally(() => {
                    loadingPatientStore.set(false);
                    // setLoading(false);
                })

            return () => {
                controller.abort();
            }
        }
    }, [patientId, patient])

    return { patient, loadingPatient };
}