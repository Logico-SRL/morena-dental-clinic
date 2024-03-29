import { FunctionComponent, useEffect, useRef, useState } from "react";
import UserControls from "../../userControls";
import classnames from './screening.module.scss';
import { TacViewer } from "./viewer/tacViewer";

type PropType = {
    selectedMedia: IMedia | undefined,
    onCancel: () => void

}
export const ScreeningMediaViewer: FunctionComponent<PropType> = ({ selectedMedia, onCancel }) => {

    const src = selectedMedia ? `${location.origin}/api/protected/media/${selectedMedia.id}` : ''
    const srcDownload = selectedMedia ? `${location.origin}/api/protected/media/${selectedMedia.id}/download` : ''
    const type = selectedMedia ? selectedMedia.source.type : 'none'
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const embedRef = useRef<HTMLEmbedElement | null>(null);
    const [unload, setUnload] = useState(false);

    useEffect(() => {

        if (!selectedMedia) {
            disposeMedia();
        } else {
            setUnload(false);
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
        setUnload(true)
    }

    const onInternalCancel = () => {
        disposeMedia();
        setTimeout(() => {
            onCancel();
        }, 200);
    }

    // console.info('rendering src', src)

    return <UserControls.Modal open={!!selectedMedia} wrapClassName={classnames.bigModalWrap} onCancel={onInternalCancel}
        footer={[<UserControls.Button key={'download'} type="primary" href={srcDownload} download>
            DOWNLOAD
        </UserControls.Button>,
        <UserControls.Button key={'close'} type="primary" onClick={onInternalCancel}>
            CLOSE
        </UserControls.Button>
        ]}
    >

        {type == 'image' && <UserControls.Image src={src} preview={false} style={{ maxWidth: '100%', maxHeight: '100%' }} />}
        {type == 'video' && <video ref={videoRef} style={{ maxWidth: '100%', maxHeight: '100%' }} controls autoPlay={true} src={src}>
            <source src={src} type={'video/mp4'} />
        </video>}
        {type == 'doc' && <embed ref={embedRef} src={src} width={'100%'} height={'100%'} />}
        {type == 'tac' && <TacViewer src={src} unload={unload} />}
    </UserControls.Modal>
}