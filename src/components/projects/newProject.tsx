import { useRouter } from "next/router";
import { useEffect } from "react";
import { useProjects } from "../../hooks/useProjects";
import { defaultProject } from "../../services/defaultValues";
import UserControls from "../../userControls";
import { ProjectForm } from "./projectForm";


type PropType = {
    // open: boolean,
    // onCancel: () => void
}
export const NewProject = ({ }: PropType) => {

    const Form = UserControls.Form;
    const { createProject, creatingProjects } = useProjects()

    const [form] = Form.useForm<IProject>();
    const [notif] = UserControls.notification.useNotification();
    const { push } = useRouter();

    useEffect(() => {
        form.setFieldsValue(defaultProject());
    }, [])

    const onSave = async (proj: IProject) => {
        await createProject(proj);
        await notif.success({
            message: 'Done',
            description: 'Project correctly created',
            placement: 'bottomLeft'

        })
        await push(`/projects`)
    }

    return <ProjectForm form={form} onSave={onSave} loading={creatingProjects} submitText={'Create'} onBack={() => { }} />
}