import { useRouter } from "next/router";
import { SplittedPage } from "../../components/layout/splittedPage";
import { EditProject } from "../../components/projects/editProject";
import { VisitMedia } from "../../components/screening/VisitMedia";
import { useProject } from "../../hooks/useProject";
import UserControls from "../../userControls";
import { AntdIcons } from "../../userControls/icons";

const LeftTitle = ({ onList }: { onList: () => void }) => {
    return <>
        <UserControls.Typography.Title level={3}>
            PROJECT
        </UserControls.Typography.Title>
        <UserControls.Button onClick={onList} size="large" style={{ marginLeft: 'auto' }} icon={<AntdIcons.UnorderedListOutlined />} />
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

    const onList = () => {
        push(`/projects`)
    }

    return (<><SplittedPage
        LeftTitle={<LeftTitle onList={onList} />}
        RightTitle={<RightTitle />}
        Left={<EditProject project={project} loadingProject={loadingProject} saveProject={saveProject} />}
        Right={<VisitMedia projectId={projectId} />}
    />
    </>)
}

export default Comp;