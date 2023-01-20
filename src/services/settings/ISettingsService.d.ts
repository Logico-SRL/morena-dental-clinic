type ISettingsService = {

    get: () => Promise<ISettings>;
    saveMediaSource: (source: IMediaSource) => Promise<ISettings>;
    createMediaSource: (source: IMediaSource) => Promise<ISettings>;
}