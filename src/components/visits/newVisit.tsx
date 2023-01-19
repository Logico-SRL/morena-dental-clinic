import { useRouter } from "next/router";
import { useVisits } from "../../hooks/useVisits";
import UserControls from "../../userControls";
import { VisitForm } from "./visitForm";


type PropType = {
    projectId: string
}
export const NewVisit = ({ projectId }: PropType) => {

    const Form = UserControls.Form;
    const { createVisit } = useVisits();
    const [form] = Form.useForm<IVisit>();
    const [notif] = UserControls.notification.useNotification();
    const { replace } = useRouter();


    const onSave = async (visit: IVisit) => {

        // visit.project = project;
        await createVisit(projectId, visit);
        await notif.success({
            message: 'Done',
            description: 'Visit correctly created',
            placement: 'bottomLeft'
        })
        await replace(`/projects/${projectId}`)
    }

    return <VisitForm form={form} onSave={onSave} loading={false} submitText={'Create'} />
}