import { useEffect } from "react";
import { usePatients } from "../../hooks/usePatients";
import { defaultPatient } from "../../services/defaultValues";
import UserControls from "../../userControls";
import { PatientForm } from "./patientForm";


type PropType = {
    open: boolean,
    onCancel: () => void
}
export const NewPatientModal = ({ open, onCancel }: PropType) => {

    const Form = UserControls.Form;
    const { createPatient } = usePatients()

    const [form] = Form.useForm<IPatient>();
    const [notif] = UserControls.notification.useNotification();

    useEffect(() => {
        if (open) {
            form.setFieldsValue(defaultPatient())
        }
    }, [open])

    const onOk = () => {
        form.validateFields().
            then(async (pat) => {
                await createPatient(pat);
                notif.success({
                    message: 'Done',
                    description: 'Patient correctly created',
                    placement: 'bottomLeft'

                })
                onCancel();
            })
    }

    return <UserControls.Modal
        open={open}
        onCancel={onCancel}
        title={'New patient manual addition'}
        okText={'Save'}
        onOk={onOk}
    >
        <PatientForm form={form} />

    </UserControls.Modal>
}