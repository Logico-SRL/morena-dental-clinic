import { useRouter } from "next/router";
import { SplittedPage } from "../../components/layout/splittedPage";
import { NewProject } from "../../components/projects/newProject";
import UserControls from "../../userControls";
import { AntdIcons } from "../../userControls/icons";

const LeftTitle = ({ onList }: { onList: () => void }) => {
    return <>
        <UserControls.Typography.Title level={3}>
            NEW PROJECT
        </UserControls.Typography.Title>
        <UserControls.Button onClick={onList} size="large" style={{ marginLeft: 'auto' }} icon={<AntdIcons.UnorderedListOutlined />} />
    </>
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

    const { push } = useRouter();


    const onList = () => {
        push(`/projects`)
    }



    const RightTitle = () => {
        return <UserControls.Typography.Title level={4}>
            ONLINE LIBRARY
        </UserControls.Typography.Title>
    }

    return (<><SplittedPage
        LeftTitle={<LeftTitle onList={onList} />}
        RightTitle={<RightTitle />}
        Left={<NewProject />}
    />
    </>)
}

export default Comp;