import { FormInstance } from "antd";
import UserControls from "../../userControls";


type PropType = {
    form: FormInstance
}
export const CategoryForm = ({ form }: PropType) => {

    const Form = UserControls.Form;

    return <Form form={form} labelCol={{ span: 6 }}>
        <Form.Item name={'id'} label={'Id'} >
            <UserControls.Input disabled />
        </Form.Item>
        <Form.Item name={'name'} label={'Name'}>
            <UserControls.Input />
        </Form.Item>
    </Form>
}