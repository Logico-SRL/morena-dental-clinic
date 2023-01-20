type ISettingsService = {

    get: () => Promise<ISettings>;
    createMediaSource: (source: IMediaSource) => Promise<ISettings>;
}