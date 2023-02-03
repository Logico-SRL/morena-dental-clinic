import { useStore } from "@nanostores/react";
import { atom } from "nanostores";
import React from "react";
import { IOCServiceTypes } from "../inversify/iocTypes";
import { useService } from "../inversify/useService";
import { defaultPatient } from "../services/defaultValues";
import { convertPropsToDayjs } from "../utils/convertPropsToDayjs";

const patientStore = atom<IPatient>(defaultPatient());
const loadingPatientStore = atom<boolean>(false)
const fetchingId = { current: '' };
const abortController = {
    current: new AbortController()
}

export const usePatient = (patientId: string) => {
    // const [patient, setPatient] = React.useState<IPatient>()
    // const [loading, setLoading] = React.useState<boolean>(false)
    const httpService = useService<IHttpService>(IOCServiceTypes.HttpService)
    const patient = useStore(patientStore);
    const loadingPatient = useStore(loadingPatientStore);

    React.useEffect(() => {

        if (fetchingId.current != patientId && patientId && (patient.id != patientId)) {
            fetchingId.current = patientId;

            if (abortController.current) {
                abortController.current.abort();
                abortController.current = new AbortController();
            }

            loadingPatientStore.set(true);
            patientStore.set(defaultPatient());

            // const controller = new AbortController()
            httpService.get<IPatient>(`/api/protected/patients/${patientId}`, { signal: abortController.current.signal }).then(d => {
                // console.info(`/api/protected/patients/${patientId}`, d)
                patientStore.set(convertPropsToDayjs(['dateOfBirth'], d.data));
            })
                .finally(() => {
                    loadingPatientStore.set(false);
                    // setLoading(false);
                    fetchingId.current = '';
                })

            return () => {
                // controller.abort();
            }
        }
    }, [patientId, patient])

    return { patient, loadingPatient };
}