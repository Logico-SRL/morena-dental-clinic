import { FormInstance } from "antd";
import { useCategories } from "../../hooks/useCategories";
import UserControls from "../../userControls";
import { CategoryForm } from "./categoryForm";


type PropType = {
    open: boolean,
    onCancel: () => void,
    form: FormInstance<IProjectCategory>
}
export const NewCategoryModal = ({ open, onCancel, form }: PropType) => {

    const { createCategory } = useCategories()
    const Form = UserControls.Form;
    const [notif] = UserControls.notification.useNotification();

    const onOk = () => {
        form.validateFields().
            then(async (cat) => {
                await createCategory(cat);
                notif.success({
                    message: 'Done',
                    description: 'Category correctly created',
                    placement: 'bottomLeft'

                })
                onCancel();
            })
    }

    return <UserControls.Modal
        open={open}
        onCancel={onCancel}
        title={'New category'}
        okText={'Create'}
        onOk={onOk}
    >
        <CategoryForm form={form} />

    </UserControls.Modal>
}