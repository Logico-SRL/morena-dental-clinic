import { useRouter } from "next/router";
import { useAppointments } from "../../hooks/useAppointments";
import UserControls from "../../userControls";
import { formatUtils } from "../../utils/formatUtils";

export const Dashboard = () => {

    const { appointments, loadingAppointments } = useAppointments();
    const { push } = useRouter();

    const onClick = (item: IAppointment) => {
        if (item.patient) {
            push(`/patients/${item.patient.id}`)
        } else {
            console.warn(`appointment ${item.id} does not contain a patient`)
        }
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
        <UserControls.Col xs={8}>
            <UserControls.Typography.Title level={5}>
                Date
            </UserControls.Typography.Title>
        </UserControls.Col>
        <UserControls.Col xs={8}>
            <UserControls.Typography.Title level={5}>
                Patient
            </UserControls.Typography.Title>
        </UserControls.Col>
    </UserControls.Row>
}
const renderItem = ({ onClick }: { onClick: (item: IAppointment) => void }) => (item: IAppointment) => {
    return <UserControls.Row>
        <UserControls.Col xs={8}>
            <UserControls.Typography>
                {formatUtils.formatDate(item.dataOra)}
            </UserControls.Typography>
        </UserControls.Col>
        <UserControls.Col xs={8}>
            <UserControls.Typography>
                {item.patient ? `${item.patient.firstName} ${item.patient.familyName}` : ' - '}
            </UserControls.Typography>
        </UserControls.Col>
    </UserControls.Row>
}