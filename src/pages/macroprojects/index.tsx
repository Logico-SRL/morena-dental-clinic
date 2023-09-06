import { useRouter } from "next/router";
import { SplittedPage } from "../../components/layout/splittedPage";
import { MacroProjects } from "../../components/macroprojects/macroprojects";
import { SearchOnline } from "../../components/search/searchOnline";
import { useMacroProjects } from "../../hooks/useMacroProjects";
import UserControls from "../../userControls";
import { AntdIcons } from "../../userControls/icons";

const LeftTitle = ({ onAddClick }: { onAddClick: () => void }) => {
    return <>
        <UserControls.Typography.Title level={3}>
            MACRO PROJECTS
        </UserControls.Typography.Title>
        <UserControls.Button onClick={onAddClick} size="large" style={{ marginLeft: 'auto' }} icon={<AntdIcons.PlusOutlined />} />
    </>
}

const Comp: PageComponent = () => {

    const { filteredMacroProjects, loadingFilteredMacroProjects } = useMacroProjects()
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
        push(`/macroprojects/create`)
    }



    const RightTitle = () => {
        return <UserControls.Typography.Title level={4}>
            ONLINE LIBRARY
        </UserControls.Typography.Title>
    }

    return (<SplittedPage
        LeftTitle={<LeftTitle onAddClick={onAddClick} />}
        RightTitle={<RightTitle />}
        Left={<MacroProjects
            macroprojects={filteredMacroProjects}
            loading={loadingFilteredMacroProjects}
        />}
        Right={<SearchOnline />}
    />)
}

export default Comp;