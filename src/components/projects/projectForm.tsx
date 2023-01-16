import { FormInstance } from "antd";
import UserControls from "../../userControls";


type PropType = {
    form: FormInstance,
    onSave: () => void,
    loading: boolean
}

export const ProjectForm = ({ form, onSave, loading }: PropType) => {

    const Form = UserControls.Form;

    return <UserControls.Skeleton loading={loading}>
        <Form form={form} labelCol={{ span: 6 }}>
            <Form.Item name={'id'} label={'Id'} >
                <UserControls.Input disabled />
            </Form.Item>
            <Form.Item name={'title'} label={'Title'}>
                <UserControls.Input />
            </Form.Item>

            {/*         <Form.Item name={'fiscalCode'} label={'Fiscal Code'}>
            <UserControls.Input style={{ textTransform: 'uppercase' }} />
        </Form.Item>

        <Form.Item name={'age'} label={'Age'}>
            <UserControls.InputNumber />
        </Form.Item>

        <Form.Item name={'dateOfBirth'} label={'Date of birth'}>
            <UserControls.DatePicker />
        </Form.Item>

        <Form.Item name={'bloodGroup'} label={'Blood group'}>
            <UserControls.Input />
        </Form.Item>

        <Form.Item name={'emergencyPhone'} label={'Emergency phone'}>
            <UserControls.Input placeholder="+39 " />
        </Form.Item>

        <Form.Item name={'notes'} label={'Notes'}>
            <UserControls.Input.TextArea rows={8} />
        </Form.Item>

        <Form.Item name={'gender'} label={'Gender'} initialValue={'unknown' as gendersKeysType}>
            <UserControls.Radio.Group>
                {gendersArr.map(gender => (
                    <UserControls.Radio key={gender.key} value={gender.key}>
                        {gender.value}
                    </UserControls.Radio>
                ))}
            </UserControls.Radio.Group>
        </Form.Item> */}
        </Form>
    </UserControls.Skeleton>
}