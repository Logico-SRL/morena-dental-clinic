import { useRouter } from "next/router";
import { useEffect } from "react";
import { useProject } from "../../hooks/useProject";
import { useVisits } from "../../hooks/useVisits";
import { defaultVisit } from "../../services/defaultValues";
import UserControls from "../../userControls";
import { VisitForm } from "./visitForm";


type PropType = {
    projectId: string
}
export const NewVisit = ({ projectId }: PropType) => {

    const Form = UserControls.Form;
    const { createVisit } = useVisits();
    const { setVisit } = useProject(projectId);

    const [form] = Form.useForm<IVisit>();
    const [notif] = UserControls.notification.useNotification();
    const { replace } = useRouter();

    useEffect(() => {
        form.setFieldsValue(defaultVisit());
    }, [projectId])

    const onSave = async (visit: IVisit) => {

        // visit.project = project;
        const vis = await createVisit(projectId, visit);
        setVisit(vis);
        await notif.success({
            message: 'Done',
            description: 'Visit correctly created',
            placement: 'bottomLeft'
        })
        await replace(`/projects/${projectId}`)
    }

    return <VisitForm form={form} onSave={onSave} loading={false} submitText={'Create'} />
}