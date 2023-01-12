import { useEffect } from "react";
import { usePatients } from "../../hooks/usePatients";
import UserControls from "../../userControls";
import { PatientForm } from "./patientForm";


type PropType = {
    open: boolean,
    onCancel: () => void,
    patient: IPatient | undefined
}
export const EditPatientModal = ({ open, onCancel, patient }: PropType) => {

    const Form = UserControls.Form;
    const { savePatient } = usePatients()

    const [form] = Form.useForm<IPatient>();
    const [notif] = UserControls.notification.useNotification();

    useEffect(() => {
        patient && form.setFieldsValue(patient);
    }, [patient])


    const onOk = () => {
        form.validateFields().
            then(async (pat) => {
                await savePatient(pat);
                notif.success({
                    message: 'Done',
                    description: 'Patient correctly saved',
                    placement: 'bottomLeft'

                })
                onCancel();
            })
    }

    return <UserControls.Modal
        open={open}
        onCancel={onCancel}
        title={'Patient manual edit'}
        okText={'Save'}
        onOk={onOk}
    >
        <PatientForm form={form} />

    </UserControls.Modal>
}