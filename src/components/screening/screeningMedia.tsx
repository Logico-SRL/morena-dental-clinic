import { ImageProps } from "antd";
import { useRef, useState } from "react";
import { useMedia } from "../../hooks/useMedia";
import { useVisit } from "../../hooks/useVisit";
import UserControls from "../../userControls";
import { AntdIcons } from "../../userControls/icons";
import { defaultsB64 } from "./defaults";
import classnames from './screening.module.scss';
import { ScreeningMediaViewer } from "./screeningMediaViewer";

type PropType = Pick<VisitPropType, 'sources' | 'selectedVisit' | 'selectedMediaSource' | 'isDeleting' | 'projectId'>




export const ScreeningMedia = ({ sources, selectedVisit, selectedMediaSource, isDeleting, projectId }: PropType) => {

    const media: IMedia[] = !selectedVisit ? [] : !selectedMediaSource ? (selectedVisit.media || []) : (selectedVisit.media || []).filter(m => m && m.source.id == selectedMediaSource.id)
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
                {media.filter(m => !!m).map(m => {
                    const def = defaultsB64[m.source.type]
                    const src = m.b64Thumbnail ? `data:image/png;base64,${m.b64Thumbnail}` : m.source.defaultThumbnailB64 || def;
                    const preview: ImageProps['preview'] = isDeleting ? false : {
                        src: m.b64Preview ?
                            `data:image/png;base64,${m.b64Preview}` :
                            m.b64Thumbnail ?
                                `data:image/png;base64,${m.b64Thumbnail}` :
                                m.source.defaultThumbnailB64 || def,
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