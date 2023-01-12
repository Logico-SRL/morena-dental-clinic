import { FormInstance } from "antd";
import { gendersArr, gendersKeysType } from "../../configurations/genders";
import UserControls from "../../userControls";


type PropType = {
    form: FormInstance
}
export const PatientForm = ({ form }: PropType) => {

    const Form = UserControls.Form;

    return <Form form={form} labelCol={{ span: 6 }}>
        <Form.Item name={'id'} label={'Id'} >
            <UserControls.Input disabled />
        </Form.Item>
        <Form.Item name={'firstName'} label={'First Name'}>
            <UserControls.Input />
        </Form.Item>

        <Form.Item name={'familyName'} label={'Family Name'}>
            <UserControls.Input />
        </Form.Item>

        <Form.Item name={'fiscalCode'} label={'Fiscal Code'}>
            <UserControls.Input style={{ textTransform: 'uppercase' }} />
        </Form.Item>

        <Form.Item name={'age'} label={'Age'}>
            <UserControls.InputNumber />
        </Form.Item>

        <Form.Item name={'gender'} label={'Gender'} initialValue={'unknown' as gendersKeysType}>
            <UserControls.Radio.Group>
                {gendersArr.map(gender => (
                    <UserControls.Radio key={gender.key} value={gender.key}>
                        {gender.value}
                    </UserControls.Radio>
                ))}
            </UserControls.Radio.Group>
        </Form.Item>
    </Form>
}