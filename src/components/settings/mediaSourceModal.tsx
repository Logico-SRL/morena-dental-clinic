import { useEffect } from "react";
import { useSettings } from "../../hooks/useSettings";
import UserControls from "../../userControls";

export const MediaSourceModal = ({ open, onClose }: { open: boolean, onClose: () => void }) => {

    const [form] = UserControls.Form.useForm()
    const { createMediaSource } = useSettings();
    const [notif] = UserControls.notification.useNotification();

    useEffect(() => {
        form.setFieldsValue({
            name: ''
        })
    }, [open])

    const onFinish = async () => {
        form.validateFields()
            .then(async (values: IMediaSource) => {
                await createMediaSource(values)
                await notif.success({
                    message: 'Done',
                    description: 'Media source added',
                    placement: 'bottomLeft'
                })
                onClose();
            })

    }
    return <UserControls.Modal open={open} onCancel={onClose} title={'New media source'} onOk={onFinish}>
        <UserControls.Form form={form}>
            <UserControls.Form.Item name={'name'} label={'Name'} required rules={[{ required: true, message: 'Source name required' }]}>
                <UserControls.Input />
            </UserControls.Form.Item>
        </UserControls.Form>
    </UserControls.Modal>
}