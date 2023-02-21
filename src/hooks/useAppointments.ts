import { useStore } from '@nanostores/react';
import { atom } from 'nanostores';
import { useEffect } from 'react';
import { IOCServiceTypes } from "../inversify/iocTypes";
import { useService } from "../inversify/useService";
import { defaultPatient } from '../services/defaultValues';

const appointmentsStore = atom<IAppointment[]>([]);
const loadingAppointmentsStore = atom<boolean>(false)

const initialized = { current: false };

const abortController = {
    current: new AbortController()
}

export const useAppointments = () => {
    const httpService = useService<IHttpService>(IOCServiceTypes.HttpService)
    const appointments = useStore(appointmentsStore);
    const loadingAppointments = useStore(loadingAppointmentsStore);

    useEffect(() => {

        if (!initialized.current) {
            initialized.current = true;

            if (abortController.current) {
                abortController.current.abort();
                abortController.current = new AbortController();
            }

            fetchAllAppointments(abortController.current)
                .then(() => {
                    // initializing.current = true;
                })
            return () => {

                // initialized.current = false;
            }
        }

    }, [])

    const mockedUpData: IAppointment[] = [{
        id: 1,
        dataOra: new Date(),
        deImpegno: '',
        durata: 120,
        nota: '',
        status: 1,
        tipoImpegno: { key: '', value: 'tipoImpegno' },
        categoria: { key: '', value: 'categoria' },
        colore: { key: '', value: 'colore' },
        idPostazione: { key: '', value: 'idPostazione' },
        statoRecord: { key: '', value: 'statoRecord' },
        patient: defaultPatient(),
        allarm: null,
        cloudId: '',
        idAnagrafica: 0,
        idOperatore: 0,
        idOperatore2: 0,
        oraAr: '',
        oraIn: '',
        oraOut: '',
        timeStamp: null

    }]

    const fetchAllAppointments = (controller: AbortController) => {
        loadingAppointmentsStore.set(true);
        const params = new URLSearchParams();
        params.append('take', '100');

        return httpService.get<IAppointment[]>(`/api/protected/appointments?${params.toString()}`, { signal: controller?.signal })
            .then(d => {
                appointmentsStore.set(d.data);
            })
            .catch((ex) => {
                console.error('fetchAllAppointments error', ex);
                appointmentsStore.set([]);

            })
            .finally(() => {
                loadingAppointmentsStore.set(false);
            })
    }

    return { appointments, loadingAppointments };
}
