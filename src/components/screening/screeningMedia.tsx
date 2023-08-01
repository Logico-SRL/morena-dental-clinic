import { ImageProps } from "antd";
import { useRef, useState } from "react";
import { useMedia } from "../../hooks/useMedia";
import { useVisit } from "../../hooks/useVisit";
import UserControls from "../../userControls";
import { AntdIcons } from "../../userControls/icons";
import classnames from './screening.module.scss';
import { ScreeningMediaViewer } from "./screeningMediaViewer";

type PropType = Pick<VisitPropType, 'sources' | 'selectedVisit' | 'selectedMediaSource' | 'isDeleting' | 'projectId'>


const defB64 = `data:image/png;base64,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`

export const ScreeningMedia = ({ sources, selectedVisit, selectedMediaSource, isDeleting, projectId }: PropType) => {

    const media: IMedia[] = !selectedVisit ? [] : !selectedMediaSource ? (selectedVisit.media || []) : (selectedVisit.media || []).filter(m => m.source.id == selectedMediaSource.id)
    const currIndex = useRef<number>(1)
    // const [current, setCurrent] = useState(0)

    const { deleteMedia } = useMedia();
    const { removeMediaFromVisit } = useVisit(projectId, selectedVisit?.id || '')
    const [selectedMedia, setSelectedMedia] = useState<IMedia>();
    const [previewVisible, setPreviewVisible] = useState(false);

    const onImageClick = (media: IMedia) => {
        if (isDeleting) {

            UserControls.Modal.confirm({
                title: 'confirm',
                content: 'Are you sure you want to delete selected media?',
                onOk: async () => {
                    deleteMedia(media.id)
                    removeMediaFromVisit(media.id)

                }
            })
        }
    }

    const onScreeningMediaViewerCancel = () => {
        setSelectedMedia(undefined)
        // setPreviewVisible(true);
    }


    return <>
        <ScreeningMediaViewer selectedMedia={selectedMedia} onCancel={onScreeningMediaViewerCancel} />
        <UserControls.Row>
            <UserControls.Image.PreviewGroup
                preview={{
                    visible: previewVisible,
                    // current,
                    onVisibleChange(value, prevValue) {
                        setPreviewVisible(value);
                    },
                    countRender(curr, total) {
                        // console.info('countRender(curr, total)', curr, total, 'current', current)
                        // if (previewVisible && current != curr)
                        //     setCurrent(curr - 1)
                        currIndex.current = curr;
                        return `${curr}/${total}`
                    },
                    // modalRender: node => <div style={{ backgroundColor: 'green', padding: 20 }} onClick={() => alert('ok')}>{node}</div>,
                    bodyProps: {
                        header: <div style={{ backgroundColor: 'green' }}></div>,
                        className: classnames.previewItemContainer,
                        onClick: async (event: any) => {
                            const item = media[currIndex.current - 1];
                            // switch (item.source.type) {
                            //     case 'image': {
                            //         console.warn('TODO => fetch high res image');
                            //         break;
                            //     }
                            //     case 'video': {
                            //         console.warn('TODO => fetch high res video and open player')
                            //         break;
                            //     }
                            //     case 'doc': {
                            //         console.warn('TODO => download and show doc')
                            //         break;
                            //     }
                            // }
                            setPreviewVisible(false);
                            setSelectedMedia(item);
                            // setIframSrc(`${location.origin}/api/protected/media/${item.id}`)
                            // window.open(`/api/protected/media/${item.id}`);
                        }
                    }
                }}
            >
                {media.map(m => {
                    const src = m.b64Thumbnail ? `data:image/png;base64,${m.b64Thumbnail}` : m.source.defaultThumbnailB64 || defB64;
                    const preview: ImageProps['preview'] = isDeleting ? false : {
                        src: m.b64Preview ?
                            `data:image/png;base64,${m.b64Preview}` :
                            m.b64Thumbnail ?
                                `data:image/png;base64,${m.b64Thumbnail}` :
                                m.source.defaultThumbnailB64 || defB64,
                        mask: <UserControls.Space direction="vertical" size={0}>
                            <UserControls.Space direction="horizontal">
                                <AntdIcons.EyeOutlined />
                                <UserControls.Typography>Preview</UserControls.Typography>
                            </UserControls.Space>
                            <UserControls.Typography>{m.filename}</UserControls.Typography>
                        </UserControls.Space>
                    };
                    return <UserControls.Image
                        className={isDeleting ? classnames.deleteImage : classnames.image}
                        key={m.id}
                        // width={200}
                        // height={200}
                        wrapperClassName={classnames.imageWrapper}
                        src={src}
                        preview={preview}
                        onClick={() => onImageClick(m)}
                    />
                })
                }
            </UserControls.Image.PreviewGroup>
        </UserControls.Row>
    </>
}