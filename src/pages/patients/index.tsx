import { ChangeEventHandler, useEffect, useRef, useState } from "react";
import { SplittedPage } from "../../components/layout/splittedPage";
import { EditPatientModal } from "../../components/patients/editPatientModal";
import { NewPatientModal } from "../../components/patients/newPatientModal";
import { Patients } from "../../components/patients/patients";
import { PatientsFilter } from "../../components/patients/patientsFilter";
import { usePatients } from "../../hooks/usePatients";
import UserControls from "../../userControls";
import { AntdIcons } from "../../userControls/icons";
import { useDebouncedCallback } from "../../utils/useDebouncedCallback";


const Title = ({ onAddClick }: { onAddClick: () => void }) => {
    return <>
        <UserControls.Space align="center">
            <AntdIcons.UserOutlined style={{ fontSize: 30 }} />
            <UserControls.Typography.Title style={{ margin: 0 }}>
                PATIENTS
            </UserControls.Typography.Title>
        </UserControls.Space>
        <UserControls.Button onClick={onAddClick} size="large" style={{ marginLeft: 'auto' }} icon={<AntdIcons.UserAddOutlined />} >
            Add
        </UserControls.Button>
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

    const [filters, setFilters] = useState<IPatientSearchParams>({})
    const [searchInputValue, setSearchInputValue] = useState<string>('')

    const { patients, loadingPatients, fetchFilteredPatients } = usePatients();

    const [showNewPatientModal, setShowNewPatientModal] = useState(false);
    const [showEditPatientModal, setShowEditPatientModal] = useState(false);
    const [editingPatient, setEditingPatient] = useState<IPatient>();
    // const searchInputRef = createRef<InputRef>();




    const controller = useRef<AbortController>();

    useEffect(() => {
        onSearch();
    }, [filters])

    const onSearch = useDebouncedCallback(() => {
        if (controller.current) {
            controller.current.abort();
        }

        controller.current = new AbortController();
        fetchFilteredPatients(filters)

    }, 300);

    const onAddClick = () => {
        setShowNewPatientModal(true);
    }

    const onModalCancel = () => {
        setShowNewPatientModal(false);
        setShowEditPatientModal(false);
    }

    const onPatientEdit = (patient: IPatient) => {
        setEditingPatient(patient);
        setShowEditPatientModal(true);
    }

    const onSearchChange: ChangeEventHandler<HTMLInputElement> = e => {
        const val = e.target.value;
        setSearchInputValue(val)

        if (val && val.length > 2) {
            setFilters(f => ({ ...f, nameSurname: val }))
        } else {
            setFilters(f => f.nameSurname != '' ? ({ ...f, nameSurname: '' }) : f)
        }
    }

    const resetFilters = () => {

        setFilters({});
        setSearchInputValue('')
    }



    return (<>
        <SplittedPage
            LeftTitle={<Title onAddClick={onAddClick} />}
            RightTitle={<FilterTitle />}
            Left={<Patients patients={patients} loading={loadingPatients} onPatientEdit={onPatientEdit} onSearchChange={onSearchChange} searchInputValue={searchInputValue} />}
            Right={<PatientsFilter reset={resetFilters} filters={filters} setFilters={setFilters} />}
        />
        <NewPatientModal open={showNewPatientModal} onCancel={onModalCancel} />
        <EditPatientModal open={showEditPatientModal} onCancel={onModalCancel} patient={editingPatient} />
    </>)
}

export default PatientsPage;