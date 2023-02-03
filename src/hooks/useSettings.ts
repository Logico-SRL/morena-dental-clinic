import { useStore } from '@nanostores/react';
import { atom } from 'nanostores';
import { useEffect } from 'react';
import { IOCServiceTypes } from "../inversify/iocTypes";
import { useService } from "../inversify/useService";

const settingsStore = atom<ISettings>({
    mediaSources: []
});
const loadingSettingsStore = atom<boolean>(false)

const initializing = {
    current: false
};

const abortController = {
    current: new AbortController()
}

export const useSettings = () => {

    const httpService = useService<IHttpService>(IOCServiceTypes.HttpService)
    const settings = useStore(settingsStore);
    const loadingSettings = useStore(loadingSettingsStore);

    useEffect(() => {


        if (!initializing.current) {
            initializing.current = true;

            if (abortController.current) {
                abortController.current.abort();
                abortController.current = new AbortController();
            }

            fetchSettings(abortController.current)
                .finally(() => {
                    initializing.current = false;
                })

            return () => {
                console.info('useSettings dismounting');
                // controller.abort();
                initializing.current = false;
            }
        }

    }, [])
    const fetchSettings = (controller: AbortController) => {
        loadingSettingsStore.set(true);

        return httpService.get<ISettings>(`/api/protected/settings`, { signal: controller?.signal })
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
    const saveMediaSource = async (source: IMediaSource) => {
        return httpService.put<ISettings>(`/api/protected/settings/mediasources/${source.id}`, source)
            .then(d => {
                settingsStore.set(d.data);
            })
    }


    return { settings, loadingSettings, createMediaSource, saveMediaSource };
}
