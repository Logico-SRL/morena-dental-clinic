import { useEffect, useState } from "react";
import { SplittedPage } from "../../components/layout/splittedPage";
import { NewPatientModal } from "../../components/patients/newPatientModal";
import { Patients } from "../../components/patients/patients";
import { PatientsFilter } from "../../components/patients/patientsFilter";
import { usePatients } from "../../hooks/usePatients";
import UserControls from "../../userControls";
import { AntdIcons } from "../../userControls/icons";


const Title = ({ onAddClick }: { onAddClick: () => void }) => {
    return <>
        <UserControls.Space align="center">
            <AntdIcons.UserOutlined style={{ fontSize: 30 }} />
            <UserControls.Typography.Title style={{ margin: 0 }}>
                PATIENTS
            </UserControls.Typography.Title>
        </UserControls.Space>
        <UserControls.Button onClick={onAddClick} size="large" style={{ marginLeft: 'auto' }} icon={<AntdIcons.UserAddOutlined />} />
    </>
}

const FilterTitle = () => {
    return <UserControls.Space>
        <UserControls.Typography.Title level={3} style={{ margin: 0 }}>
            FILTER
        </UserControls.Typography.Title>
    </UserControls.Space>
}

const PatientsPage: PageComponent = () => {

    const { patients, loadingPatients, fetchFilteredPatients, fetchAllPatients } = usePatients();

    const [showNewPatientModal, setShowNewPatientModal] = useState(false);

    useEffect(() => {
        const c = fetchAllPatients();

        return () => {
            c.abort();
        }

    }, [])

    const onAddClick = () => {
        setShowNewPatientModal(true);
    }

    const onModalCancel = () => {
        setShowNewPatientModal(false);
    }

    return (<>
        <SplittedPage
            LeftTitle={<Title onAddClick={onAddClick} />}
            RightTitle={<FilterTitle />}
            Left={<Patients patients={patients} loading={loadingPatients} />}
            Right={<PatientsFilter submitSearch={fetchFilteredPatients} />}
        />
        <NewPatientModal open={showNewPatientModal} onCancel={onModalCancel} />
    </>)
}

export default PatientsPage;