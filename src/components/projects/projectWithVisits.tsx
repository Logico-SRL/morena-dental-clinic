import { useRouter } from "next/router";
import { useProject } from "../../hooks/useProject";
import UserControls from "../../userControls";
import { AntdIcons } from "../../userControls/icons";
import { visitUtils } from "../../utils/visitUtils";
import { PatientInfo } from "../patients/patientInfo";
import { SectionHeader } from "../userControls/sectionHeader";
import classnames from './projects.module.scss';

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

type VisitButtonPropType = {
    text: string | React.ReactNode,
    className?: string | undefined,
    onClick: () => void,
    disabled?: boolean;
}

const VisitButton = ({ text, onClick, className, disabled }: VisitButtonPropType) => {
    return <UserControls.Button disabled={disabled} className={className} onClick={onClick}>
        {text}
    </UserControls.Button>
}

export const ProjectWithVisits = ({ project, onEdit }: PropType) => {

    const { push } = useRouter();

    const { patient } = project || {};

    // const [selectedVisit, setSelectedVisit] = useState<IVisit>()
    const { selectedVisit, setSelectedVisit } = useProject(project?.id || '')

    const onNewProjectClick = () => {
        push(`/projects/create`)
    }

    const onAllProjectsClick = () => {
        push(`/projects`)
    }

    const onVisitClick = (visit: IVisit) => {
        setSelectedVisit(visit)
        // push(`/projects/${project?.id}/visits/${visit.id}`)
    }

    const onAddVisitClick = () => {
        push(`/projects/${project?.id}/visits/create`)
    }

    const onEditVisitClick = () => {
        selectedVisit && push(`/projects/${project?.id}/visits/${selectedVisit.id}`)
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
                        <UserControls.Col key={v.id} >
                            <VisitButton className={`${selectedVisit && v.id === selectedVisit.id ? classnames.selectedVisit : ''}`}
                                text={visitUtils.getName(v, project?.visits || [])} onClick={() => onVisitClick(v)} />
                        </UserControls.Col>
                    ))}

                    <UserControls.Col>
                        <VisitButton disabled={!selectedVisit} text={<UserControls.Space><AntdIcons.EditOutlined />Edit Visit</UserControls.Space>} onClick={onEditVisitClick} />
                    </UserControls.Col>
                    <UserControls.Col>
                        <VisitButton text={<UserControls.Space><AntdIcons.PlusOutlined />Add Visit</UserControls.Space>} onClick={onAddVisitClick} />
                    </UserControls.Col>
                </UserControls.Row>
            </UserControls.Col>
        </UserControls.Row>
    </UserControls.Form>
}