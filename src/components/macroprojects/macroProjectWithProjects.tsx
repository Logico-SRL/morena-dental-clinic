import { Divider } from "antd";
import { useRouter } from "next/router";
import { useState } from "react";
import { useMacroProject } from "../../hooks/useMacroProject";
import UserControls from "../../userControls";
import { AntdIcons } from "../../userControls/icons";
import { LibraryInfo } from "../library/libraryInfo";
import { SectionHeader } from "../userControls/sectionHeader";
import classnames from './macroprojects.module.scss';
import { AddNoteModal } from "./modals/addNoteModal";
import { AddProjectModal } from "./modals/addProjectModal";

type PropType = {
    macroProject: IMacroProject | undefined,
}

export const MacroProjectWithProjects = ({ macroProject }: PropType) => {

    const { push } = useRouter();
    const [addNoteModalOpen, setAddNoteModalOpen] = useState(false);
    const [addProjectModalOpen, setAddProjectModalOpen] = useState(false);

    const [editingNote, setEditingNote] = useState<INote | null>(null)
    const { saveNote, removeNote, addProject, removeProject } = useMacroProject(macroProject?.id || '');

    // const { patient } = macroProject || {};

    // const [selectedVisit, setSelectedVisit] = useState<IVisit>()
    // const { selectedVisit, setSelectedVisit, removeVisit } = useProject(project?.id || '')
    // const { deleteVisit, visit, loadingVisit } = useVisit(project?.id || '', selectedVisit?.id || '')

    const onNewMacroProjectClick = () => {
        push(`/macroprojects/create`)
    }

    const onAddNoteClick = () => {
        setEditingNote(null)
        setAddNoteModalOpen(true)
    }

    const onAddProjectClick = () => {
        setAddProjectModalOpen(true);
    }

    const onNoteSave = async (note: INote) => {
        await saveNote(note);
        setAddNoteModalOpen(false);
    }

    const onNoteClick = (note: INote) => {
        setEditingNote(note);
        setAddNoteModalOpen(true);
    }

    const onNoteDelete = async (note: INote) => {
        UserControls.Modal.confirm({
            title: 'Confirmation',
            content: 'Are you sure you want to delete selected paragraph?',
            onOk: async () => await removeNote(note)
        })
    }

    const onProjectAdd = async (project: IProject) => {
        await addProject(project);
        setAddProjectModalOpen(false);
    }

    const onProjectRemove = async (project: IProject) => {
        UserControls.Modal.confirm({
            title: 'Confirmation',
            content: 'Are you sure you want to remove selected project?',
            onOk: async () => await removeProject(project)
        })

    }
    const onProjectClick = (proj: IProject) => {
        push(`/projects/${proj.id}`)
    }

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

            {(macroProject?.notes || []).map(note => (
                <UserControls.Col key={note.id} xs={24} className={classnames.note} onClick={() => onNoteClick(note)} >
                    <UserControls.Typography.Title level={4} className={classnames.title}>
                        {note.title}
                    </UserControls.Typography.Title>
                    <UserControls.Typography.Paragraph>
                        {note.content}
                    </UserControls.Typography.Paragraph>
                </UserControls.Col>))}

            <UserControls.Col xs={24} style={{ textAlign: 'right', marginTop: 20 }}>
                <UserControls.Button type="primary" icon={<AntdIcons.PlusOutlined />} onClick={onAddNoteClick} >
                    Aggiungi Sezione
                </UserControls.Button>
            </UserControls.Col>

            <UserControls.Col xs={24} style={{ marginTop: 20 }}>
                <SectionHeader title={'Progetti associati'} links={[]} />
            </UserControls.Col>
            <Divider />

            {(macroProject?.projects || []).map(proj => (<UserControls.Col xs={24} className={classnames.project} onClick={() => onProjectClick(proj)}>
                <UserControls.Row>
                    <UserControls.Col flex={1}>
                        {proj.title}
                    </UserControls.Col>
                    <UserControls.Col>
                        <UserControls.Button icon={<AntdIcons.DeleteOutlined />} onClick={e => { e.stopPropagation(); e.preventDefault(); onProjectRemove(proj) }} />
                    </UserControls.Col>
                </UserControls.Row>
            </UserControls.Col>))}

            <UserControls.Col xs={24} style={{ textAlign: 'right', marginTop: 20 }}>
                <UserControls.Button type="primary" icon={<AntdIcons.PlusOutlined />} onClick={onAddProjectClick} >
                    Aggiungi Progetto
                </UserControls.Button>
            </UserControls.Col>
            <AddNoteModal
                open={addNoteModalOpen}
                onCancel={() => setAddNoteModalOpen(false)}
                onSave={onNoteSave}
                onDelete={onNoteDelete}
                note={editingNote}
            />
            {macroProject && <AddProjectModal
                open={addProjectModalOpen}
                onCancel={() => setAddProjectModalOpen(false)}
                onAdd={onProjectAdd}
                macroproj={macroProject}
            />}
            <UserControls.Col xs={24} style={{ marginTop: 30 }}>
                <SectionHeader title={'Libraries'} links={[]} />
            </UserControls.Col>
            <LibraryInfo
                libraries={macroProject?.libraries || []}
            />
        </UserControls.Row>
    </>
}