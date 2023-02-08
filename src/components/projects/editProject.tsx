import { useRouter } from "next/router";
import { useEffect } from "react";
import UserControls from "../../userControls";
import { ProjectForm } from "./projectForm";
import { ProjectWithVisits } from "./projectWithVisits";


type PropType = {
    // open: boolean,
    // onCancel: () => void,
    project: IProject | undefined,
    saveProject: (proj: IProject) => void,
    loadingProject: boolean,
    inEdit: boolean,
    setInEdit: Dispatch<SetStateAction<boolean>>
}

export const EditProject = ({ project, saveProject, loadingProject, inEdit, setInEdit }: PropType) => {

    const Form = UserControls.Form;
    const [form] = Form.useForm<IProject>();
    const [notif] = UserControls.notification.useNotification();
    const { push } = useRouter();

    // const onEdit = () => {
    //     setInEdit(true)
    // }

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
        <ProjectWithVisits project={project} />
}