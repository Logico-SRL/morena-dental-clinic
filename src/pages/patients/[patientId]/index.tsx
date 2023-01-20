import { useRouter } from "next/router";
import { SplittedPage } from "../../../components/layout/splittedPage";
import { Patient } from "../../../components/patients/patient";
import { usePatient } from "../../../hooks/usePatient";
import UserControls from "../../../userControls";
import { AntdIcons } from "../../../userControls/icons";


const PatientsPage: PageComponent = ({ }) => {

    const { query } = useRouter()
    const { patientId } = query as { patientId: string }
    const { patient, loadingPatient } = usePatient(patientId);

    const LeftTitle = () => {

        return <UserControls.Space>
            <AntdIcons.UserOutlined />
            <UserControls.Typography.Title level={3}>
                Patient
            </UserControls.Typography.Title>
        </UserControls.Space>
    }


    return (<SplittedPage
        LeftTitle={<LeftTitle />}
        RightTitle={<RightTitle />}
        Left={<Patient patient={patient} loadingPatient={loadingPatient} />}
        Right={<Right projects={patient?.projects || []} loading={loadingPatient} />}

    />)
}

export default PatientsPage;

const RightTitle = () => {

    const { push } = useRouter();
    const onAddClick = () => {
        push(`/projects/create`)
    }

    return <>
        <UserControls.Typography.Title level={4}>
            Projects
        </UserControls.Typography.Title>
        <UserControls.Button icon={<AntdIcons.PlusOutlined />} onClick={onAddClick} style={{ marginLeft: 'auto' }} >
            New Project
        </UserControls.Button>
    </>
}

const Right = ({ projects, loading }: { projects: IProject[], loading: boolean }) => {
    const { push } = useRouter();
    const onClick = (item: IProject) => {
        push(`/projects/${item.id}`)
    }
    return <UserControls.Row>
        <UserControls.Col xs={24}>
            <UserControls.List
                loading={loading}
                dataSource={projects}
                renderItem={ProjectItem({ onClick })}
            />
        </UserControls.Col>
    </UserControls.Row>
}

const ProjectItem = ({ onClick }: { onClick: (item: IProject) => void }) => (item: IProject) => {
    return (<UserControls.List.Item>
        <UserControls.Row style={{ width: '100%', cursor: 'pointer' }}
            onClick={e => { e.preventDefault(); e.stopPropagation(); onClick(item) }}>
            <UserControls.Col xs={12}>
                <UserControls.Typography.Text ellipsis={true}>
                    {item.title}
                </UserControls.Typography.Text>
            </UserControls.Col>
        </UserControls.Row>
    </UserControls.List.Item>)
}