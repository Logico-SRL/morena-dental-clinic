import { useRouter } from "next/router";
import { SplittedPage } from "../../../components/layout/splittedPage";
import { Patient } from "../../../components/patients/patient";
import UserControls from "../../../userControls";
import { AntdIcons } from "../../../userControls/icons";


const PatientsPage: PageComponent = ({ }) => {

    const { query } = useRouter()
    const { patientId } = query as { patientId: string }
    const LeftTitle = () => {
        return <UserControls.Space>
            <AntdIcons.UserOutlined />
            <UserControls.Typography.Title level={3}>
                Patient
            </UserControls.Typography.Title>
        </UserControls.Space>
    }
    const RightTitle = () => {
        return <UserControls.Space>
            <UserControls.Typography.Title level={4}>
                Projects
            </UserControls.Typography.Title>
        </UserControls.Space>
    }

    return (<SplittedPage
        LeftTitle={<LeftTitle />}
        RightTitle={<RightTitle />}
        Left={<Patient patientId={patientId} />} />)
}

export default PatientsPage;