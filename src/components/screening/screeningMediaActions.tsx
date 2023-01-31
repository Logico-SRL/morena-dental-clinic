import UserControls from "../../userControls";
import { AntdIcons } from "../../userControls/icons";
import classnames from './screening.module.scss';
import { useUploadMedia } from "./useUploadMedia";

type PropType = Pick<VisitPropType, 'selectedMediaSource' | 'selectedVisit' | 'projectId' | 'isDeleting' | 'setIsDeleting'>

export const ScreeningMediaActions = ({ selectedMediaSource, selectedVisit, projectId, isDeleting, setIsDeleting }: PropType) => {

    const { uploadProps, importFiles } = useUploadMedia(projectId, selectedMediaSource)

    const onDeleteClick = () => {
        setIsDeleting(!isDeleting);
    }

    return <UserControls.Col xs={24} className={classnames.actions} >
        <UserControls.Upload {...uploadProps} >
            <UserControls.Button disabled={!selectedVisit || !selectedMediaSource || !selectedMediaSource.basePath || isDeleting} icon={<AntdIcons.PlusOutlined />}>
                Upload
            </UserControls.Button>
        </UserControls.Upload>
        <UserControls.Button onClick={importFiles} disabled={!selectedVisit || !selectedMediaSource || !selectedMediaSource.baseSearch || isDeleting} icon={<AntdIcons.ImportOutlined />}>
            Import
        </UserControls.Button>
        <UserControls.Button disabled={!selectedVisit || !selectedMediaSource} icon={<AntdIcons.DeleteOutlined />} onClick={onDeleteClick}>
            {isDeleting ? 'Cancel delete' : 'Delete'}
        </UserControls.Button>
        <UserControls.Button disabled={!selectedVisit || !selectedMediaSource || isDeleting} icon={<AntdIcons.UploadOutlined />} onClick={() => alert('TODO')}>
            Export
        </UserControls.Button>

    </UserControls.Col>
}