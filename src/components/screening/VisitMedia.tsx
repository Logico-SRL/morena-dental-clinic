import { UploadProps } from "antd";
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
    projectId: string
}

export const VisitMedia = ({ projectId }: Pick<PropType, 'projectId'>) => {

    const { selectedVisit, loadingProject } = useProject(projectId)
    const { settings } = useSettings();

    useEffect(() => {
        if (settings.mediaSources) {
            setSelectedMediaSource(settings.mediaSources[0])
        }
    }, [settings])

    const [selectedMediaSource, setSelectedMediaSource] = useState<IMediaSource>()

    const onSourceChange = (mediaSourceId: string | number) => {
        const found = settings.mediaSources.find(m => m.id === mediaSourceId);
        setSelectedMediaSource(found)
    }

    return <UserControls.Skeleton loading={loadingProject}>
        <ScreeningMediaSources sources={settings.mediaSources} selectedVisit={selectedVisit} onSourceChange={onSourceChange} segmentValue={selectedMediaSource?.id || ''} />
        <ScreeningMediaActions selectedVisit={selectedVisit} selectedMediaSource={selectedMediaSource} projectId={projectId} />
        <ScreeningMedia sources={settings.mediaSources} selectedVisit={selectedVisit} />
    </UserControls.Skeleton>
}
const ScreeningMediaActions = ({ selectedMediaSource, selectedVisit, projectId }: Pick<PropType, 'selectedMediaSource' | 'selectedVisit' | 'projectId'>) => {

    const props: UploadProps = {
        action: `/api/protected/projects/${projectId}/visits/${selectedVisit?.id || ''}/mediasources/${selectedMediaSource?.id || ''}/upload`,
        listType: 'picture',
        previewFile: async (file) => {
            console.log('Your upload file:', file);
            return ''
            // Your process logic. Here we just mock to the same file
            // return fetch('https://next.json-generator.com/api/json/get/4ytyBoLK8', {
            //     method: 'POST',
            //     body: file,
            // })
            //     .then((res) => res.json())
            //     .then(({ thumbnail }) => thumbnail);
        },
    };

    return <UserControls.Col xs={24} className={classnames.actions} >
        <UserControls.Upload {...props}>
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

    // const mocked: Omit<IMedia, 'visit'>[] = [{
    //     id: '1',
    //     path: '',
    //     b64Preview: b64Img,
    //     b64Thumbnail: b64ImgSmall,
    //     createdOn: new Date(),
    //     source: {
    //         id: '1',
    //         name: 'TAC',
    //     },
    //     meta: '{}',
    //     type: 'image',
    // },
    // {
    //     id: '2',
    //     path: '',
    //     b64Preview: b64Img,
    //     b64Thumbnail: b64ImgSmall,
    //     createdOn: new Date(),
    //     source: {
    //         id: '1',
    //         name: 'TAC',
    //     },
    //     meta: '{}',
    //     type: 'image',
    // }]

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
        {media.map(m => <UserControls.Image

            key={m.id}
            width={200}
            src={`data:image/png;base64,${m.b64Thumbnail}`}
            preview={{
                src: `data:image/png;base64,${m.b64Preview}`,
                // className: 'cravino'
                // title: 'cravino',
                // wrapProps: {
                //     'data-test-id': 'cravino'
                // }
            }}
        // src={m.path}
        />)}
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