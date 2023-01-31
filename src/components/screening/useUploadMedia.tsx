import { UploadFile, UploadProps } from "antd";
import { UploadChangeParam } from "antd/es/upload";
import axios, { AxiosRequestConfig } from "axios";
import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useMedia } from "../../hooks/useMedia";
import { useMediaImport } from "../../hooks/useMediaImport";
import { useProject } from "../../hooks/useProject";
import UserControls from "../../userControls";
import { AntdIcons } from "../../userControls/icons";
import classnames from './screening.module.scss';


type ParamsType = {
    projectId: string,
    visitId: string,
    mediaSourceId: string,
    addMedia: (media: IMedia) => void,
    fileList: UploadFile<IMedia>[],
    setFileList: Dispatch<SetStateAction<UploadFile<IMedia>[]>>
    afterAxiosPost?: (res: UploadMediaResp) => {},
    mediaSourceType: string
}


const defaultUploadProps: (params: ParamsType) => UploadProps = ({
    projectId, visitId, mediaSourceId, addMedia, setFileList, fileList, afterAxiosPost, mediaSourceType
}) => ({
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

            onSuccess && onSuccess(res);
            console.info("file uploaded res", res);
            afterAxiosPost && await afterAxiosPost(res.data)
            setFileList([])
            addMedia(res.data)
        } catch (err) {
            console.error("file uploaded error", err);
            onError && onError(err as any);
        }
    },
    onChange: (info: UploadChangeParam<UploadFile<IMedia>>) => {

        const { status, response } = info.file;

        console.info('onChange', status, info.fileList)

        if (status === 'done' || status === 'success') {
            setFileList([]);
        } else {
            setFileList(info.fileList)
        }
    },
    // previewFile: async (file) => {
    //     console.log('Your upload file:', file);
    //     return ''
    // },
    beforeUpload(file, FileList) {
        const accepted = file.type.startsWith(mediaSourceType)
        return accepted;
    },
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
const defaultImportMediaContext = {
    open: false,
    setOpen: (val: boolean) => { },
    modalTitle: '',
    setModalTitle: (title: string) => { },
    ModalContent: <Comp />,
    setModalContent: (val: JSX.Element) => { },
    modalOkAction: () => { },
    setModalOkAction: (callback: () => () => void) => { }
}

const UploadMediaContext = createContext(defaultUploadMediaContext)
const ImportMediaContext = createContext(defaultImportMediaContext)

export const UploadProvider: React.FunctionComponent<PropsWithChildren> = ({ children }) => {

    const [open, setOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [ModalContent, setModalContent] = useState<JSX.Element>(<Comp />);

    return <UploadMediaContext.Provider value={{ open, setOpen, ModalContent, setModalContent, modalTitle, setModalTitle }}>
        <UploadModal />
        {children}
    </UploadMediaContext.Provider>
}

export const ImportMediaProvider: React.FunctionComponent<PropsWithChildren> = ({ children }) => {

    const [open, setOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [ModalContent, setModalContent] = useState<JSX.Element>(<Comp />);
    const [modalOkAction, setModalOkAction] = useState<() => void>(() => { });

    return <ImportMediaContext.Provider value={{ open, setOpen, ModalContent, setModalContent, modalTitle, setModalTitle, modalOkAction, setModalOkAction }}>
        <ImportMediaModal />
        {children}
    </ImportMediaContext.Provider>
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
const ImportMediaModal = () => {

    const context = useContext(ImportMediaContext);

    return <UserControls.Modal
        wrapClassName={classnames.largeModalWrap}
        open={context.open}
        onCancel={() => context.setOpen(false)}
        cancelText={`Cancel import`}
        okText={`Import selected`}
        onOk={context.modalOkAction}
        // okButtonProps={{ style: { display: 'none' } }}
        title={context.modalTitle}
    >
        {context.ModalContent}
    </UserControls.Modal>;
}

export const useUploadMedia = (projectId: string, selectedMediaSource: IMediaSource | undefined) => {

    const [fileList, setFileList] = useState<Array<UploadFile<IMedia>>>([])
    const { addMediaToVisit, selectedVisit, updateMediaToVisit } = useProject(projectId)
    const { updateMedia, searchNewMedia } = useMedia()

    const modalUploadContext = useContext(UploadMediaContext);
    const modalImportContext = useContext(ImportMediaContext);

    useEffect(() => {
        console.info('fileList effect', fileList)
    }, [fileList])

    const getDefaultParams: () => ParamsType = () => ({
        projectId,
        visitId: selectedVisit?.id || '',
        mediaSourceId: selectedMediaSource?.id || '',
        mediaSourceType: selectedMediaSource?.type || '',
        addMedia: addMediaToVisit,
        fileList,
        setFileList,
    })

    const uploadProps = useMemo(() => {
        switch (selectedMediaSource?.type) {
            case 'image': {
                const props = defaultUploadProps(getDefaultParams());
                props.multiple = true;
                return props;
                break;
            }
            case 'video': {
                const afterAxiosPost: ParamsType['afterAxiosPost'] = async (r) => {
                    showVideoModal(r)
                }
                return defaultUploadProps({ ...getDefaultParams(), afterAxiosPost });

                break;
            }

            case 'doc':
            default: {
                const afterAxiosPost: ParamsType['afterAxiosPost'] = async (r) => {
                    showDocModal(r)
                }
                return defaultUploadProps({ ...getDefaultParams(), afterAxiosPost });
                break;
            }
        }
    }, [
        projectId, selectedVisit, selectedMediaSource, addMediaToVisit, fileList, setFileList,
    ]);


    const onImageClick = async (r: UploadMediaResp, { b64Preview, b64Thumbnail }: SnapShotType) => {
        r.b64Thumbnail = b64Thumbnail;
        r.b64Preview = b64Preview;
        modalUploadContext.setOpen(false);
        await updateMedia(r);
        updateMediaToVisit(r);
    }

    const onDocImageChoosen = async ({ b64Preview, b64Thumbnail }: SnapShotType, media: IMedia) => {
        media.b64Thumbnail = b64Thumbnail;
        media.b64Preview = b64Preview;
        modalUploadContext.setOpen(false);
        await updateMedia(media);
        updateMediaToVisit(media);
    }

    const showVideoModal = async (r: UploadMediaResp) => {

        if (r.snapshots && r.snapshots.length > 0) {
            modalUploadContext.setModalTitle('Chose video thumbnail');
            modalUploadContext.setModalContent(<UserControls.Row gutter={10}>
                {r.snapshots?.map((s, i) => <UserControls.Col xs={8} key={`image_snapshot_${i}`}>
                    <UserControls.Image className={classnames.snapshotImg}
                        preview={false}
                        onClick={() => onImageClick(r, s)}
                        src={`data:image/png;base64,${s.b64Thumbnail}`} />
                </UserControls.Col>)}
            </UserControls.Row>)

            modalUploadContext.setOpen(true);

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
        modalUploadContext.setModalTitle('Chose doc thumbnail');

        modalUploadContext.setModalContent(<UserControls.Row gutter={10}>
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

        modalUploadContext.setOpen(true);

    }

    useEffect(() => {
        console.info('uploadProps', uploadProps)
    }, [uploadProps])

    // useEffect(() => {
    //     switch (selectedMediaSource?.type) {
    //         case 'image': {
    //             const props = defaultUploadProps(getDefaultParams());
    //             props.multiple = true;
    //             setUploadProps(props);
    //             break;
    //         }
    //         case 'video': {
    //             const afterAxiosPost: ParamsType['afterAxiosPost'] = async (r) => {
    //                 showVideoModal(r)
    //             }
    //             const props = defaultUploadProps({ ...getDefaultParams(), afterAxiosPost });

    //             setUploadProps(props);
    //             break;
    //         }

    //         case 'doc':
    //         default: {
    //             const afterAxiosPost: ParamsType['afterAxiosPost'] = async (r) => {
    //                 showDocModal(r)
    //             }
    //             const props = defaultUploadProps({ ...getDefaultParams(), afterAxiosPost });
    //             setUploadProps(props);
    //             break;
    //         }
    //     }

    // }, [selectedMediaSource])

    const formatBytes = (bytes: number, decimals = 2) => {
        if (!+bytes) return '0 Bytes'
        const k = 1024
        const dm = decimals < 0 ? 0 : decimals
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

        const i = Math.floor(Math.log(bytes) / Math.log(k))

        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
    }

    const MediaChooser = ({ files, visit, mediaSource, projectId }: { files: IImportMedia[], projectId: string, visit: IVisit, mediaSource: IMediaSource }) => {


        const context = useContext(ImportMediaContext);
        const { importFiles } = useMediaImport(projectId);

        const [selected, setSelected] = useState<{ [index: string]: boolean }>({})

        useEffect(() => {
            console.info('setting context.setModalOkAction(confirmSelectedFiles)')
            context.setModalOkAction(() => confirmSelectedFiles)
        }, [files, selected])

        const confirmSelectedFiles = async () => {

            await importFiles(visit, mediaSource, files.filter((f, ind) => selected[ind] === true))
            context.setOpen(false);
        }
        // const [all, setAll] = useState(false)
        const all = useMemo(() => {

            return files.filter((f, i) => {
                return selected[i] === true
            }).length == files.length


        }, [selected, files])

        const onAllChange = () => {
            if (all) {
                setSelected({})
                // setAll(false)
            } else {
                setSelected(files.reduce((prev, curr, ind) => { return { ...prev, [ind]: true } }, {}))
                // setAll(true)
            }
        }

        // useEffect(()=>{
        //     Object.

        // }, [selected])

        return <div className={classnames.importFileContainer}>
            <UserControls.List
                dataSource={files}
                header={
                    <UserControls.Row>
                        <UserControls.Col xs={2}>
                            <UserControls.Typography.Text strong>
                                <UserControls.Checkbox
                                    checked={all}
                                    onChange={onAllChange} />

                            </UserControls.Typography.Text>
                        </UserControls.Col>
                        <UserControls.Col xs={9}>
                            <UserControls.Typography.Text strong>Filename</UserControls.Typography.Text>
                        </UserControls.Col>
                        <UserControls.Col xs={4}>
                            <UserControls.Typography.Text strong>Last modified date</UserControls.Typography.Text>
                        </UserControls.Col>
                        <UserControls.Col xs={4}>
                            <UserControls.Typography.Text strong>Size</UserControls.Typography.Text>
                        </UserControls.Col>
                    </UserControls.Row>
                }
                renderItem={(item, index) => {
                    const date = new Date(item.latestUpdate).toDateString();

                    const size = formatBytes(item.size);

                    return <UserControls.Row>
                        <UserControls.Col xs={2}>
                            <UserControls.Checkbox onChange={t => setSelected(s => ({ ...s, [index]: !s[index] }))} checked={!!selected[index]} />
                        </UserControls.Col>
                        <UserControls.Col xs={9}>
                            <UserControls.Typography.Text>{item.filename}</UserControls.Typography.Text>
                        </UserControls.Col>
                        <UserControls.Col xs={4}>
                            <UserControls.Typography.Text>{date}</UserControls.Typography.Text>
                        </UserControls.Col>
                        <UserControls.Col xs={4}>
                            <UserControls.Typography.Text>{size}</UserControls.Typography.Text>
                        </UserControls.Col>
                    </UserControls.Row>
                }}
            />
        </div>

    }

    const importFiles = async () => {

        if (selectedMediaSource && selectedVisit) {
            modalImportContext.setModalTitle(`Import files for ${selectedMediaSource?.name} media source`)
            modalImportContext.setOpen(true);
            const files = await searchNewMedia(selectedMediaSource);
            modalImportContext.setModalContent(<MediaChooser files={files.data} projectId={projectId} mediaSource={selectedMediaSource} visit={selectedVisit} />);

        }
    }

    return { uploadProps, importFiles }
}
