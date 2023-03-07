import { UploadFile } from "antd";
import { UploadChangeParam } from "antd/es/upload";
import axios, { AxiosRequestConfig } from "axios";
import { useContext, useRef, useState } from "react";
import { acceptedFileExtensions } from "../../../configurations/acceptedFileExtensions";
import { useMedia } from "../../../hooks/useMedia";
import { useVisit } from "../../../hooks/useVisit";
import UserControls from "../../../userControls";
import { AntdIcons } from "../../../userControls/icons";
import { UploadPropsParamsType } from "../useUploadMedia";
import { UploadMediaContext } from "./uploadMediaContext";

export const useDocUpload = (projectId: string, visitId: string) => {

    const modalUploadContext = useContext(UploadMediaContext);
    const { updateMediaToVisit } = useVisit(projectId, visitId)
    const { updateMedia } = useMedia()
    const curResp = useRef<UploadMediaResp>();

    const [docFileList, setDocFileList] = useState<any[]>([])

    const onDocImageChoosen = async ({ b64Preview, b64Thumbnail }: SnapShotType, media: IMedia) => {
        media.b64Thumbnail = b64Thumbnail;
        media.b64Preview = b64Preview;
        modalUploadContext.setOpen(false);
        await updateMedia(media);
        updateMediaToVisit(media);
    }

    const onDocUploadChange = async (pars: UploadChangeParam<UploadFile<SnapShotType>>) => {

        const { status, response } = pars.file
        // console.info('onDocUploadChange', pars);

        if (status == 'done' || status == 'success') {
            setDocFileList([])
        }
        else {
            setDocFileList(pars.fileList)
        }
    }


    const showDocModal = async (r: UploadMediaResp) => {

        curResp.current = r;
        modalUploadContext.setModalTitle('Chose doc thumbnail');

        modalUploadContext.setModalContent(<UserControls.Row gutter={10}>
            <UserControls.Col xs={24}>
                <UserControls.Upload
                    accept={acceptedFileExtensions.image}
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

                            // console.info("thumnail axios res", res);

                            onSuccess && onSuccess(res.data);
                            setDocFileList([])
                            onDocImageChoosen(res.data || { b64Preview: '', b64Thumbnail: '' }, r)
                            modalUploadContext.setOpen(false);

                        } catch (err) {
                            onError && onError(err as any);
                        }
                    }}
                    // action={`/api/protected/files/thumbnails`}
                    onChange={onDocUploadChange}
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

    const afterAxiosPostDoc: UploadPropsParamsType['afterAxiosPost'] = async (r) => {
        showDocModal(r)
    }

    return { afterAxiosPostDoc }
}