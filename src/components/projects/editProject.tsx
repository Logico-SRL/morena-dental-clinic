import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import UserControls from "../../userControls";
import { ProjectForm } from "./projectForm";
import { ProjectWithVisits } from "./projectWithVisits";


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
    const { push } = useRouter();
    const [inEdit, setInEdit] = useState(false);

    const onEdit = () => {
        setInEdit(true)
    }

    useEffect(() => {
        project && form.setFieldsValue(project);
    }, [project])

    const onSave = async (proj: IProject) => {
        await saveProject(proj);
        await notif.success({
            message: 'Done',
            description: 'Project correctly created',
            placement: 'bottomLeft'
        })

        setInEdit(false);
        // await push(`/projects`)
    }

    return inEdit ?
        <ProjectForm form={form} onSave={onSave} loading={loadingProject} submitText={'Save'} onBack={() => setInEdit(false)} /> :
        <ProjectWithVisits project={project} onEdit={onEdit} />
}