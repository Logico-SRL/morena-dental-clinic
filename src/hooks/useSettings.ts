import { useStore } from '@nanostores/react';
import { atom } from 'nanostores';
import { useEffect } from 'react';
import { IOCServiceTypes } from "../inversify/iocTypes";
import { useService } from "../inversify/useService";

const settingsStore = atom<ISettings>({
    mediaSources: []
});
const loadingSettingsStore = atom<boolean>(false)

const initializing = { current: false };

export const useSettings = () => {

    const httpService = useService<IHttpService>(IOCServiceTypes.HttpService)
    const settings = useStore(settingsStore);
    const loadingSettings = useStore(loadingSettingsStore);

    useEffect(() => {


        if (!initializing.current) {
            initializing.current = true;

            const controller = new AbortController();
            fetchSettings(controller)
                .finally(() => { initializing.current = false; })
            return () => {
                console.info('useProjects dismounting');
                controller.abort();
                initializing.current = false;
            }
        }

    }, [])
    const fetchSettings = (controller: AbortController) => {
        loadingSettingsStore.set(true);

        return httpService.get<ISettings>(`/api/protected/settings`, { AbortSignal: controller?.signal })
            .then(d => {
                settingsStore.set(d.data);
            })
            .catch(() => {
                settingsStore.set({
                    mediaSources: []
                });

            })
            .finally(() => {
                loadingSettingsStore.set(false);
            })
    }


    const createMediaSource = async (source: IMediaSource) => {
        return httpService.post<ISettings>(`/api/protected/settings/mediasources`, source)
            .then(d => {
                settingsStore.set(d.data);
            })
    }


    return { settings, loadingSettings, createMediaSource };
}
