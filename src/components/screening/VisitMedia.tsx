import { useEffect, useState } from "react";
import { useProject } from "../../hooks/useProject";
import { useSettings } from "../../hooks/useSettings";
import { useVisit } from "../../hooks/useVisit";
import UserControls from "../../userControls";
import { ImportMediaContextProvider } from "./import/importMediaContextProvider";
import { ScreeningMedia } from "./screeningMedia";
import { ScreeningMediaActions } from "./screeningMediaActions";
import { ScreeningMediaSources } from "./screeningMediaSources";
import { UploadModalContextProvider } from "./upload/uploadModalContextProvider";



export const VisitMedia = ({ projectId }: Pick<VisitPropType, 'projectId'>) => {

    const { selectedVisit, loadingProject, setSelectedVisit } = useProject(projectId)
    const { visit, loadingVisit } = useVisit(projectId, selectedVisit?.id || '')
    const { settings } = useSettings();
    const [selectedMediaSource, setSelectedMediaSource] = useState<IMediaSource>()
    const [isDeleting, setIsDeleting] = useState<boolean>(false)

    useEffect(() => {
        if (settings.mediaSources.length > 0 && (selectedMediaSource?.id != settings.mediaSources[0].id)) {
            console.info('settings set')
            setSelectedMediaSource(settings.mediaSources[0])
        }
    }, [settings])


    const onSourceChange = (mediaSourceId: string | number) => {
        const found = settings.mediaSources.find(m => m.id === mediaSourceId);
        setSelectedMediaSource(found)
    }

    return <UserControls.Skeleton loading={loadingVisit}>
        <UploadModalContextProvider>
            <ImportMediaContextProvider>
                <ScreeningMediaSources sources={settings.mediaSources} selectedVisit={visit} onSourceChange={onSourceChange}
                    segmentValue={selectedMediaSource?.id || ''} />
                <ScreeningMediaActions selectedVisit={visit} selectedMediaSource={selectedMediaSource} projectId={projectId}
                    isDeleting={isDeleting} setIsDeleting={setIsDeleting} />
                <ScreeningMedia sources={settings.mediaSources} selectedVisit={visit} selectedMediaSource={selectedMediaSource}
                    isDeleting={isDeleting} projectId={projectId} />
            </ImportMediaContextProvider>
        </UploadModalContextProvider>
    </UserControls.Skeleton>
}




