import { useRouter } from "next/router";
import { useState } from "react";
import { SplittedPage } from "../../components/layout/splittedPage";
import { EditProject } from "../../components/projects/editProject";
import { VisitMedia } from "../../components/screening/VisitMedia";
import { SearchOnlineModal } from "../../components/search/searchOnlineModal";
import { useLibrary } from "../../hooks/useLIbrary";
import { useProject } from "../../hooks/useProject";
import UserControls from "../../userControls";
import { AntdIcons } from "../../userControls/icons";


const LeftTitle = ({ onList, onEditClick, inEdit, onPubmedClick }: { onList: () => void, onEditClick: () => void, inEdit: boolean, onPubmedClick: () => void }) => {
    return <>
        <UserControls.Typography.Title level={3}>
            PROJECT
        </UserControls.Typography.Title>
        <UserControls.Space style={{ marginLeft: 'auto' }}>
            <UserControls.Button size="large" icon={<AntdIcons.EditOutlined />} onClick={onEditClick} >
                {inEdit ? 'Cancel edit' : 'Edit'}
            </UserControls.Button>
            <UserControls.Button size="large" icon={<AntdIcons.TranslationOutlined />} onClick={onPubmedClick} >
                Pubmed
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

    // console.info('query project id ', projectId)

    const { project, loadingProject, saveProject, reloadProj } = useProject(projectId || '')
    const [inEdit, setInEdit] = useState(false);
    const { addToProj } = useLibrary()
    const [showPubmedModal, setShowPubmedModal] = useState(false);

    const onList = () => {
        push(`/projects`)
    }

    const onEditClick = () => {
        setInEdit(v => !v)
        // push(`/projects/${projectId}/edit`)
    }

    const onPubmedClick = () => {
        setShowPubmedModal(true)
    }

    const onSaveItem = async (item: IPubMedDetail) => {
        if (project) {
            await addToProj(item, project)
            reloadProj();
            setShowPubmedModal(false);
        }
    }

    return (<><SplittedPage
        LeftTitle={<LeftTitle onList={onList} onEditClick={onEditClick} inEdit={inEdit} onPubmedClick={onPubmedClick} />}
        RightTitle={<RightTitle />}
        Left={<EditProject project={project} loadingProject={loadingProject} saveProject={saveProject} inEdit={inEdit} setInEdit={setInEdit} />}
        Right={<VisitMedia projectId={projectId} />}
    />
        <SearchOnlineModal
            open={showPubmedModal}
            onCancel={() => setShowPubmedModal(false)}
            onSaveItem={onSaveItem}
        />
    </>)
}

export default Comp;