import { ImageProps } from "antd";
import { useRef, useState } from "react";
import { useMedia } from "../../hooks/useMedia";
import { useProject } from "../../hooks/useProject";
import UserControls from "../../userControls";
import classnames from './screening.module.scss';

type PropType = Pick<VisitPropType, 'sources' | 'selectedVisit' | 'selectedMediaSource' | 'isDeleting' | 'projectId'>

export const ScreeningMedia = ({ sources, selectedVisit, selectedMediaSource, isDeleting, projectId }: PropType) => {

    const media: IMedia[] = !selectedVisit ? [] : !selectedMediaSource ? (selectedVisit.media || []) : (selectedVisit.media || []).filter(m => m.source.id == selectedMediaSource.id)
    const currIndex = useRef<number>(1)

    const { deleteMedia } = useMedia();
    const { removeMedia } = useProject(projectId);
    const [selectedMedia, setSelectedMedia] = useState<IMedia>();
    const [previewVisible, setPreviewVisible] = useState(false);

    const onImageClick = (media: IMedia) => {
        if (isDeleting) {

            UserControls.Modal.confirm({
                title: 'confirm',
                content: 'Are you sure you want to delete selected media?',
                onOk: async () => {
                    deleteMedia(media.id)
                    removeMedia(media.id)

                }
            })

        }
    }


    const src = selectedMedia ? `${location.origin}/api/protected/media/${selectedMedia.id}` : ''
    const type = selectedMedia ? selectedMedia.source.type : 'none'


    return <>
        <UserControls.Modal open={!!selectedMedia} wrapClassName={classnames.bigModalWrap} onCancel={() => setSelectedMedia(undefined)}
            footer={[<UserControls.Button type="primary" href={src} download>
                DOWNLOAD
            </UserControls.Button>,
            <UserControls.Button type="primary" onClick={() => setSelectedMedia(undefined)}>
                CLOSE
            </UserControls.Button>
            ]}
        >

            {selectedMedia && type == 'image' && <UserControls.Image src={src} preview={false} />}
            {selectedMedia && type == 'video' && <video controls autoPlay={true} src={src}>
                <source src={src} type={'video/mp4'} />
            </video>}
            {selectedMedia && type == 'doc' && <embed src={src} width={'100%'} height={'100%'}>
            </embed>}
        </UserControls.Modal>
        <UserControls.Image.PreviewGroup
            preview={{
                visible: previewVisible,
                onVisibleChange(value, prevValue) {
                    setPreviewVisible(value);
                },
                countRender(current, total) {

                    currIndex.current = current;
                    // console.info('countRender(current, total)', current)
                    return `${current}/${total}`
                },
                // modalRender: node => <div style={{ backgroundColor: 'green', padding: 20 }} onClick={() => alert('ok')}>{node}</div>,
                bodyProps: {
                    header: <div style={{ backgroundColor: 'green' }}></div>,
                    className: classnames.previewItemContainer,
                    onClick: async (event: any) => {
                        const item = media[currIndex.current - 1];
                        switch (item.source.type) {
                            case 'image': {
                                console.warn('TODO => fetch high res image');
                                break;
                            }
                            case 'video': {
                                console.warn('TODO => fetch high res video and open player')
                                break;
                            }
                            case 'doc': {
                                console.warn('TODO => download and show doc')
                                break;
                            }
                        }
                        setPreviewVisible(false);
                        setSelectedMedia(item);
                        // setIframSrc(`${location.origin}/api/protected/media/${item.id}`)
                        // window.open(`/api/protected/media/${item.id}`);
                    }
                }
            }}
        >
            {media.map(m => {
                const src = m.b64Thumbnail ? `data:image/png;base64,${m.b64Thumbnail}` : m.source.defaultThumbnailB64;
                const preview: ImageProps['preview'] = isDeleting ? false : {
                    src: m.b64Preview ? `data:image/png;base64,${m.b64Preview}` : m.b64Thumbnail ? m.b64Thumbnail : m.source.defaultThumbnailB64,
                };
                return <UserControls.Image
                    className={isDeleting ? classnames.deleteImage : classnames.image}
                    key={m.id}
                    width={200}
                    src={src}
                    preview={preview}
                    onClick={() => onImageClick(m)}
                />
            })
            }
        </UserControls.Image.PreviewGroup>


    </>
}