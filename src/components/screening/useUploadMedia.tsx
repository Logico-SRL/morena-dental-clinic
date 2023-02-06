import { UploadFile, UploadProps } from "antd";
import { UploadChangeParam } from "antd/es/upload";
import axios, { AxiosRequestConfig } from "axios";
import dayjs from "dayjs";
import { useContext, useEffect, useMemo, useState } from "react";
import { acceptedFileExtensions } from "../../configurations/acceptedFileExtensions";
import { useMedia } from "../../hooks/useMedia";
import { useMediaImport } from "../../hooks/useMediaImport";
import { useProject } from "../../hooks/useProject";
import { useVisit } from "../../hooks/useVisit";
import UserControls from "../../userControls";
import { formatUtils } from "../../utils/formatUtils";
import { ImportMediaContext } from "./import/importMediaContext";
import classnames from './screening.module.scss';
import { UploadMediaContext } from "./upload/uploadMediaContext";
import { useDocUpload } from "./upload/useDocUpload";
import { useVideUpload } from "./upload/useVideoUpload";


export type UploadPropsParamsType = {
    projectId: string,
    visitId: string,
    mediaSourceId: string,
    addMedia: (media: IMedia) => void,
    fileList: UploadFile<IMedia>[],
    setFileList: Dispatch<SetStateAction<UploadFile<IMedia>[]>>
    afterAxiosPost?: (res: UploadMediaResp) => {},
    mediaSourceType: mediaTypes
}


const defaultUploadProps: (params: UploadPropsParamsType) => UploadProps = ({
    projectId, visitId, mediaSourceId, addMedia, setFileList, fileList, afterAxiosPost, mediaSourceType
}) => ({
    listType: 'picture',
    showUploadList: true,
    multiple: false,
    fileList,
    accept: acceptedFileExtensions[mediaSourceType],
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

            onSuccess && onSuccess(res.data);
            console.info("file uploaded res", res);
            if (afterAxiosPost) {
                await afterAxiosPost(res.data)
            }
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
    beforeUpload(file, FileList) {
        console.info(`beforeUpload file.type ${file.type}`)
        // const accepted = file.type.startsWith(mediaSourceType)
        // return accepted;
        return true
    },
})


export const useUploadMedia = (projectId: string, selectedMediaSource: IMediaSource | undefined) => {

    const [fileList, setFileList] = useState<Array<UploadFile<IMedia>>>([])
    const { selectedVisit } = useProject(projectId)
    const { visit, addMediaToVisit } = useVisit(projectId, selectedVisit?.id || '')
    const { updateMedia, searchNewMedia } = useMedia()

    const modalUploadContext = useContext(UploadMediaContext);
    const modalImportContext = useContext(ImportMediaContext);

    useEffect(() => {
        console.info('fileList effect', fileList)
    }, [fileList])

    const getDefaultParams: () => UploadPropsParamsType = () => ({
        projectId,
        visitId: selectedVisit?.id || '',
        mediaSourceId: selectedMediaSource?.id || '',
        mediaSourceType: selectedMediaSource?.type || 'doc',
        addMedia: addMediaToVisit,
        fileList,
        setFileList,
    })

    const { afterAxiosPostVideo } = useVideUpload(projectId, selectedVisit?.id || '');
    const { afterAxiosPostDoc } = useDocUpload(projectId, selectedVisit?.id || '');


    const uploadProps = useMemo(() => {
        switch (selectedMediaSource?.type) {
            case 'image': {
                const props = defaultUploadProps(getDefaultParams());
                props.multiple = true;
                return props;
            }
            case 'video': {
                return defaultUploadProps({ ...getDefaultParams(), afterAxiosPost: afterAxiosPostVideo });
            }

            case 'doc':
            default: {
                return defaultUploadProps({ ...getDefaultParams(), afterAxiosPost: afterAxiosPostDoc });
            }
        }
    }, [projectId, selectedVisit, selectedMediaSource, addMediaToVisit, fileList, setFileList]);









    const MediaChooser = ({ visit, mediaSource, projectId }: { projectId: string, visit: IVisit, mediaSource: IMediaSource }) => {


        const context = useContext(ImportMediaContext);
        const { importFiles } = useMediaImport(projectId);

        const [selected, setSelected] = useState<{ [index: string]: boolean }>({})

        useEffect(() => {
            console.info('setting context.setModalOkAction(confirmSelectedFiles)')
            context.setModalOkAction(() => confirmSelectedFiles)
        }, [selected])

        const confirmSelectedFiles = async () => {

            await importFiles(visit, mediaSource, context.files.filter((f, ind) => selected[ind] === true))
            context.setOpen(false);
            context.setFiles([])
        }
        // const [all, setAll] = useState(false)
        const all = useMemo(() => {

            return context.files.filter((f, i) => {
                return selected[i] === true
            }).length == context.files.length


        }, [selected, context.files])

        const onAllChange = () => {
            if (all) {
                setSelected({})
                // setAll(false)
            } else {
                setSelected(context.files.reduce((prev, curr, ind) => { return { ...prev, [ind]: true } }, {}))
                // setAll(true)
            }
        }

        // useEffect(()=>{
        //     Object.

        // }, [selected])

        const toggleItem = (index: number) => {
            setSelected(s => ({ ...s, [index]: !s[index] }))
        }

        return <div className={classnames.importFileContainer}>
            <UserControls.List
                dataSource={context.files}
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
                    const date = dayjs(item.latestUpdate).format('YYYY-MM-DD HH:mm:ss')

                    const size = formatUtils.formatBytes(item.size);

                    return <UserControls.Row className={classnames.importListItem} onClick={e => { e.stopPropagation(); e.preventDefault(); toggleItem(index) }}>
                        <UserControls.Col xs={2}>
                            <UserControls.Checkbox onChange={() => toggleItem(index)} checked={!!selected[index]} />
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
            modalImportContext.setFiles(files.data)
            modalImportContext.setModalContent(<MediaChooser projectId={projectId} mediaSource={selectedMediaSource} visit={selectedVisit} />);

        }
    }

    return { uploadProps, importFiles }
}
