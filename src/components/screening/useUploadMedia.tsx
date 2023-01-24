import { UploadFile, UploadProps } from "antd";
import { UploadChangeParam } from "antd/es/upload";
import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import { useMedia } from "../../hooks/useMedia";
import { useProject } from "../../hooks/useProject";
import UserControls from "../../userControls";


type paramsType = {
    projectId: string,
    visitId: string,
    mediaSourceId: string,
    addMedia: (media: IMedia) => void,
    setFileList: Dispatch<SetStateAction<UploadFile<IMedia>[]>>
    afterAxiosPost?: (res: uploadResp) => {}
}

type uploadResp = IMedia & { snapshots?: string[] }

const defaultUploadProps: (params: paramsType) => UploadProps = ({ projectId, visitId, mediaSourceId, addMedia, setFileList, afterAxiosPost }) => ({
    listType: 'picture',
    showUploadList: true,
    // fileList,
    multiple: true,
    // beforeUpload: async (file, FileList) => {
    //     const val = await new Promise<boolean>(res => {
    //         UserControls.Modal.confirm({
    //             title: '...',
    //             content: 'che si fa?',
    //             onOk: () => res(true),
    //             onCancel: () => res(false)
    //         })
    //     })
    //     return val;
    // },
    customRequest: async options => {
        const { onSuccess, onError, file, onProgress } = options;

        const fmData = new FormData();

        const config: AxiosRequestConfig<IMedia> = {
            headers: { "content-type": "multipart/form-data" },
            onUploadProgress: event => {
                // const percent = Math.floor((event.loaded / (event.total || 1)) * 100);
                // setProgress(percent);
                // if (percent === 100) {
                //     setTimeout(() => setProgress(0), 1000);
                // }
                if (onProgress)
                    ({ percent: (event.loaded / (event.total || 1)) * 100 });
            }
        };
        fmData.append("image", file);
        try {
            const res = await axios.post<uploadResp>(
                `/api/protected/projects/${projectId}/visits/${visitId}/mediasources/${mediaSourceId}/upload`,
                fmData,
                config
            );

            onSuccess && onSuccess("Ok");
            console.info("file uploaded res", res);
            afterAxiosPost && await afterAxiosPost(res.data)

            addMedia(res.data)
        } catch (err) {
            onError && onError(err as any);
        }
    },
    onChange: (info: UploadChangeParam<UploadFile<IMedia>>) => {

        const { status, response } = info.file;
        // console.info('onChange status, response', info)
        if (status === 'done' || status === 'success') {
            setFileList([]);
            // if (selectedVisit && response) {
            //     console.info('onChange done respones', response);
            //     addMedia(response)
            // }
        } else {
            setFileList(info.fileList)
        }
    },
    previewFile: async (file) => {
        console.log('Your upload file:', file);
        return ''
    },
})

export const useUploadMedia = (projectId: string, selectedMediaSource: IMediaSource | undefined) => {

    const [fileList, setFileList] = useState<Array<UploadFile<IMedia>>>([])
    const { addMedia, selectedVisit } = useProject(projectId)
    const { updateMedia } = useMedia()

    const getDefaultParams = () => ({
        projectId,
        visitId: selectedVisit?.id || '',
        mediaSourceId: selectedMediaSource?.id || '',
        addMedia,
        setFileList
    })

    const [uploadProps, setUploadProps] = useState<UploadProps>(defaultUploadProps(getDefaultParams()));
    const [showSnapshotModal, setShowSnapshotModal] = useState(false);

    useEffect(() => {
        switch (selectedMediaSource?.type) {
            case 'image': {
                const props = defaultUploadProps(getDefaultParams());

                setUploadProps(props);
                break;
            }
            case 'video': {
                const afterAxiosPost: paramsType['afterAxiosPost'] = async (r) => {


                    if (r.snapshots && r.snapshots.length > 0) {
                        const snap = await new Promise<string | undefined>((res, rej) => {

                            const onImageClick = async (s: string) => {
                                res(s)
                            }

                            UserControls.Modal.info({
                                open: showSnapshotModal,
                                width: '80vw',
                                title: 'Choose video snapshot',
                                content: <UserControls.Row gutter={10}>
                                    {r.snapshots?.map((s, i) => <UserControls.Col xs={8} key={`image_snapshot_${i}`}>
                                        <UserControls.Image preview={false} onClick={() => onImageClick(s)} src={`data:image/png;base64,${s}`} />
                                    </UserControls.Col>)}
                                </UserControls.Row>,
                                closable: true,
                                maskClosable: true,
                                onCancel: () => {
                                    res(undefined)
                                },
                                onOk: () => {
                                    res(undefined);
                                },
                                okText: `keep default`

                            })
                        })

                        setShowSnapshotModal(false);
                        if (snap) {

                            r.b64Thumbnail = snap;
                            r.b64Preview = '';
                            await updateMedia(r);
                        }
                    }
                }
                const props = defaultUploadProps({ ...getDefaultParams(), afterAxiosPost });

                // props.previewFile = async (file) => {
                //     console.log('Your upload file:', file);
                //     return ''
                // }
                setUploadProps(props);
                break;
            }

            case 'doc':
            default: {
                const props = defaultUploadProps(getDefaultParams());
                setUploadProps(props);
                break;
            }
        }

    }, [selectedMediaSource])

    return { uploadProps }
}
