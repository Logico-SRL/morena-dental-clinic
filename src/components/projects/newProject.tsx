import { useProjects } from "../../hooks/useProjects";
import UserControls from "../../userControls";
import { ProjectForm } from "./projectForm";


type PropType = {
    // open: boolean,
    // onCancel: () => void
}
export const NewProject = ({ }: PropType) => {

    const Form = UserControls.Form;
    const { createProject } = useProjects()

    const [form] = Form.useForm<IProject>();
    const [notif] = UserControls.notification.useNotification();

    const onSave = () => {
        form.validateFields().
            then(async (proj) => {
                await createProject(proj);
                notif.success({
                    message: 'Done',
                    description: 'Project correctly created',
                    placement: 'bottomLeft'

                })
                // onCancel();
            })
    }

    return <ProjectForm form={form} onSave={onSave} loading={false} />
}