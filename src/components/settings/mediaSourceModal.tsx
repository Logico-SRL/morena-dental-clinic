import { FormInstance } from "antd";
import { useSettings } from "../../hooks/useSettings";
import UserControls from "../../userControls";

type PropTpe = {
    open: boolean,
    onClose: () => void,
    form: FormInstance<IMediaSource>
}

const mediaTypesOptions: { value: mediaTypes, label: string }[] = [
    { value: 'image', label: 'Image' },
    { value: 'video', label: 'Video' },
    { value: 'doc', label: 'Document' },
]

export const MediaSourceModal = ({ open, onClose, form }: PropTpe) => {


    const { createMediaSource, saveMediaSource } = useSettings();
    const [notif] = UserControls.notification.useNotification();

    const onFinish = async () => {
        form.validateFields()
            .then(async (values: IMediaSource) => {

                await values.id ? saveMediaSource(values) : createMediaSource(values)
                await notif.success({
                    message: 'Done',
                    description: 'Media source added',
                    placement: 'bottomLeft'
                })
                onClose();
            })
    }

    const { useWatch } = UserControls.Form;
    const id = useWatch('id', form);



    const onMediaTypeSelect = (value: string) => {
        form.setFieldValue('type', value);
    }


    return <UserControls.Modal open={open} onCancel={onClose} title={!id ? 'New media source' : `Editing ${id}`} onOk={onFinish}>
        <UserControls.Form form={form} labelCol={{ xs: 6 }}>
            <UserControls.Form.Item name={'id'} hidden />
            <UserControls.Form.Item name={'name'} label={'Name'} required rules={[{ required: true, message: 'Source name required' }]}>
                <UserControls.Input />
            </UserControls.Form.Item>

            <UserControls.Form.Item name={'basePath'} label={'Base path'}>
                <UserControls.Input />
            </UserControls.Form.Item>

            <UserControls.Form.Item name={'defaultThumbnailB64'} label={'Default Thumbnail'} valuePropName={'src'}>
                <UserControls.Image style={{ maxWidth: 60, marginLeft: 20 }} />
            </UserControls.Form.Item>

            <UserControls.Form.Item name={'visible'} label={'Visible'} valuePropName="checked">
                <UserControls.Checkbox />
            </UserControls.Form.Item>

            <UserControls.Form.Item name={'type'} label={'Type'}>
                <UserControls.Select
                    options={mediaTypesOptions}
                    onSelect={onMediaTypeSelect}
                />
            </UserControls.Form.Item>



        </UserControls.Form>
    </UserControls.Modal>
}