import { useRouter } from "next/router";
import { useAppointments } from "../../hooks/useAppointments";
import UserControls from "../../userControls";
import { formatUtils } from "../../utils/formatUtils";
import { TouchableRow } from "../userControls/touchableRow";

export const Dashboard = () => {

    const { appointments, loadingAppointments } = useAppointments();
    const { push } = useRouter();

    const onClick = (item: IAppointment) => {
        if (item.patient) {
            push(`/patients/${item.patient.id}`)
        }
        // else {
        //     console.warn(`appointment ${item.id} does not contain a patient`)
        // }
    }

    return <UserControls.Skeleton loading={loadingAppointments}>
        <UserControls.List
            dataSource={appointments}
            header={<Header />}
            renderItem={renderItem({ onClick })}
        />

    </UserControls.Skeleton>
}

const Header = () => {
    return <UserControls.Row>
        <UserControls.Col xs={6}>
            <UserControls.Typography.Title level={5}>
                Appointment Date
            </UserControls.Typography.Title>
        </UserControls.Col>
        <UserControls.Col xs={6}>
            <UserControls.Typography.Title level={5}>
                Patient
            </UserControls.Typography.Title>
        </UserControls.Col>
        <UserControls.Col xs={6}>
            <UserControls.Typography.Title level={5}>
                Type
            </UserControls.Typography.Title>
        </UserControls.Col>
        <UserControls.Col xs={6}>
            <UserControls.Typography.Title level={5}>
                Category
            </UserControls.Typography.Title>
        </UserControls.Col>
    </UserControls.Row>
}
const renderItem = ({ onClick }: { onClick: (item: IAppointment) => void }) => (item: IAppointment) => {
    return <TouchableRow onClick={() => onClick(item)}>
        <UserControls.Col xs={6}>
            <UserControls.Typography>
                {formatUtils.formatDateTime(item.dataOra)}
            </UserControls.Typography>
        </UserControls.Col>
        <UserControls.Col xs={6}>
            <UserControls.Typography>
                {item.patient ? `${item.patient.firstName} ${item.patient.familyName}` : ' - '}
            </UserControls.Typography>
        </UserControls.Col>
        <UserControls.Col xs={6}>
            <UserControls.Typography>
                {item.tipoImpegno.value}
            </UserControls.Typography>
        </UserControls.Col>
        <UserControls.Col xs={6}>
            <UserControls.Typography>
                {item.categoria.value}
            </UserControls.Typography>
        </UserControls.Col>
    </TouchableRow>
}