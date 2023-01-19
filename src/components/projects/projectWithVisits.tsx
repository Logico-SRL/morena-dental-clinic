import { useRouter } from "next/router";
import UserControls from "../../userControls";
import { AntdIcons } from "../../userControls/icons";
import { visitUtils } from "../../utils/visitUtils";
import { PatientInfo } from "../patients/patientInfo";
import { SectionHeader } from "../userControls/sectionHeader";

type PropType = {
    project: IProject | undefined,
    onEdit: () => void
}

const Links = ({ onClick, onEditClick }: { onClick: () => void, onEditClick: () => void }) => {
    return <UserControls.Space>
        <UserControls.Button icon={<AntdIcons.EditOutlined />} onClick={onEditClick} >
            Edit
        </UserControls.Button>

        <UserControls.Button icon={<AntdIcons.UnorderedListOutlined />} onClick={onClick} >
            All projects
        </UserControls.Button>
    </UserControls.Space>
}

const VisitButton = ({ text, onClick }: { text: string | React.ReactNode, onClick: () => void }) => {
    return <UserControls.Button onClick={onClick}>{text}</UserControls.Button>
}

export const ProjectWithVisits = ({ project, onEdit }: PropType) => {

    const { push } = useRouter();

    const { patient } = project || {};

    const onNewProjectClick = () => {
        push(`/projects/create`)
    }

    const onAllProjectsClick = () => {
        push(`/projects`)
    }

    const onVisitClick = (visit: IVisit) => {
        push(`/projects/${project?.id}/visits/${visit.id}`)
    }

    const onAddVisitClick = () => {
        push(`/projects/${project?.id}/visits/create`)
    }

    return <UserControls.Form layout="vertical">
        <UserControls.Row>
            <UserControls.Col xs={24} style={{ textAlign: 'right' }}>
                <UserControls.Space>
                    <UserControls.Typography.Text>
                        New Project
                    </UserControls.Typography.Text>
                    <UserControls.Button icon={<AntdIcons.PlusOutlined />} onClick={onNewProjectClick} />
                </UserControls.Space>

            </UserControls.Col>
            <UserControls.Divider />

            <UserControls.Col xs={24}>
                <PatientInfo patient={patient} />
            </UserControls.Col>

            <UserControls.Col xs={24}>
                <SectionHeader title={project?.title || ''} links={<Links onClick={onAllProjectsClick} onEditClick={onEdit} />} />
            </UserControls.Col>
            <UserControls.Col xs={24} style={{ paddingTop: 20 }}>
                <UserControls.Row gutter={[10, 10]}>
                    {(project?.visits || []).map((v, index) => (
                        <UserControls.Col key={v.id}>
                            <VisitButton text={visitUtils.getName(v, project?.visits || [])} onClick={() => onVisitClick(v)} />
                        </UserControls.Col>
                    ))}
                    <UserControls.Col>
                        <VisitButton text={<AntdIcons.PlusOutlined />} onClick={onAddVisitClick} />
                    </UserControls.Col>
                </UserControls.Row>
            </UserControls.Col>
        </UserControls.Row>
    </UserControls.Form>
}