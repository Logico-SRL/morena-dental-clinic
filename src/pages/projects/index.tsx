import { useEffect } from "react";
import { SplittedPage } from "../../components/layout/splittedPage";
import { Projects } from "../../components/projects/projects";
import { useProjects } from "../../hooks/useProjects";
import UserControls from "../../userControls";

const Comp: PageComponent = () => {

    const { projects, loadingProjects, fetchAllProjects } = useProjects()

    useEffect(() => {

        const ab = fetchAllProjects();

        return () => {
            ab.abort();
        }

    }, [])

    const LeftTitle = () => {
        return <UserControls.Typography.Title level={3}>
            PROJECTS
        </UserControls.Typography.Title>
    }

    const RightTitle = () => {
        return <UserControls.Typography.Title level={4}>
            ONLINE LIBRARY
        </UserControls.Typography.Title>
    }

    return (<SplittedPage
        LeftTitle={<LeftTitle />}
        RightTitle={<RightTitle />}
        Left={<Projects projects={projects} loading={loadingProjects} />}
    />)
}

export default Comp;