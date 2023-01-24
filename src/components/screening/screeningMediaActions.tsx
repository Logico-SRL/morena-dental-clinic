import { UploadFile, UploadProps } from "antd";
import { UploadChangeParam } from "antd/es/upload";
import { useState } from "react";
import UserControls from "../../userControls";
import { AntdIcons } from "../../userControls/icons";
import classnames from './screening.module.scss';

export const ScreeningMediaActions = ({ selectedMediaSource, selectedVisit, projectId, setSelectedVisit }: Pick<VisitPropType, 'selectedMediaSource' | 'selectedVisit' | 'projectId' | 'setSelectedVisit'>) => {

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
                    setSelectedVisit({ ...selectedVisit, media: [...(selectedVisit.media || []), response] })
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