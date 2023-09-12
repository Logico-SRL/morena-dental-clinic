import { useStore } from "@nanostores/react";
import { atom } from "nanostores";
import React from "react";
import { IOCServiceTypes } from "../inversify/iocTypes";
import { useService } from "../inversify/useService";
import { defaultPatient } from "../services/defaultValues";
import { convertPropsToDayjs } from "../utils/convertPropsToDayjs";

const patientStore = atom<IPatient>(defaultPatient());
const unoAnagraficaStore = atom<UnoAnagrafica | undefined>(undefined);
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
    const unoAnagrafica = useStore(unoAnagraficaStore);
    const loadingPatient = useStore(loadingPatientStore);

    React.useEffect(() => {
        return () => {
            patientStore.set(defaultPatient())
        }
    }, [])

    React.useEffect(() => {
        getPatient(patientId);
        return () => {

        }
    }, [patientId, patient])

    const getPatient = async (id: string) => {

        if (fetchingId.current != patientId && patientId && (patient.id != patientId)) {
            fetchingId.current = patientId;

            if (abortController.current) {
                abortController.current.abort();
                abortController.current = new AbortController();
            }

            loadingPatientStore.set(true);
            patientStore.set(defaultPatient());

            // const controller = new AbortController()
            const res = await Promise.all([
                httpService.get<IPatient>(`/api/protected/patients/${patientId}`, { signal: abortController.current.signal }),
                httpService.get<UnoAnagrafica>(`/api/protected/patients/${patientId}/unodb`, { signal: abortController.current.signal })
            ])

            patientStore.set(convertPropsToDayjs(['dateOfBirth'], res[0].data));
            unoAnagraficaStore.set(res[1].data);

            loadingPatientStore.set(false);
            // setLoading(false);
            fetchingId.current = '';

            // .then(d => {
            //     // console.info(`/api/protected/patients/${patientId}`, d)
            //     patientStore.set(convertPropsToDayjs(['dateOfBirth'], d.data));
            //     httpService.get<IPatient>(`/api/protected/patients/${patientId}/unodb`, { signal: abortController.current.signal })
            //         .then(d => {
            //             unoAnagraficaStore.set(d.data);
            //         })
            // })
            // .finally(() => {
            //     loadingPatientStore.set(false);
            //     // setLoading(false);
            //     fetchingId.current = '';
            // })

        }
    }

    return { patient, loadingPatient, unoAnagrafica };
}