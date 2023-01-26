import { UploadFile, UploadProps } from "antd";
import { UploadChangeParam } from "antd/es/upload";
import axios, { AxiosRequestConfig } from "axios";
import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useRef, useState } from "react";
import { useMedia } from "../../hooks/useMedia";
import { useProject } from "../../hooks/useProject";
import UserControls from "../../userControls";
import { AntdIcons } from "../../userControls/icons";
import classnames from './screening.module.scss';


type paramsType = {
    projectId: string,
    visitId: string,
    mediaSourceId: string,
    addMedia: (media: IMedia) => void,
    fileList: UploadFile<IMedia>[],
    setFileList: Dispatch<SetStateAction<UploadFile<IMedia>[]>>
    afterAxiosPost?: (res: UploadMediaResp) => {}
}


const defaultUploadProps: (params: paramsType) => UploadProps = ({ projectId, visitId, mediaSourceId, addMedia, setFileList, fileList, afterAxiosPost }) => ({
    listType: 'picture',
    showUploadList: true,
    multiple: false,
    fileList,
    customRequest: async options => {
        const { onSuccess, onError, file, onProgress } = options;

        const fmData = new FormData();

        const config: AxiosRequestConfig<IMedia> = {
            headers: { "content-type": "multipart/form-data" },
            onUploadProgress: event => {

                if (onProgress)
                    onProgress({ percent: (event.loaded / (event.total || 1)) * 100 });
            }
        };
        fmData.append("image", file);
        try {
            const res = await axios.post<UploadMediaResp>(
                `/api/protected/projects/${projectId}/visits/${visitId}/mediasources/${mediaSourceId}/upload`,
                fmData,
                config
            );

            onSuccess && onSuccess("Ok");
            console.info("file uploaded res", res);
            setFileList([])
            afterAxiosPost && await afterAxiosPost(res.data)

            addMedia(res.data)
        } catch (err) {
            onError && onError(err as any);
        }
    },
    onChange: (info: UploadChangeParam<UploadFile<IMedia>>) => {

        const { status, response } = info.file;

        if (status === 'done' || status === 'success') {
            setFileList([]);
        } else {
            setFileList(info.fileList)
        }
    },
    previewFile: async (file) => {
        console.log('Your upload file:', file);
        return ''
    }
})

const Comp = () => null

const defaultUploadMediaContext = {
    open: false,
    setOpen: (val: boolean) => { },
    modalTitle: '',
    setModalTitle: (title: string) => { },
    ModalContent: <Comp />,
    setModalContent: (val: JSX.Element) => { },
}

const UploadMediaContext = createContext(defaultUploadMediaContext)

export const UploadProvider: React.FunctionComponent<PropsWithChildren> = ({ children }) => {

    const [open, setOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [ModalContent, setModalContent] = useState<JSX.Element>(<Comp />);

    return <UploadMediaContext.Provider value={{ open, setOpen, ModalContent, setModalContent, modalTitle, setModalTitle }}>
        <UploadModal />
        {children}
    </UploadMediaContext.Provider>
}

const UploadModal = () => {

    const context = useContext(UploadMediaContext);

    return <UserControls.Modal
        open={context.open}
        onCancel={() => context.setOpen(false)}
        cancelText={`Keep default image`}
        okButtonProps={{ style: { display: 'none' } }}
        title={context.modalTitle}
    >
        {context.ModalContent}
    </UserControls.Modal>;
}

export const useUploadMedia = (projectId: string, selectedMediaSource: IMediaSource | undefined) => {

    const [fileList, setFileList] = useState<Array<UploadFile<IMedia>>>([])
    const { addMediaToVisit, selectedVisit, updateMediaToVisit } = useProject(projectId)
    const { updateMedia } = useMedia()
    const context = useContext(UploadMediaContext);

    const getDefaultParams = () => ({
        projectId,
        visitId: selectedVisit?.id || '',
        mediaSourceId: selectedMediaSource?.id || '',
        addMedia: addMediaToVisit,
        fileList,
        setFileList
    })

    const [uploadProps, setUploadProps] = useState<UploadProps>(defaultUploadProps(getDefaultParams()));


    const onImageClick = async (r: UploadMediaResp, { b64Preview, b64Thumbnail }: SnapShotType) => {
        r.b64Thumbnail = b64Thumbnail;
        r.b64Preview = b64Preview;
        context.setOpen(false);
        await updateMedia(r);
        updateMediaToVisit(r);
    }

    const onDocImageChoosen = async ({ b64Preview, b64Thumbnail }: SnapShotType, media: IMedia) => {
        media.b64Thumbnail = b64Thumbnail;
        media.b64Preview = b64Preview;
        context.setOpen(false);
        await updateMedia(media);
        updateMediaToVisit(media);
    }

    const showVideoModal = async (r: UploadMediaResp) => {

        if (r.snapshots && r.snapshots.length > 0) {
            context.setModalTitle('Chose video thumbnail');
            context.setModalContent(<UserControls.Row gutter={10}>
                {r.snapshots?.map((s, i) => <UserControls.Col xs={8} key={`image_snapshot_${i}`}>
                    <UserControls.Image className={classnames.snapshotImg}
                        preview={false}
                        onClick={() => onImageClick(r, s)}
                        src={`data:image/png;base64,${s.b64Thumbnail}`} />
                </UserControls.Col>)}
            </UserControls.Row>)

            context.setOpen(true);

        }
    }

    const [docFileList, setDocFileList] = useState<any[]>([])

    const onDocUploadChange = useCallback(async (pars: UploadChangeParam<UploadFile<SnapShotType>>, media: UploadMediaResp) => {

        const { status, response } = pars.file
        console.info('onDocUploadChange', pars);

        if (status == 'done' || status == 'success') {
            // setDocFileList([])
        }
        else {
            setDocFileList([...pars.fileList])
        }
    }, [])

    const curResp = useRef<UploadMediaResp>();

    const showDocModal = async (r: UploadMediaResp) => {

        curResp.current = r;
        context.setModalTitle('Chose doc thumbnail');

        context.setModalContent(<UserControls.Row gutter={10}>
            <UserControls.Col xs={24}>
                <UserControls.Upload
                    customRequest={async options => {
                        const { onSuccess, onError, file, onProgress } = options;

                        const fmData = new FormData();

                        const config: AxiosRequestConfig<IMedia> = {
                            headers: { "content-type": "multipart/form-data" },
                            onUploadProgress: event => {

                                if (onProgress)
                                    onProgress({ percent: (event.loaded / (event.total || 1)) * 100 });
                            }
                        };
                        fmData.append("image", file);
                        try {
                            const res = await axios.post<SnapShotType>(
                                `/api/protected/files/thumbnails`,
                                fmData,
                                config
                            );

                            console.info("thumnail axios res", res);

                            onSuccess && onSuccess("Ok");
                            setDocFileList([])
                            onDocImageChoosen(res.data || { b64Preview: '', b64Thumbnail: '' }, r)

                        } catch (err) {
                            onError && onError(err as any);
                        }
                    }}
                    // action={`/api/protected/files/thumbnails`}
                    onChange={p => onDocUploadChange(p, r)}
                    multiple={false}
                    fileList={docFileList}
                // showUploadList={false}

                >
                    <UserControls.Button icon={<AntdIcons.PlusOutlined />}>
                        Upload Thumbnail
                    </UserControls.Button>
                </UserControls.Upload>
            </UserControls.Col>
        </UserControls.Row>)

        context.setOpen(true);

    }

    useEffect(() => {
        switch (selectedMediaSource?.type) {
            case 'image': {
                const props = defaultUploadProps(getDefaultParams());
                props.multiple = true;
                setUploadProps(props);
                break;
            }
            case 'video': {
                const afterAxiosPost: paramsType['afterAxiosPost'] = async (r) => {
                    showVideoModal(r)
                }
                const props = defaultUploadProps({ ...getDefaultParams(), afterAxiosPost });

                setUploadProps(props);
                break;
            }

            case 'doc':
            default: {
                const afterAxiosPost: paramsType['afterAxiosPost'] = async (r) => {
                    showDocModal(r)
                }
                const props = defaultUploadProps({ ...getDefaultParams(), afterAxiosPost });
                setUploadProps(props);
                break;
            }
        }

    }, [selectedMediaSource])

    return { uploadProps }
}
