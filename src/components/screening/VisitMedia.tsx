import { useProject } from "../../hooks/useProject";
import { useSettings } from "../../hooks/useSettings";
import UserControls from "../../userControls";

export const VisitMedia = ({ projectId }: { projectId: string }) => {

    const { selectedVisit, loadingProject } = useProject(projectId)
    const { settings } = useSettings();


    return <UserControls.Skeleton loading={loadingProject}>
        <ScreeningMediaSources sources={settings.mediaSources} selectedVisit={selectedVisit} />
    </UserControls.Skeleton>
}

const ScreeningMediaSources = ({ sources, selectedVisit }: { sources: IMediaSource[], selectedVisit: IVisit | undefined }) => {
    return <UserControls.Row gutter={10}>
        {sources.map(source => <UserControls.Col>
            <UserControls.Button disabled={!selectedVisit} style={{ borderRadius: 20 }} size={'large'} type="primary">{source.name}</UserControls.Button>
        </UserControls.Col>)}
    </UserControls.Row>
}