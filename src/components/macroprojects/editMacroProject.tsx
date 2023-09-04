import { useRouter } from "next/router";
import { useEffect } from "react";
import UserControls from "../../userControls";
import { MacroProjectForm } from "./macroProjectForm";
import { MacroProjectWithProjects } from "./macroProjectWithProjects";
// import { ProjectWithVisits } from "./projectWithVisits";


type PropType = {
    // open: boolean,
    // onCancel: () => void,
    project: IMacroProject | undefined,
    saveProject: (proj: IMacroProject) => void,
    loadingProject: boolean,
    inEdit: boolean,
    setInEdit: Dispatch<SetStateAction<boolean>>
}

export const EditMacroProject = ({ project, saveProject, loadingProject, inEdit, setInEdit }: PropType) => {

    const Form = UserControls.Form;
    const [form] = Form.useForm<IMacroProject>();
    const [notif] = UserControls.notification.useNotification();
    const { push } = useRouter();

    // const onEdit = () => {
    //     setInEdit(true)
    // }

    useEffect(() => {
        project && form.setFieldsValue(project);
    }, [project])

    const onSave = async (proj: IMacroProject) => {
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
        <MacroProjectForm form={form} onSave={onSave} loading={loadingProject} submitText={'Save'} onBack={() => setInEdit(false)} /> :
        <MacroProjectWithProjects macroProject={project} />
}