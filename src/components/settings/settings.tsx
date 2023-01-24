import { useState } from "react";
import { useSettings } from "../../hooks/useSettings";
import { defaultMediaSource } from "../../services/defaultValues/defaultMediaSource";
import UserControls from "../../userControls";
import { AntdIcons } from "../../userControls/icons";
import { SectionHeader } from "../userControls/sectionHeader";
import { MediaSourceModal } from "./mediaSourceModal";


export const Settings = () => {

    const { settings } = useSettings();
    const [showMediaSourceModal, setShowMediaSourceModal] = useState(false)
    const [form] = UserControls.Form.useForm<IMediaSource>()

    const onAddSourceClick = () => {
        form.setFieldsValue(defaultMediaSource());
        setShowMediaSourceModal(true)
    }

    const onClick = (item: IMediaSource) => {
        form.setFieldsValue(item);
        setShowMediaSourceModal(true)
    }

    return <UserControls.Row>
        <UserControls.Col xs={24}>
            <SectionHeader title="MediaSources" links={<UserControls.Button icon={<AntdIcons.PlusOutlined />} onClick={onAddSourceClick}>
                Add source
            </UserControls.Button>} />
        </UserControls.Col>
        <UserControls.Col xs={24}>

            <UserControls.List
                dataSource={settings.mediaSources}
                renderItem={MediaSourceItem({ onClick })}
            />
        </UserControls.Col>
        <MediaSourceModal open={showMediaSourceModal} onClose={() => setShowMediaSourceModal(false)} form={form} />
    </UserControls.Row>
}

const MediaSourceItem = ({ onClick }: { onClick: (item: IMediaSource) => void }) => (item: IMediaSource) => (
    <UserControls.List.Item className="touchable" key={item.id} onClick={() => onClick(item)}>
        <UserControls.Col xs={24}>
            <UserControls.Row justify={'center'} align={'middle'}>
                <UserControls.Col xs={6}>
                    {item.name}
                </UserControls.Col>
                <UserControls.Col xs={6}>
                    {item.basePath || ' - '}
                </UserControls.Col>
                <UserControls.Col xs={4}>
                    {item.type}
                </UserControls.Col>
                <UserControls.Col xs={4}>
                    <UserControls.Checkbox checked={item.visible} disabled />
                </UserControls.Col>
                <UserControls.Col xs={4}>
                    <UserControls.Image src={item.defaultThumbnailB64 || ''} preview={false} />
                </UserControls.Col>
            </UserControls.Row>
        </UserControls.Col>
    </UserControls.List.Item>
)