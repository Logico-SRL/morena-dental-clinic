import { FunctionComponent, useEffect, useRef } from "react";
import UserControls from "../../userControls";
import classnames from './screening.module.scss';

type PropType = {
    selectedMedia: IMedia | undefined,
    onCancel: () => void

}
export const ScreeningMediaViewer: FunctionComponent<PropType> = ({ selectedMedia, onCancel }) => {

    const src = selectedMedia ? `${location.origin}/api/protected/media/${selectedMedia.id}` : ''
    const type = selectedMedia ? selectedMedia.source.type : 'none'
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const embedRef = useRef<HTMLEmbedElement | null>(null);

    useEffect(() => {
        if (!selectedMedia) {
            disposeMedia();
        }
    }, [selectedMedia])

    const disposeMedia = () => {
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current = null;
        }
        if (embedRef.current) {
            embedRef.current = null;
        }
    }

    return <UserControls.Modal open={!!selectedMedia} wrapClassName={classnames.bigModalWrap} onCancel={onCancel}
        footer={[<UserControls.Button type="primary" href={src} download>
            DOWNLOAD
        </UserControls.Button>,
        <UserControls.Button type="primary" onClick={onCancel}>
            CLOSE
        </UserControls.Button>
        ]}
    >

        {selectedMedia && type == 'image' && <UserControls.Image src={src} preview={false} style={{ maxWidth: '100%', maxHeight: '100%' }} />}
        {selectedMedia && type == 'video' && <video ref={videoRef} style={{ maxWidth: '100%', maxHeight: '100%' }} controls autoPlay={true} src={src}>
            <source src={src} type={'video/mp4'} />
        </video>}
        {selectedMedia && type == 'doc' && <embed ref={embedRef} src={src} width={'100%'} height={'100%'}>
        </embed>}
    </UserControls.Modal>
}