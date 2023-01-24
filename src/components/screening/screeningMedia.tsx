import { ImageProps } from "antd";
import { useRef } from "react";
import UserControls from "../../userControls";
import classnames from './screening.module.scss';

export const ScreeningMedia = ({ sources, selectedVisit, selectedMediaSource }: Pick<VisitPropType, 'sources' | 'selectedVisit' | 'selectedMediaSource'>) => {



    const media: IMedia[] = !selectedVisit ? [] : !selectedMediaSource ? (selectedVisit.media || []) : (selectedVisit.media || []).filter(m => m.source.id == selectedMediaSource.id)
    const currIndex = useRef<number>(1)

    return <UserControls.Image.PreviewGroup
        preview={{
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

                    window.open(`/api/protected/media/${item.id}/download`);
                }
            }
        }}
    >
        {media.map(m => {
            const src = m.b64Thumbnail ? `data:image/png;base64,${m.b64Thumbnail}` : m.source.defaultThumbnailB64;
            const preview: ImageProps['preview'] = {
                src: m.b64Preview ? `data:image/png;base64,${m.b64Preview}` : m.source.defaultThumbnailB64,
            };
            return <UserControls.Image
                key={m.id}
                width={200}
                src={src}
                preview={preview}
            />
        })
        }
    </UserControls.Image.PreviewGroup>
}