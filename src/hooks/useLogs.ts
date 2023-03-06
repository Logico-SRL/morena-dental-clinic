import { useStore } from '@nanostores/react';
import { atom } from 'nanostores';
import { IOCServiceTypes } from "../inversify/iocTypes";
import { useService } from "../inversify/useService";

const logsStore = atom<ILogObj[]>([]);
const loadingLogsStore = atom<boolean>(false)

// const initializing = {
//     current: false
// };

// const abortController = {
//     current: new AbortController()
// }

export const useLogs = () => {

    const httpService = useService<IHttpService>(IOCServiceTypes.HttpService)
    const logs = useStore(logsStore);
    const loadingLogs = useStore(loadingLogsStore);

    // useEffect(() => {


    //     if (!initializing.current) {
    //         initializing.current = true;

    //         if (abortController.current) {
    //             abortController.current.abort();
    //             abortController.current = new AbortController();
    //         }

    //         fetchLogs(abortController.current)
    //             .finally(() => {
    //                 initializing.current = false;
    //             })

    //         return () => {
    //             initializing.current = false;
    //         }
    //     }

    // }, [])

    const fetchLogs = (controller: AbortController, level: logLevels, userId: string) => {
        loadingLogsStore.set(true);
        const pars = new URLSearchParams()
        pars.append('level', level)
        pars.append('userId', userId)

        return httpService.get<ILogObj[]>(`/api/logs?${pars.toString()}`, { signal: controller?.signal })
            .then(d => {
                logsStore.set(d.data);
            })
            .catch(() => {
                logsStore.set([]);
            })
            .finally(() => {
                loadingLogsStore.set(false);
            })
    }


    return { logs, loadingLogs, fetchLogs };
}
