import { useRouter } from "next/router";
import { useEffect } from "react";
import { useProject } from "../../hooks/useProject";
import { useVisit } from "../../hooks/useVisit";
import UserControls from "../../userControls";
import { VisitForm } from "./visitForm";


type PropType = {
    projectId: string,
    visit: IVisit | undefined
}
export const EditVisit = ({ projectId, visit }: PropType) => {

    const Form = UserControls.Form;
    const { saveVisit } = useVisit(projectId, visit?.id || '');
    const [form] = Form.useForm<IVisit>();
    const [notif] = UserControls.notification.useNotification();
    const { replace } = useRouter();

    const { setVisit } = useProject(projectId)

    useEffect(() => {
        if (visit)
            form.setFieldsValue(visit)
    }, [visit])


    const onSave = async (visit: IVisit) => {

        // visit.project = project;
        const vis = await saveVisit(projectId, visit);
        setVisit(vis);
        await notif.success({
            message: 'Done',
            description: 'Visit correctly created',
            placement: 'bottomLeft'
        })
        await replace(`/projects/${projectId}`)
    }

    return <VisitForm form={form} onSave={onSave} loading={false} submitText={'Save'} />
}