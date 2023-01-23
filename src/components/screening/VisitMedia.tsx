import { ImageProps, UploadProps } from "antd";
import { UploadChangeParam, UploadFile } from "antd/es/upload";
import { useEffect, useRef, useState } from "react";
import { useProject } from "../../hooks/useProject";
import { useSettings } from "../../hooks/useSettings";
import UserControls from "../../userControls";
import { AntdIcons } from "../../userControls/icons";
import classnames from './screening.module.scss';

type PropType = {
    sources: IMediaSource[],
    selectedVisit: IVisit | undefined,
    segmentValue: string | number,
    onSourceChange: (mediaSourceId: string | number) => void,
    selectedMediaSource?: IMediaSource,
    projectId: string,
    setSelectedVisit: (visit: IVisit | undefined) => void
}

export const VisitMedia = ({ projectId }: Pick<PropType, 'projectId'>) => {

    const { selectedVisit, loadingProject, setSelectedVisit } = useProject(projectId)
    const { settings } = useSettings();
    const [selectedMediaSource, setSelectedMediaSource] = useState<IMediaSource>()

    useEffect(() => {
        if (settings.mediaSources) {
            setSelectedMediaSource(settings.mediaSources[0])
        }
    }, [settings])


    const onSourceChange = (mediaSourceId: string | number) => {
        const found = settings.mediaSources.find(m => m.id === mediaSourceId);
        setSelectedMediaSource(found)
    }

    return <UserControls.Skeleton loading={loadingProject}>
        <ScreeningMediaSources sources={settings.mediaSources} selectedVisit={selectedVisit} onSourceChange={onSourceChange} segmentValue={selectedMediaSource?.id || ''} />
        <ScreeningMediaActions selectedVisit={selectedVisit} selectedMediaSource={selectedMediaSource} projectId={projectId} setSelectedVisit={setSelectedVisit} />
        <ScreeningMedia sources={settings.mediaSources} selectedVisit={selectedVisit} selectedMediaSource={selectedMediaSource} />
    </UserControls.Skeleton>
}
const ScreeningMediaActions = ({ selectedMediaSource, selectedVisit, projectId, setSelectedVisit }: Pick<PropType, 'selectedMediaSource' | 'selectedVisit' | 'projectId' | 'setSelectedVisit'>) => {

    const [fileList, setFileList] = useState<Array<UploadFile<IMedia>>>([])

    const props: UploadProps = {
        action: `/api/protected/projects/${projectId}/visits/${selectedVisit?.id || ''}/mediasources/${selectedMediaSource?.id || ''}/upload`,
        listType: 'picture',
        showUploadList: true,
        fileList,
        // fileList: [],
        multiple: false,
        onChange: (info: UploadChangeParam<UploadFile<IMedia>>) => {

            const { status, response } = info.file;
            if (status === 'done' || status === 'success') {
                setFileList([]);
                if (selectedVisit && response)
                    setSelectedVisit({ ...selectedVisit, media: [...selectedVisit.media, response] })
            } else {
                setFileList(info.fileList)
            }
        },
        previewFile: async (file) => {
            console.log('Your upload file:', file);
            return ''
        },
    };

    return <UserControls.Col xs={24} className={classnames.actions} >
        <UserControls.Upload {...props} >
            <UserControls.Button disabled={!selectedVisit || !selectedMediaSource} icon={<AntdIcons.PlusOutlined />}>
                Upload
            </UserControls.Button>
        </UserControls.Upload>
        <UserControls.Button disabled={!selectedVisit || !selectedMediaSource} icon={<AntdIcons.UploadOutlined />} onClick={() => alert('TODO')}>
            Export
        </UserControls.Button>
    </UserControls.Col>
}

const ScreeningMedia = ({ sources, selectedVisit, selectedMediaSource }: Pick<PropType, 'sources' | 'selectedVisit' | 'selectedMediaSource'>) => {



    const media: Omit<IMedia, 'visit'>[] = !selectedVisit ? [] : !selectedMediaSource ? selectedVisit.media : selectedVisit.media.filter(m => m.source.id == selectedMediaSource.id)
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
                className: classnames.previewItemContainer,
                onClick: async (event: any) => {
                    const item = media[currIndex.current - 1];
                    switch (item.type) {
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

const ScreeningMediaSources = ({ sources, selectedVisit, onSourceChange, segmentValue }: Pick<PropType, 'sources' | 'selectedVisit' | 'onSourceChange' | 'segmentValue'>) => {

    const segments = sources.map(source => ({
        value: source.id,
        label: <div style={{ padding: 5 }}>{source.name}</div>
    }))
    return <UserControls.Segmented
        disabled={!selectedVisit}
        value={segmentValue}
        style={{ flexWrap: 'wrap', display: 'flex' }}
        onChange={onSourceChange}
        // block
        options={segments}
    />
    {/* {sources.map(source => <UserControls.Col>
            <UserControls.Button disabled={!selectedVisit} style={{ borderRadius: 20 }} size={'large'} type="primary">{source.name}</UserControls.Button>
        </UserControls.Col>)} */}
}