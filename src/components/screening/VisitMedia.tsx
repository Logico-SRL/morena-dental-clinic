import { useEffect, useState } from "react";
import { useProject } from "../../hooks/useProject";
import { useSettings } from "../../hooks/useSettings";
import UserControls from "../../userControls";
import { ScreeningMedia } from "./screeningMedia";
import { ScreeningMediaActions } from "./screeningMediaActions";
import { ScreeningMediaSources } from "./screeningMediaSources";



export const VisitMedia = ({ projectId }: Pick<VisitPropType, 'projectId'>) => {

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




