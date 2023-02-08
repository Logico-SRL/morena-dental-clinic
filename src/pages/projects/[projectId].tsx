import { useRouter } from "next/router";
import { useState } from "react";
import { SplittedPage } from "../../components/layout/splittedPage";
import { EditProject } from "../../components/projects/editProject";
import { VisitMedia } from "../../components/screening/VisitMedia";
import { useProject } from "../../hooks/useProject";
import UserControls from "../../userControls";
import { AntdIcons } from "../../userControls/icons";


const LeftTitle = ({ onList, onEditClick, inEdit }: { onList: () => void, onEditClick: () => void, inEdit: boolean }) => {
    return <>
        <UserControls.Typography.Title level={3}>
            PROJECT
        </UserControls.Typography.Title>
        <UserControls.Space style={{ marginLeft: 'auto' }}>
            <UserControls.Button size="large" icon={<AntdIcons.EditOutlined />} onClick={onEditClick} >
                {inEdit ? 'Cancel edit' : 'Edit'}
            </UserControls.Button>
            <UserControls.Button onClick={onList} size="large" icon={<AntdIcons.UnorderedListOutlined />} >
                All
            </UserControls.Button>
        </UserControls.Space>
    </>
}

const RightTitle = () => {
    return <UserControls.Typography.Title level={4}>
        SCREENING
    </UserControls.Typography.Title>
}



const Comp: PageComponent = () => {

    // const { projects, loadingProjects, fetchAllProjects } = useProjects()
    // const [showNewProjectModal, setShowNewProjectModal] = useState(false);
    // const [showEditProjectModal, setShowEditProjectModal] = useState(false);
    // const [editingProject, setEditingProject] = useState<IProject>();

    // useEffect(() => {

    //     const ab = fetchAllProjects();

    //     return () => {
    //         ab.abort();
    //     }

    // }, [])

    const { push, query } = useRouter();

    const projectId = query.projectId as string;

    console.info('query project id ', projectId)

    const { project, loadingProject, saveProject } = useProject(projectId || '')

    const [inEdit, setInEdit] = useState(false);


    const onList = () => {
        push(`/projects`)
    }

    const onEditClick = () => {
        setInEdit(v => !v)
        // push(`/projects/${projectId}/edit`)
    }

    return (<><SplittedPage
        LeftTitle={<LeftTitle onList={onList} onEditClick={onEditClick} inEdit={inEdit} />}
        RightTitle={<RightTitle />}
        Left={<EditProject project={project} loadingProject={loadingProject} saveProject={saveProject} inEdit={inEdit} setInEdit={setInEdit} />}
        Right={<VisitMedia projectId={projectId} />}
    />
    </>)
}

export default Comp;