import { FormInstance } from "antd";
import { useSettings } from "../../hooks/useSettings";
import UserControls from "../../userControls";

type PropTpe = {
    open: boolean,
    onClose: () => void,
    form: FormInstance<IMediaSource>
}
export const MediaSourceModal = ({ open, onClose, form }: PropTpe) => {


    const { createMediaSource, saveMediaSource } = useSettings();
    const [notif] = UserControls.notification.useNotification();

    // useEffect(() => {
    //     form.setFieldsValue({
    //         name: ''
    //     })
    // }, [open])

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
    return <UserControls.Modal open={open} onCancel={onClose} title={'New media source'} onOk={onFinish}>
        <UserControls.Form form={form} labelCol={{ xs: 6 }}>
            <UserControls.Form.Item name={'id'} hidden />
            <UserControls.Form.Item name={'name'} label={'Name'} required rules={[{ required: true, message: 'Source name required' }]}>
                <UserControls.Input />
            </UserControls.Form.Item>

            <UserControls.Form.Item name={'basePath'} label={'Base path'}>
                <UserControls.Input />
            </UserControls.Form.Item>

        </UserControls.Form>
    </UserControls.Modal>
}