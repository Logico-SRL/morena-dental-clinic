import { ButtonProps } from "antd";
import { useRouter } from "next/router";
import { useProject } from "../../hooks/useProject";
import { useVisit } from "../../hooks/useVisit";
import UserControls from "../../userControls";
import { AntdIcons } from "../../userControls/icons";
import { visitUtils } from "../../utils/visitUtils";
import { PatientInfo } from "../patients/patientInfo";
import { SectionHeader } from "../userControls/sectionHeader";
import { VisitInfo } from "../visits/visitInfo";
import classnames from './projects.module.scss';

type PropType = {
    project: IProject | undefined,
    // onEdit: () => void
}

// const Links = ({ onClick, onEditClick }: { onClick: () => void, onEditClick: () => void }) => {
//     return <UserControls.Space>
//         <UserControls.Button icon={<AntdIcons.EditOutlined />} onClick={onEditClick} >
//             Edit
//         </UserControls.Button>

//         <UserControls.Button icon={<AntdIcons.UnorderedListOutlined />} onClick={onClick} >
//             All projects
//         </UserControls.Button>
//     </UserControls.Space>
// }

type VisitButtonPropType = {
    text: string | React.ReactNode,
    className?: string | undefined,
    onClick: () => void,
    disabled?: boolean;
    danger?: boolean;
    type?: ButtonProps['type'];
}

const VisitButton = ({ text, ...rest }: VisitButtonPropType) => {
    return <UserControls.Button {...rest}>
        {text}
    </UserControls.Button>
}

export const ProjectWithVisits = ({ project }: PropType) => {

    const { push } = useRouter();

    const { patient } = project || {};

    // const [selectedVisit, setSelectedVisit] = useState<IVisit>()
    const { selectedVisit, setSelectedVisit, removeVisit } = useProject(project?.id || '')
    const { deleteVisit, visit, loadingVisit } = useVisit(project?.id || '', selectedVisit?.id || '')

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


    // const onShowVisitClick = () => {
    //     selectedVisit && push(`/projects/${project?.id}/visits/${selectedVisit.id}/show`)
    // }

    const onEditVisitClick = () => {
        selectedVisit && push(`/projects/${project?.id}/visits/${selectedVisit.id}`)
    }

    const onDeleteVisitClick = () => {

        if (selectedVisit) {
            UserControls.Modal.confirm({
                title: 'Confirmation',
                content: 'All media related to selected visit will be deleted as well. Do you want to proceed?',
                type: 'warn',
                onOk: async () => {

                    await deleteVisit(project?.id || '', selectedVisit.id)
                    removeVisit(selectedVisit)
                    setSelectedVisit(undefined);
                }
            })
        }
    }

    const VisitLinks = <UserControls.Row gutter={10}>
        <UserControls.Col>
            <VisitButton disabled={!selectedVisit} text={
                <UserControls.Space>
                    <AntdIcons.EditOutlined />
                    Edit {selectedVisit?.type == 'visit' ? 'Visit' : 'Surgery'}
                </UserControls.Space>} onClick={onEditVisitClick} />
        </UserControls.Col>
        <UserControls.Col>
            <VisitButton disabled={!selectedVisit} danger text={
                <UserControls.Space>
                    <AntdIcons.DeleteOutlined />
                    Delete {selectedVisit?.type == 'visit' ? 'Visit' : 'Surgery'}
                </UserControls.Space>} onClick={onDeleteVisitClick} />
        </UserControls.Col>
        <UserControls.Col>
            <VisitButton
                type={'primary'}
                text={
                    <UserControls.Space>
                        <AntdIcons.PlusOutlined />
                        Add Visit
                    </UserControls.Space>
                } onClick={onAddVisitClick} />
        </UserControls.Col>
    </UserControls.Row>

    return <>
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
                <UserControls.TagList value={project?.tags} />
            </UserControls.Col>

            <UserControls.Col xs={24}>
                {/* <SectionHeader title={`Project: ${project?.title || ''}`} links={<Links onClick={onAllProjectsClick} onEditClick={onEdit} />} /> */}
                <SectionHeader title={'Visits'} links={VisitLinks} />
            </UserControls.Col>
            <UserControls.Col xs={24} style={{ paddingTop: 20 }}>
                <UserControls.Row gutter={[10, 10]}>
                    {(project?.visits || []).map((v, index) => (
                        <UserControls.Col key={v.id} >
                            <VisitButton className={`${selectedVisit && v.id === selectedVisit.id ? classnames.selectedVisit : ''}`}
                                text={visitUtils.getName(v, project?.visits || [])} onClick={() => onVisitClick(v)} />
                        </UserControls.Col>
                    ))}

                    {/* <UserControls.Col xs={1} /> */}
                    {/* <UserControls.Col>
                        <VisitButton disabled={!selectedVisit} text={
                            <UserControls.Space>
                                <AntdIcons.EditOutlined />
                                Show {selectedVisit?.type == 'visit' ? 'Visit' : 'Surgery'}
                            </UserControls.Space>} onClick={onShowVisitClick} />
                    </UserControls.Col> */}
                    {/* <UserControls.Col>
                        <VisitButton disabled={!selectedVisit} text={
                            <UserControls.Space>
                                <AntdIcons.EditOutlined />
                                Edit {selectedVisit?.type == 'visit' ? 'Visit' : 'Surgery'}
                            </UserControls.Space>} onClick={onEditVisitClick} />
                    </UserControls.Col>
                    <UserControls.Col>
                        <VisitButton disabled={!selectedVisit} danger text={
                            <UserControls.Space>
                                <AntdIcons.DeleteOutlined />
                                Delete {selectedVisit?.type == 'visit' ? 'Visit' : 'Surgery'}
                            </UserControls.Space>} onClick={onDeleteVisitClick} />
                    </UserControls.Col>
                    <UserControls.Col>
                        <VisitButton
                            type={'primary'}
                            text={
                                <UserControls.Space>
                                    <AntdIcons.PlusOutlined />
                                    Add Visit
                                </UserControls.Space>
                            } onClick={onAddVisitClick} />
                    </UserControls.Col> */}
                </UserControls.Row>
            </UserControls.Col>

        </UserControls.Row>
        <UserControls.Row>
            <UserControls.Col xs={24} style={{ paddingTop: 30 }}>
                <VisitInfo visit={visit} loading={loadingVisit} />
            </UserControls.Col>
        </UserControls.Row>
    </>
}