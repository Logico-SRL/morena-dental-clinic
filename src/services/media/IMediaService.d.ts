type IMediaService = {

    create: (media: IMedia) => Promise<IMedia>;
    get: (mediaId: string) => Promise<IMedia | null>;
    delete: (mediaId: string) => Promise<boolean>;
    save: (media: IMedia) => Promise<IMedia>;

}