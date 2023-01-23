type IMediaService = {

    create: (media: IMedia) => Promise<IMedia>;
    get: (mediaId: string) => Promise<IMedia | null>;

}