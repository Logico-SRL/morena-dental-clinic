import { useRouter } from "next/router";
import { useEffect } from "react";
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

    useEffect(() => {
        if (visit)
            form.setFieldsValue(visit)
    }, [visit])


    const onSave = async (visit: IVisit) => {

        // visit.project = project;
        await saveVisit(projectId, visit);
        await notif.success({
            message: 'Done',
            description: 'Visit correctly created',
            placement: 'bottomLeft'
        })
        await replace(`/projects/${projectId}`)
    }

    return <VisitForm form={form} onSave={onSave} loading={false} submitText={'Save'} />
}