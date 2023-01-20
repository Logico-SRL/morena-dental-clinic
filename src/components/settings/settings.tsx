import { useState } from "react";
import { useSettings } from "../../hooks/useSettings";
import UserControls from "../../userControls";
import { AntdIcons } from "../../userControls/icons";
import { SectionHeader } from "../userControls/sectionHeader";
import { MediaSourceModal } from "./mediaSourceModal";


export const Settings = () => {

    const { settings } = useSettings();
    const [showMediaSourceModal, setShowMediaSourceModal] = useState(false)


    return <UserControls.Row>
        <UserControls.Col xs={24}>
            <SectionHeader title="MediaSources" links={<UserControls.Button icon={<AntdIcons.PlusOutlined />} onClick={() => setShowMediaSourceModal(true)}>
                Add source
            </UserControls.Button>} />
        </UserControls.Col>
        <UserControls.Col xs={24}>

            <UserControls.List
                dataSource={settings.mediaSources}
                renderItem={MediaSourceItem}
            />
        </UserControls.Col>
        <MediaSourceModal open={showMediaSourceModal} onClose={() => setShowMediaSourceModal(false)} />
    </UserControls.Row>
}

const MediaSourceItem = (item: IMediaSource) => <UserControls.List.Item className="touchable" key={item.id}>
    {item.name}
</UserControls.List.Item>