import { useEffect } from "react";
import UserControls from "../../userControls";
import { ProjectForm } from "./projectForm";


type PropType = {
    // open: boolean,
    // onCancel: () => void,
    project: IProject | undefined,
    saveProject: (proj: IProject) => void,
    loadingProject: boolean
}
export const EditProject = ({ project, saveProject, loadingProject }: PropType) => {

    const Form = UserControls.Form;
    const [form] = Form.useForm<IProject>();
    const [notif] = UserControls.notification.useNotification();

    useEffect(() => {
        project && form.setFieldsValue(project);
    }, [project])

    const onSave = () => {
        form.validateFields().
            then(async (proj) => {
                await saveProject(proj);
                notif.success({
                    message: 'Done',
                    description: 'Project correctly created',
                    placement: 'bottomLeft'

                })
                // onCancel();
            })
    }

    return <ProjectForm form={form} onSave={onSave} loading={loadingProject} />
}