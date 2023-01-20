import { useRouter } from "next/router";
import { SplittedPage } from "../../components/layout/splittedPage";
import { Projects } from "../../components/projects/projects";
import { useProjects } from "../../hooks/useProjects";
import UserControls from "../../userControls";
import { AntdIcons } from "../../userControls/icons";

const LeftTitle = ({ onAddClick }: { onAddClick: () => void }) => {
    return <>
        <UserControls.Typography.Title level={3}>
            PROJECTS
        </UserControls.Typography.Title>
        {/* <UserControls.Button onClick={onAddClick} size="large" style={{ marginLeft: 'auto' }} icon={<AntdIcons.UnorderedListOutlined />} /> */}
        <UserControls.Button onClick={onAddClick} size="large" style={{ marginLeft: 'auto' }} icon={<AntdIcons.PlusOutlined />} />
    </>
}

const Comp: PageComponent = () => {

    const { projects, loadingProjects } = useProjects()
    // const [showNewProjectModal, setShowNewProjectModal] = useState(false);
    // const [showEditProjectModal, setShowEditProjectModal] = useState(false);
    // const [editingProject, setEditingProject] = useState<IProject>();

    const { push } = useRouter();

    // useEffect(() => {

    //     const ab = fetchAllProjects();

    //     return () => {
    //         ab.abort();
    //     }

    // }, [])


    const onAddClick = () => {
        push(`/projects/create`)
    }


    // const onModalCancel = () => {
    //     setShowNewProjectModal(false);
    //     setShowEditProjectModal(false);
    // }

    const RightTitle = () => {
        return <UserControls.Typography.Title level={4}>
            ONLINE LIBRARY
        </UserControls.Typography.Title>
    }

    return (<><SplittedPage
        LeftTitle={<LeftTitle onAddClick={onAddClick} />}
        RightTitle={<RightTitle />}
        Left={<Projects projects={projects} loading={loadingProjects} />}
    />
        {/* <NewProjectModal open={showNewProjectModal} onCancel={onModalCancel} />
        <EditProjectModal open={showEditProjectModal} onCancel={onModalCancel} project={editingProject} /> */}
    </>)
}

export default Comp;