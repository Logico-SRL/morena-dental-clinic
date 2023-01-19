import { FormInstance } from "antd";
import { visitTypesArr } from "../../configurations/visitTypes";
import UserControls from "../../userControls";


type PropType = {
    form: FormInstance<IVisit>,
    onSave: (proj: IVisit) => void,
    loading: boolean,
    submitText: string,
}



export const VisitForm = ({ form, onSave, loading, submitText }: PropType) => {

    const Form = UserControls.Form;

    const onFinish = (values: IVisit) => {
        onSave(values);
    };


    return <UserControls.Skeleton loading={loading}>
        <Form form={form} labelCol={{ span: 6 }} onFinish={onFinish}>
            <Form.Item name={'id'} label={'Id'} required>
                <UserControls.Input disabled />
            </Form.Item>
            <Form.Item name={'title'} label={'Title'} required rules={[{ required: true }]}>
                <UserControls.Input />
            </Form.Item>
            <Form.Item name={'visitDate'} label={'Visit date'}>
                <UserControls.DatePicker showTime showSecond={false} minuteStep={15} />
            </Form.Item>
            <Form.Item name={'diagnosis'} label={'Diagnosis'}>
                <UserControls.Input.TextArea rows={5} />
            </Form.Item>
            <Form.Item name={'treatment'} label={'Treatment'}>
                <UserControls.Input.TextArea rows={5} />
            </Form.Item>
            <Form.Item name={'followUp'} label={'Follow up'}>
                <UserControls.Input.TextArea rows={5} />
            </Form.Item>
            <Form.Item name={'type'} label={'Type'} initialValue={'visit'}>
                <UserControls.Radio.Group>
                    {visitTypesArr.map(type => (
                        <UserControls.Radio key={type.key} value={type.key}>
                            {type.value}
                        </UserControls.Radio>
                    ))}
                </UserControls.Radio.Group>
            </Form.Item>
            <Form.Item style={{ textAlign: 'center' }}>
                <UserControls.Button type="primary" htmlType="submit">{submitText}</UserControls.Button>
            </Form.Item>

        </Form>

    </UserControls.Skeleton>
}