import { Divider } from "antd";
import { useRouter } from "next/router";
import UserControls from "../../userControls";
import { AntdIcons } from "../../userControls/icons";

type PropType = {
    macroProject: IMacroProject | undefined,
}

export const MacroProjectWithProjects = ({ macroProject }: PropType) => {

    const { push } = useRouter();

    // const { patient } = macroProject || {};

    // const [selectedVisit, setSelectedVisit] = useState<IVisit>()
    // const { selectedVisit, setSelectedVisit, removeVisit } = useProject(project?.id || '')
    // const { deleteVisit, visit, loadingVisit } = useVisit(project?.id || '', selectedVisit?.id || '')

    const onNewMacroProjectClick = () => {
        push(`/macroprojects/create`)
    }

    const onAddNoteClick = () => {
        alert('todo')
    }

    const onAddProjectClick = () => {
        alert('todo')
    }

    // const onAllProjectsClick = () => {
    //     push(`/projects`)
    // }

    // const onVisitClick = (visit: IVisit) => {
    //     setSelectedVisit(visit)
    //     // push(`/projects/${project?.id}/visits/${visit.id}`)
    // }

    // const onAddVisitClick = () => {
    //     push(`/projects/${project?.id}/visits/create`)
    // }


    // const onShowVisitClick = () => {
    //     selectedVisit && push(`/projects/${project?.id}/visits/${selectedVisit.id}/show`)
    // }

    // const onEditVisitClick = () => {
    //     selectedVisit && push(`/projects/${project?.id}/visits/${selectedVisit.id}`)
    // }

    // const onDeleteVisitClick = () => {

    //     if (selectedVisit) {
    //         UserControls.Modal.confirm({
    //             title: 'Confirmation',
    //             content: 'All media related to selected visit will be deleted as well. Do you want to proceed?',
    //             type: 'warn',
    //             onOk: async () => {

    //                 await deleteVisit(project?.id || '', selectedVisit.id)
    //                 removeVisit(selectedVisit)
    //                 setSelectedVisit(undefined);
    //             }
    //         })
    //     }
    // }

    // const VisitLinks = <UserControls.Row gutter={10}>
    //     <UserControls.Col>
    //         <VisitButton disabled={!selectedVisit} text={
    //             <UserControls.Space>
    //                 <AntdIcons.EditOutlined />
    //                 Edit {selectedVisit?.type == 'visit' ? 'Visit' : 'Surgery'}
    //             </UserControls.Space>} onClick={onEditVisitClick} />
    //     </UserControls.Col>
    //     <UserControls.Col>
    //         <VisitButton disabled={!selectedVisit} danger text={
    //             <UserControls.Space>
    //                 <AntdIcons.DeleteOutlined />
    //                 Delete {selectedVisit?.type == 'visit' ? 'Visit' : 'Surgery'}
    //             </UserControls.Space>} onClick={onDeleteVisitClick} />
    //     </UserControls.Col>
    //     <UserControls.Col>
    //         <VisitButton
    //             type={'primary'}
    //             text={
    //                 <UserControls.Space>
    //                     <AntdIcons.PlusOutlined />
    //                     Add Visit
    //                 </UserControls.Space>
    //             } onClick={onAddVisitClick} />
    //     </UserControls.Col>
    // </UserControls.Row>

    return <>
        <UserControls.Row>
            <UserControls.Col xs={24} style={{ textAlign: 'right' }}>
                <UserControls.Space>
                    <UserControls.Typography.Text>
                        New Macro Project
                    </UserControls.Typography.Text>
                    <UserControls.Button icon={<AntdIcons.PlusOutlined />} onClick={onNewMacroProjectClick} />
                </UserControls.Space>

            </UserControls.Col>
            <UserControls.Divider />

            <UserControls.Col xs={24}>
                <UserControls.Typography.Text>
                    <i>Title</i> <b>{macroProject?.title}</b>
                </UserControls.Typography.Text>
            </UserControls.Col>

            <Divider />

            <UserControls.Col xs={12}>
                <UserControls.Typography.Text>
                    <i>Category</i>  {macroProject?.category?.name}
                </UserControls.Typography.Text>
            </UserControls.Col>

            <UserControls.Col xs={12}>
                <UserControls.Typography.Text>
                    <i>Subcategory</i>  {macroProject?.subCategory?.name}
                </UserControls.Typography.Text>
            </UserControls.Col>

            <Divider />

            {macroProject?.notes.map(n => (
                <UserControls.Col xs={24} key={n.id}>
                    <UserControls.Typography.Title level={5}>
                        <i>{n.title}</i>
                    </UserControls.Typography.Title>
                    <UserControls.Typography.Paragraph>
                        {n.content}
                    </UserControls.Typography.Paragraph>
                </UserControls.Col>
            ))}
            <UserControls.Col xs={24} style={{ textAlign: 'right' }}>
                <UserControls.Button type="primary" icon={<AntdIcons.PlusOutlined />} onClick={onAddNoteClick} >
                    Aggiungi Nota
                </UserControls.Button>
            </UserControls.Col>

            <UserControls.Col xs={24} style={{ marginTop: 20 }}>
                <UserControls.Typography.Title level={5}>
                    <i>Progetti associati</i>
                </UserControls.Typography.Title>
            </UserControls.Col>
            <Divider />

            <UserControls.Col xs={24} style={{ textAlign: 'right' }}>
                <UserControls.Button type="primary" icon={<AntdIcons.PlusOutlined />} onClick={onAddProjectClick} >
                    Aggiungi Progetto
                </UserControls.Button>
            </UserControls.Col>
        </UserControls.Row>
    </>
}