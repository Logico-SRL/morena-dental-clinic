import { useContext } from "react";
import { useMedia } from "../../../hooks/useMedia";
import { useVisit } from "../../../hooks/useVisit";
import UserControls from "../../../userControls";
import classnames from '../screening.module.scss';
import { UploadPropsParamsType } from "../useUploadMedia";
import { UploadMediaContext } from "./uploadMediaContext";

export const useVideUpload = (projectId: string, visitId: string) => {

    const modalUploadContext = useContext(UploadMediaContext);
    const { updateMediaToVisit } = useVisit(projectId, visitId)
    const { updateMedia } = useMedia()

    const onImageClick = async (r: UploadMediaResp, { b64Preview, b64Thumbnail }: SnapShotType) => {
        r.b64Thumbnail = b64Thumbnail;
        r.b64Preview = b64Preview;
        modalUploadContext.setOpen(false);
        await updateMedia(r);
        updateMediaToVisit(r);
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

    const afterAxiosPostVideo: UploadPropsParamsType['afterAxiosPost'] = async (r) => {
        showVideoModal(r)
    }



    return { afterAxiosPostVideo }
}