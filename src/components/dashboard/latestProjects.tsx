import { useRouter } from "next/router";
import { useMemo } from "react";
import { useProjects } from "../../hooks/useProjects";
import UserControls from "../../userControls";
import { ProjectListItem } from "../projects/projectListItem";

export const LatestProjects = () => {

    const { allProjects, loadingProjects } = useProjects();
    const { push } = useRouter();
    const latestProjects = useMemo(() => {
        return allProjects.sort((a, b) => {
            return b.id.localeCompare(a.id)
        }).slice(0, Math.min(10, allProjects.length))
    }, [allProjects])

    const onClick = (project: IProject) => {
        push(`/projects/${project.id}`)
    }

    return <UserControls.Skeleton loading={loadingProjects}>
        <UserControls.List
            header={<Header />}
            renderItem={ProjectListItem({ onClick })}
            dataSource={latestProjects}
        />
    </UserControls.Skeleton>
}

const Header = () => <UserControls.Row style={{ fontWeight: 'bold' }}>
    <UserControls.Col xs={10} offset={1}>
        id
    </UserControls.Col>

    <UserControls.Col xs={13}>
        Title
    </UserControls.Col>

</UserControls.Row>