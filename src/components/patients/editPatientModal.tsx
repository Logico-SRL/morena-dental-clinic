import { useEffect } from "react";
import { usePatients } from "../../hooks/usePatients";
import { useWebLogger } from "../../hooks/useWebLogger";
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
    const logger = useWebLogger();

    useEffect(() => {
        patient && form.setFieldsValue(patient);
    }, [patient])


    const onOk = () => {

        form.validateFields().
            then(async (patient) => {
                logger.info(`saving patient ${patient.id}`, { test: '1234', patient });
                await savePatient(patient);
                notif.success, ({
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