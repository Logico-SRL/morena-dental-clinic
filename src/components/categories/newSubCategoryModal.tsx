import { FormInstance } from "antd";
import { useCategories } from "../../hooks/useCategories";
import UserControls from "../../userControls";
import { CategoryForm } from "./categoryForm";


type PropType = {
    open: boolean,
    onCancel: () => void,
    form: FormInstance<IProjectCategory>
    parentCategory: IProjectCategory | undefined,
}
export const NewSubCategoryModal = ({ open, onCancel, form, parentCategory }: PropType) => {

    const { createSubCategory } = useCategories()
    const Form = UserControls.Form;
    const [notif] = UserControls.notification.useNotification();

    const onOk = () => {
        if (!parentCategory) {
            return notif.warning({
                message: 'Warning',
                description: 'No parent category selected',
                placement: 'bottomLeft'

            })
        }

        form.validateFields().
            then(async (cat) => {
                cat.parentCategory = parentCategory;
                await createSubCategory(cat);
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