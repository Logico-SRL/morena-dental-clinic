import { useRouter } from "next/router";
import { useEffect } from "react";
import { useMacroProjects } from "../../hooks/useMacroProjects";
import { defaultMacroProject } from "../../services/defaultValues/defaultMacroProject";
import UserControls from "../../userControls";
import { MacroProjectForm } from "./macroProjectForm";


type PropType = {
    // open: boolean,
    // onCancel: () => void
}
export const NewMacroProject = ({ }: PropType) => {

    const Form = UserControls.Form;
    const { createMacroProject, creatingMacroProject } = useMacroProjects()

    const [form] = Form.useForm<IMacroProject>();
    const [notif] = UserControls.notification.useNotification();
    const { push } = useRouter();

    useEffect(() => {
        form.setFieldsValue(defaultMacroProject());
    }, [])

    const onSave = async (proj: IMacroProject) => {
        const pr = await createMacroProject(proj);
        if (pr) {

            await notif.success({
                message: 'Done',
                description: 'Project correctly created',
                placement: 'bottomLeft'

            })
            await push(`/macroprojects/${pr.id}`)
        }
    }

    return <MacroProjectForm form={form} onSave={onSave} loading={creatingMacroProject} submitText={'Create'} onBack={() => { }} />
}