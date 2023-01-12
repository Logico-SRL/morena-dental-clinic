import { SplittedPage } from "../../components/layout/splittedPage";
import { Patients } from "../../components/patients/patients";
import { PatientsFilter } from "../../components/patients/patientsFilter";
import { usePatients } from "../../hooks/usePatients";
import UserControls from "../../userControls";
import { AntdIcons } from "../../userControls/icons";


const Title = () => {
    return <UserControls.Space align="center">
        <AntdIcons.UserOutlined style={{ fontSize: 30 }} />
        <UserControls.Typography.Title style={{ margin: 0 }}>
            PATIENTS
        </UserControls.Typography.Title>
    </UserControls.Space>
}

const FilterTitle = () => {
    return <UserControls.Space>
        <UserControls.Typography.Title level={3} style={{ margin: 0 }}>
            FILTER
        </UserControls.Typography.Title>
    </UserControls.Space>
}

const PatientsPage: PageComponent = () => {

    const { patients, loadingPatients, getFilteredPatients } = usePatients();

    return (<SplittedPage
        LeftTitle={<Title />}
        RightTitle={<FilterTitle />}
        Left={<Patients patients={patients} loading={loadingPatients} />}
        Right={<PatientsFilter submitSearch={getFilteredPatients} />}
    />)
}

export default PatientsPage;